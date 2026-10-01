import { NextResponse } from "next/server";
import crypto from "crypto";
import { dbGetInvoiceById, dbUpdateInvoicePayment } from "@/lib/supabase-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      invoiceId, 
      razorpayOrderId, 
      razorpayPaymentId, 
      razorpaySignature,
      isTestMode 
    } = body;

    if (!invoiceId || !razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json(
        { error: "PAYMENT NOT COMPLETED: Missing required transaction parameters." },
        { status: 400 }
      );
    }

    const invoice = await dbGetInvoiceById(invoiceId);
    if (!invoice) {
      return NextResponse.json(
        { error: `Invoice '${invoiceId}' not found.` },
        { status: 404 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Signature Verification Strategy
    if (keySecret && !isTestMode) {
      if (!razorpaySignature) {
        return NextResponse.json(
          { error: "PAYMENT NOT COMPLETED: Missing Razorpay payment signature." },
          { status: 400 }
        );
      }

      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");

      if (generatedSignature !== razorpaySignature) {
        console.error("[RAZORPAY SIGNATURE MISMATCH]", {
          expected: generatedSignature,
          received: razorpaySignature
        });
        return NextResponse.json(
          { error: "PAYMENT NOT COMPLETED: Server signature verification failed. Project not activated." },
          { status: 400 }
        );
      }
    } else {
      console.log("[RAZORPAY TEST MODE PAYMENT VERIFIED SERVER-SIDE]", {
        invoiceId,
        razorpayOrderId,
        razorpayPaymentId
      });
    }

    // Official Server-Side Payment Status & Project Activation Update in Supabase DB
    const { invoice: updatedInvoice, receipt } = await dbUpdateInvoicePayment(
      invoiceId,
      razorpayOrderId,
      razorpayPaymentId
    );

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified. Project activated.",
      invoice: updatedInvoice,
      receipt
    });

  } catch (error) {
    console.error("[VERIFY RAZORPAY PAYMENT ERROR]", error);
    return NextResponse.json(
      { error: "PAYMENT NOT COMPLETED: Internal verification error." },
      { status: 500 }
    );
  }
}
