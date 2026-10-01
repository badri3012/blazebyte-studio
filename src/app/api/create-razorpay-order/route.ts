import { NextResponse } from "next/server";
import { PACKAGE_AUTHORITATIVE_PRICES } from "@/lib/invoice-store";
import { dbGetInvoiceById, dbSaveInvoice } from "@/lib/supabase-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoiceId, packageId, clientName, clientEmail } = body;

    let targetInvoice = null;

    // 1. Look up by explicit invoiceId if provided
    if (invoiceId) {
      targetInvoice = await dbGetInvoiceById(invoiceId);
    }

    // 2. If no invoiceId, look up or create invoice by packageId
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
        { error: "Invalid invoice or package identifier specified." },
        { status: 400 }
      );
    }

    // 3. Duplicate Payment Protection Check
    if (targetInvoice.status === "ADVANCE PAID" || targetInvoice.status === "PAID IN FULL" || targetInvoice.status === "PROJECT ACTIVE") {
      return NextResponse.json(
        { 
          error: "ADVANCE ALREADY PAID: The 50% advance for this project has already been confirmed.",
          alreadyPaid: true,
          invoiceId: targetInvoice.invoiceId,
          status: targetInvoice.status
        },
        { status: 400 }
      );
    }

    // 4. Server-Side Authoritative 50% Advance Calculation (INR ₹ -> Paise)
    const advanceAmountInRupees = targetInvoice.advanceRequired;
    const amountInPaise = Math.round(advanceAmountInRupees * 100);

    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder_key";
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if real Razorpay secret is set
    if (!keySecret) {
      console.log("[RAZORPAY TEST MODE ORDER GENERATED]", {
        invoiceId: targetInvoice.invoiceId,
        projectId: targetInvoice.projectId,
        advanceAmountInRupees,
        amountInPaise,
        clientEmail: targetInvoice.clientEmail
      });

      return NextResponse.json({
        success: true,
        testMode: true,
        orderId: `order_mock_${targetInvoice.invoiceId.replace(/[^A-Z0-9]/g, "")}_${Date.now().toString().slice(-6)}`,
        invoiceId: targetInvoice.invoiceId,
        projectId: targetInvoice.projectId,
        amount: amountInPaise,
        amountInRupees: advanceAmountInRupees,
        currency: "INR",
        keyId,
        message: "Razorpay Test Mode Order Created Successfully."
      });
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
      console.error("[RAZORPAY API ERROR]", razorpayData);
      return NextResponse.json(
        { error: razorpayData.error?.description || "Failed to create Razorpay Order." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayData.id,
      invoiceId: targetInvoice.invoiceId,
      projectId: targetInvoice.projectId,
      amount: razorpayData.amount,
      amountInRupees: advanceAmountInRupees,
      currency: razorpayData.currency,
      keyId
    });
  } catch (error) {
    console.error("[CREATE RAZORPAY ORDER ROUTE ERROR]", error);
    return NextResponse.json(
      { error: "Internal payment processing error." },
      { status: 500 }
    );
  }
}
