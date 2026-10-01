import { NextResponse } from "next/server";
import { sendLeadNotificationEmail } from "@/lib/email";
import { dbSaveLead, dbSaveInvoice } from "@/lib/supabase-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      projectId,
      invoiceId,
      serviceType,
      clientName,
      clientCompany,
      email,
      whatsapp,
      answers,
      selectedFeatures,
      createdAt,
    } = body;

    // 1. Validate
    if (!clientName || typeof clientName !== "string" || clientName.trim().length === 0) {
      return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid Email address is required." }, { status: 400 });
    }

    const sanitize = (str: string) => (str ? String(str).replace(/[<>]/g, "").trim() : "");

    const safeProjectId = sanitize(projectId || `BB-APP-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    const safeInvoiceId = sanitize(invoiceId || `INV-BB-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    const safeName = sanitize(clientName);
    const safeEmail = sanitize(email);
    const safeCompany = sanitize(clientCompany || "");
    const safeWhatsApp = sanitize(whatsapp || "");

    const selectedPackageName = answers?.selectedPackage || "Custom Application Build";
    const estimatedBudget = answers?.budget || "Custom (from ₹50,000)";

    // 2. Persist Business Records to Supabase PostgreSQL Datastore
    await dbSaveLead({
      full_name: safeName,
      email: safeEmail,
      phone: safeWhatsApp,
      business_name: safeCompany,
      services: "Custom Apps",
      package: selectedPackageName,
      budget: estimatedBudget,
      requirements: JSON.stringify(answers || {}),
      source: "apps-order",
      status: "New",
    });

    const invoiceRecord = await dbSaveInvoice({
      invoiceId: safeInvoiceId,
      projectId: safeProjectId,
      clientName: safeName,
      clientCompany: safeCompany,
      clientEmail: safeEmail,
      clientPhone: safeWhatsApp,
      projectName: `${safeCompany || safeName} — Custom Software Application`,
      serviceCategory: "App",
      selectedPackage: selectedPackageName,
      totalAmount: 75000,
      scopeSummary: [
        "Custom product architecture & UI/UX wireframing",
        "Full-stack development (React / Next.js / Node.js)",
        "Relational database design & API engineering",
        "Role-based authentication & admin panel",
        "Testing, deployment & post-launch support",
      ],
      notes: `Order submitted via /apps/order. Budget: ${estimatedBudget}`,
    });

    // 3. Email Notification (Attempted after business records are securely persisted)
    try {
      await sendLeadNotificationEmail({
        full_name: safeName,
        business_name: safeCompany || safeName,
        email: safeEmail,
        phone: safeWhatsApp,
        services: "Custom Apps / Product Studio",
        package: selectedPackageName,
        budget: estimatedBudget,
        requirements: JSON.stringify(answers || {}),
        source: "apps-order",
      });
    } catch (emailErr) {
      console.warn("[APPS ORDER] Email notification skipped/failed, business record remains saved:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        projectId: invoiceRecord.projectId,
        invoiceId: invoiceRecord.invoiceId,
        message: "App project specification successfully recorded.",
      },
      {
        status: 200,
        headers: {
          "X-Content-Type-Options": "nosniff",
          "Referrer-Policy": "origin-when-cross-origin",
        },
      }
    );
  } catch (error) {
    console.error("[API APPS ORDER ERROR]", error);
    return NextResponse.json(
      { error: "Internal server processing error." },
      { status: 500 }
    );
  }
}
