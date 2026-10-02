import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbUpdateInvoicePayment, dbGetInvoiceById } from "@/lib/supabase-db";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signatureHeader = request.headers.get("x-razorpay-signature");

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 1. Mandatory Webhook Secret & Signature Verification
    if (!webhookSecret) {
      console.error("[RAZORPAY WEBHOOK ERROR] Missing RAZORPAY_WEBHOOK_SECRET environment variable.");
      return NextResponse.json(
        { error: "Webhook secret is not configured on server." },
        { status: 500 }
      );
    }

    if (!signatureHeader) {
      console.error("[RAZORPAY WEBHOOK ERROR] Missing x-razorpay-signature header in request.");
      return NextResponse.json(
        { error: "Missing x-razorpay-signature header." },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signatureHeader) {
      console.error("[RAZORPAY WEBHOOK SIGNATURE MISMATCH]");
      return NextResponse.json(
        { error: "Invalid webhook cryptographic signature." },
        { status: 400 }
      );
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    console.log(`[RAZORPAY WEBHOOK RECEIVED & VERIFIED]: ${event}`);

    // 2. Handle Payment Success Events strictly for captured payments
    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity || {};
      const orderEntity = payload.payload?.order?.entity || {};

      const notes = paymentEntity.notes || orderEntity.notes || {};
      let invoiceId = notes.invoiceId || notes.invoice_id;
      const orderId = paymentEntity.order_id || orderEntity.id;
      const paymentId = paymentEntity.id;

      // Fallback: search receipt string if invoiceId not in notes
      if (!invoiceId && paymentEntity.receipt) {
        const match = paymentEntity.receipt.match(/INV-BB-2026-\d+/);
        if (match) invoiceId = match[0];
      }

      if (!invoiceId || !orderId || !paymentId) {
        console.warn("[RAZORPAY WEBHOOK WARNING] Incomplete event entities. Cannot map to invoice.", {
          invoiceId,
          orderId,
          paymentId
        });
        return NextResponse.json({ received: true, note: "Unmapped entities" });
      }

      // 3. Verify internal invoice exists and orderId matches
      const inv = await dbGetInvoiceById(invoiceId);
      if (!inv) {
        console.warn(`[RAZORPAY WEBHOOK WARNING] Invoice ${invoiceId} not found in database.`);
        return NextResponse.json({ received: true, note: "Invoice not found" });
      }

      if (inv.razorpayOrderId !== orderId) {
        console.error("[RAZORPAY WEBHOOK ERROR] Razorpay order ID mismatch with invoice record.", {
          expected: inv.razorpayOrderId,
          received: orderId
        });
        return NextResponse.json({ error: "Order ID mismatch" }, { status: 400 });
      }

      // 4. Verify payment status is captured
      if (paymentEntity.status && paymentEntity.status !== "captured") {
        console.warn(`[RAZORPAY WEBHOOK WARNING] Payment status is '${paymentEntity.status}', not captured.`);
        return NextResponse.json({ received: true, note: "Payment not captured" });
      }

      // 5. Verify payment amount equals expected 50% advance in paise
      const expectedPaise = Math.round(Number(inv.advanceRequired) * 100);
      if (paymentEntity.amount && Number(paymentEntity.amount) !== expectedPaise) {
        console.error("[RAZORPAY WEBHOOK ERROR] Payment amount mismatch.", {
          paidPaise: paymentEntity.amount,
          expectedPaise
        });
        return NextResponse.json({ error: "Payment amount mismatch" }, { status: 400 });
      }

      // 6. Idempotently update database
      if (inv.status !== "ADVANCE PAID" && inv.status !== "PAID IN FULL") {
        console.log(`[WEBHOOK AUTHORITATIVE RECONCILIATION]: Reconciling Invoice ${invoiceId} with Payment ${paymentId}`);
        await dbUpdateInvoicePayment(invoiceId, orderId, paymentId);
      } else {
        console.log(`[WEBHOOK IDEMPOTENT SKIP]: Invoice ${invoiceId} is already marked as ${inv.status}.`);
      }
    }

    return NextResponse.json({ received: true, success: true });
  } catch (error: any) {
    console.error("[RAZORPAY WEBHOOK ERROR]", error);
    return NextResponse.json({ error: `Webhook processing error: ${error.message || "Unknown error"}` }, { status: 500 });
  }
}
