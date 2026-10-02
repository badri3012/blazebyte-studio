import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbGetInvoiceById, dbUpdateInvoicePayment } from "@/lib/supabase-db";
import { sendLeadNotificationEmail } from "@/lib/email";

function logRazorpayStartupCheck() {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  const hasKeyId = Boolean(keyId);
  const hasKeySecret = Boolean(keySecret);
  const keyPrefixValid = keyId ? (keyId.startsWith("rzp_test_") || keyId.startsWith("rzp_live_")) : false;

  console.log("[RAZORPAY VERIFY STARTUP CHECK]", {
    hasKeyId,
    hasKeySecret,
    keyPrefixValid,
    keyIdPrefix: keyId ? keyId.substring(0, 9) : "NONE"
  });
}

export async function POST(request: Request) {
  logRazorpayStartupCheck();

  try {
    const body = await request.json();
    const { 
      invoiceId, 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    } = body;

    const orderId = razorpay_order_id || razorpayOrderId;
    const paymentId = razorpay_payment_id || razorpayPaymentId;
    const signature = razorpay_signature || razorpaySignature;

    // 1. Mandatory input parameter validation
    if (!invoiceId || !orderId || !paymentId || !signature) {
      console.error("[VERIFY ERROR] Missing parameters in verify payload:", {
        hasInvoiceId: Boolean(invoiceId),
        hasOrderId: Boolean(orderId),
        hasPaymentId: Boolean(paymentId),
        hasSignature: Boolean(signature)
      });
      return NextResponse.json(
        { error: "PAYMENT NOT COMPLETED: Missing required transaction signature or order parameters.", verified: false, success: false },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("[RAZORPAY CONFIG ERROR] Missing Razorpay Key ID or Secret on server.");
      return NextResponse.json(
        { error: "PAYMENT NOT COMPLETED: Payment gateway credentials are not configured on server.", verified: false, success: false },
        { status: 500 }
      );
    }

    // 2. Load authoritative invoice from Supabase
    const invoice = await dbGetInvoiceById(invoiceId);
    if (!invoice) {
      console.error(`[VERIFY ERROR] Invoice '${invoiceId}' not found in database.`);
      return NextResponse.json(
        { error: `Invoice '${invoiceId}' not found in database.`, verified: false, success: false },
        { status: 404 }
      );
    }

    // 3. Confirm the Razorpay order ID matches the order created for that invoice
    if (!invoice.razorpayOrderId || invoice.razorpayOrderId !== orderId) {
      console.error("[VERIFY ERROR] Order ID mismatch:", {
        invoiceOrderId: invoice.razorpayOrderId,
        requestedOrderId: orderId
      });
      return NextResponse.json(
        { error: "PAYMENT NOT COMPLETED: Razorpay order ID does not match the invoice record.", verified: false, success: false },
        { status: 400 }
      );
    }

    // 4. Idempotency Check: If invoice is already paid and verified under the same payment ID
    if (invoice.status === "ADVANCE PAID" || invoice.status === "PAID IN FULL" || invoice.status === "PROJECT ACTIVE") {
      if (invoice.razorpayPaymentId === paymentId) {
        return NextResponse.json({
          success: true,
          verified: true,
          message: "Payment already verified. Project is active.",
          invoice,
          alreadyPaid: true
        });
      } else {
        return NextResponse.json(
          { error: "PAYMENT NOT COMPLETED: Invoice is already recorded as paid under a different payment reference.", verified: false, success: false },
          { status: 400 }
        );
      }
    }

    // 5. Verify cryptographic HMAC-SHA256 signature using order_id|payment_id and key secret
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      console.error("[RAZORPAY SIGNATURE MISMATCH]", {
        expected: generatedSignature,
        received: signature,
        orderId,
        paymentId
      });
      return NextResponse.json(
        { error: "PAYMENT NOT COMPLETED: Server signature verification failed. Project not activated.", verified: false, success: false },
        { status: 400 }
      );
    }

    // 6. Authoritative Server-to-Server Payment Verification via Razorpay REST API
    // Confirm the payment actually exists in Razorpay and retrieve its live state
    const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const rzpRes = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json"
      }
    });

    const rzpPayment = await rzpRes.json();

    if (!rzpRes.ok || !rzpPayment || !rzpPayment.id) {
      console.error("[RAZORPAY API FETCH PAYMENT ERROR]", rzpPayment);
      return NextResponse.json(
        { error: "PAYMENT NOT COMPLETED: Payment record could not be verified with Razorpay gateway.", verified: false, success: false },
        { status: 400 }
      );
    }

    // 7. Verify Payment Status is captured or authorized
    if (rzpPayment.status !== "captured" && rzpPayment.status !== "authorized") {
      console.error("[RAZORPAY PAYMENT STATUS REJECTED]", {
        paymentId: rzpPayment.id,
        status: rzpPayment.status
      });
      return NextResponse.json(
        { error: `PAYMENT NOT COMPLETED: Payment status is '${rzpPayment.status}'. Money has not been captured.`, verified: false, success: false },
        { status: 400 }
      );
    }

    // 8. Confirm the payment belongs to the expected Razorpay order ID
    if (rzpPayment.order_id !== orderId) {
      console.error("[RAZORPAY ORDER MISMATCH IN PAYMENT RECORD]", {
        paymentOrderId: rzpPayment.order_id,
        expectedOrderId: orderId
      });
      return NextResponse.json(
        { error: "PAYMENT NOT COMPLETED: Payment does not belong to the expected Razorpay order.", verified: false, success: false },
        { status: 400 }
      );
    }

    // 9. Confirm the paid amount equals the authoritative 50% advance in paise
    const expectedAdvanceInPaise = Math.round(Number(invoice.advanceRequired) * 100);
    if (Number(rzpPayment.amount) !== expectedAdvanceInPaise) {
      console.error("[RAZORPAY AMOUNT MISMATCH]", {
        paidAmountPaise: rzpPayment.amount,
        expectedAmountPaise: expectedAdvanceInPaise
      });
      return NextResponse.json(
        { 
          error: `PAYMENT NOT COMPLETED: Paid amount (₹${Number(rzpPayment.amount)/100}) does not match expected 50% advance (₹${Number(invoice.advanceRequired)}).`, 
          verified: false, 
          success: false 
        },
        { status: 400 }
      );
    }

    // 10. Confirm currency is INR
    if (rzpPayment.currency !== "INR") {
      console.error("[RAZORPAY CURRENCY MISMATCH]", rzpPayment.currency);
      return NextResponse.json(
        { error: `PAYMENT NOT COMPLETED: Invalid payment currency '${rzpPayment.currency}'. Expected 'INR'.`, verified: false, success: false },
        { status: 400 }
      );
    }

    // ALL 10 CHECKS PASSED: Authoritative Payment State Update in Supabase
    const { invoice: updatedInvoice, receipt } = await dbUpdateInvoicePayment(
      invoiceId,
      orderId,
      paymentId
    );

    // Send Payment Received Confirmation Email
    try {
      await sendLeadNotificationEmail({
        full_name: updatedInvoice.clientName,
        business_name: updatedInvoice.clientCompany || updatedInvoice.clientName,
        email: updatedInvoice.clientEmail,
        phone: updatedInvoice.clientPhone,
        services: `${updatedInvoice.serviceCategory} Studio — Payment Received`,
        package: updatedInvoice.selectedPackage,
        budget: `₹${updatedInvoice.advanceRequired.toLocaleString("en-IN")} Advance Paid`,
        requirements: `Official Razorpay Payment ID: ${paymentId}. Invoice ID: ${invoiceId}. Project ID: ${updatedInvoice.projectId}`,
        source: "razorpay-payment-verified",
      });
    } catch (emailErr) {
      console.warn("[PAYMENT VERIFIED] Confirmation email skipped/failed, payment record remains verified in Supabase:", emailErr);
    }

    return NextResponse.json({
      success: true,
      verified: true,
      message: "Payment successfully verified with Razorpay API. Project activated.",
      invoice: updatedInvoice,
      receipt
    });

  } catch (error: any) {
    console.error("[VERIFY RAZORPAY PAYMENT ERROR]", error);
    return NextResponse.json(
      { error: `PAYMENT NOT COMPLETED: Internal verification error (${error.message || "Unknown error"}).`, verified: false, success: false },
      { status: 500 }
    );
  }
}
