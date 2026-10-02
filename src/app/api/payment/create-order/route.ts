import { NextResponse } from "next/server";
import { PACKAGE_AUTHORITATIVE_PRICES } from "@/lib/invoice-store";
import { dbGetInvoiceById, dbSaveInvoice } from "@/lib/supabase-db";

function logRazorpayStartupCheck() {
  const keyId = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim().split(",")[0];
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim().split(",")[0];

  const hasKeyId = Boolean(keyId);
  const hasKeySecret = Boolean(keySecret);
  const keyPrefixValid = keyId ? (keyId.startsWith("rzp_test_") || keyId.startsWith("rzp_live_")) : false;

  console.log("[RAZORPAY SERVER STARTUP CHECK]", {
    hasKeyId,
    hasKeySecret,
    keyPrefixValid,
    keyIdPrefix: keyId ? keyId.substring(0, 9) : "NONE"
  });
}

export async function POST(request: Request) {
  // Execute server configuration audit log on request
  logRazorpayStartupCheck();

  try {
    const body = await request.json();
    const { invoiceId, packageId, clientName, clientEmail } = body;

    let targetInvoice = null;

    // 1. Authoritative Invoice Lookup from Supabase PostgreSQL
    if (invoiceId) {
      targetInvoice = await dbGetInvoiceById(invoiceId);
    }

    // 2. If no invoiceId provided, look up or create authoritative invoice by packageId
    if (!targetInvoice && packageId && PACKAGE_AUTHORITATIVE_PRICES[packageId]) {
      const pkgInfo = PACKAGE_AUTHORITATIVE_PRICES[packageId];
      targetInvoice = await dbSaveInvoice({
        clientName: clientName || "Valued Client",
        clientEmail: clientEmail || "client@example.com",
        totalAmount: pkgInfo.price,
        serviceCategory: pkgInfo.category,
        selectedPackage: pkgInfo.title,
        projectName: `${pkgInfo.title} Project`,
        scopeSummary: pkgInfo.scope
      });
    }

    if (!targetInvoice) {
      return NextResponse.json(
        { error: "Invalid invoice or package identifier specified.", success: false },
        { status: 400 }
      );
    }

    // 3. Duplicate Payment Protection Check
    if (targetInvoice.status === "ADVANCE PAID" || targetInvoice.status === "PAID IN FULL" || targetInvoice.status === "PROJECT ACTIVE") {
      return NextResponse.json(
        { 
          error: "ADVANCE ALREADY PAID: The 50% advance for this project has already been confirmed.",
          alreadyPaid: true,
          success: false,
          invoiceId: targetInvoice.invoiceId,
          status: targetInvoice.status
        },
        { status: 400 }
      );
    }

    // 4. Server-Side Authoritative 50% Advance Calculation (INR -> Paise)
    const advanceAmountInRupees = targetInvoice.advanceRequired;
    const amountInPaise = Math.round(advanceAmountInRupees * 100);

    const keyId = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim().split(",")[0];
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim().split(",")[0];

    if (!keyId || !keySecret) {
      console.error("[RAZORPAY CONFIG ERROR] Missing Razorpay Key ID or Secret.", {
        hasKeyId: Boolean(keyId),
        hasKeySecret: Boolean(keySecret)
      });
      return NextResponse.json(
        { 
          error: "Razorpay payment gateway credentials (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are not configured on server.", 
          success: false 
        },
        { status: 500 }
      );
    }

    const isKeyPrefixValid = keyId.startsWith("rzp_test_") || keyId.startsWith("rzp_live_");
    if (!isKeyPrefixValid) {
      console.error("[RAZORPAY CONFIG ERROR] Invalid Key ID prefix:", keyId.substring(0, 9));
      return NextResponse.json(
        { 
          error: "Invalid Razorpay Key ID format. Key ID must start with 'rzp_test_' or 'rzp_live_'.", 
          success: false 
        },
        { status: 500 }
      );
    }

    // 5. Real Server-to-Server Razorpay Order API Creation
    const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: `rcpt_50adv_${targetInvoice.invoiceId}`,
        notes: {
          invoiceId: targetInvoice.invoiceId,
          projectId: targetInvoice.projectId,
          clientName: targetInvoice.clientName,
          clientEmail: targetInvoice.clientEmail,
          paymentType: "50% PROJECT ADVANCE"
        }
      })
    });

    const razorpayData = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      console.error("[RAZORPAY API ORDER CREATION ERROR]", razorpayData);
      return NextResponse.json(
        { error: razorpayData.error?.description || "Failed to create Razorpay Order.", success: false },
        { status: 500 }
      );
    }

    // Store Razorpay order ID on invoice
    targetInvoice.razorpayOrderId = razorpayData.id;
    await dbSaveInvoice(targetInvoice);

    // Return required property structure: { success, orderId, amount, currency, keyId, ... }
    return NextResponse.json({
      success: true,
      orderId: razorpayData.id,
      amount: razorpayData.amount,
      currency: razorpayData.currency || "INR",
      keyId,
      invoiceId: targetInvoice.invoiceId,
      projectId: targetInvoice.projectId,
      amountInRupees: advanceAmountInRupees
    });
  } catch (error: any) {
    console.error("[CREATE RAZORPAY ORDER ROUTE ERROR]", error);
    return NextResponse.json(
      { error: `Internal payment processing error: ${error.message || "Unknown error"}`, success: false },
      { status: 500 }
    );
  }
}

