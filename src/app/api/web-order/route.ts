import { NextResponse } from "next/server";
import { sendLeadNotificationEmail } from "@/lib/email";
import { dbSaveLead, dbSaveInvoice } from "@/lib/supabase-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      projectId,
      projectType,
      businessName,
      currentWebsite,
      industry,
      location,
      businessDescription,
      projectGoals,
      designDirection,
      colorPreference,
      brandingStatus,
      brandAssetNote,
      selectedFeatures,
      contentStatus,
      contentChecklist,
      budgetRange,
      timeline,
      specificLaunchDate,
      referenceWebsites,
      referenceNotes,
      projectDescription,
      clientName,
      clientCompany,
      email,
      whatsapp,
      preferredContact,
      answers,
      invoiceId,
    } = body;

    // 1. Validate
    if (!clientName || typeof clientName !== "string" || clientName.trim().length === 0) {
      return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid Email address is required." }, { status: 400 });
    }
    const effectiveBusinessName = businessName || (answers && answers.businessName) || clientCompany;
    if (!effectiveBusinessName || typeof effectiveBusinessName !== "string" || effectiveBusinessName.trim().length === 0) {
      return NextResponse.json({ error: "Business / Brand Name is required." }, { status: 400 });
    }

    const sanitize = (str: string) => (str ? String(str).replace(/[<>]/g, "").trim() : "");

    const safeProjectId = sanitize(projectId || `BB-WEB-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    const safeInvoiceId = sanitize(invoiceId || `INV-BB-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    const safeName = sanitize(clientName);
    const safeEmail = sanitize(email);
    const safeCompany = sanitize(clientCompany || effectiveBusinessName || "");
    const safeWhatsApp = sanitize(whatsapp || "");
    const safeBudget = sanitize(budgetRange || (answers && answers.budget) || "Custom");
    const selectedPackageName = (answers && answers.selectedPackage) || "Web Project";

    // 2. Persist Business Records to Supabase PostgreSQL Datastore
    await dbSaveLead({
      full_name: safeName,
      email: safeEmail,
      phone: safeWhatsApp,
      business_name: safeCompany,
      services: "Web Development",
      package: selectedPackageName,
      budget: safeBudget,
      timeline: sanitize(timeline || (answers && answers.timeline) || "4–6 WEEKS"),
      requirements: businessDescription || (answers && answers.businessDescription) || "",
      source: "web-order",
      status: "New",
    });

    const invoiceRecord = await dbSaveInvoice({
      invoiceId: safeInvoiceId,
      projectId: safeProjectId,
      clientName: safeName,
      clientCompany: safeCompany,
      clientEmail: safeEmail,
      clientPhone: safeWhatsApp,
      projectName: `${safeCompany || safeName} — Web Platform`,
      serviceCategory: "Web",
      selectedPackage: selectedPackageName,
      totalAmount: 15000,
      scopeSummary: [
        "Responsive, mobile-optimised web architecture",
        "Custom UI/UX design system",
        "Lead capture & WhatsApp conversion integration",
        "SEO foundation & deployment",
      ],
      notes: `Order submitted via /web/order. Budget: ${safeBudget}`,
    });

    // 3. Email Notification (Attempted after business records are securely persisted)
    try {
      await sendLeadNotificationEmail({
        full_name: safeName,
        business_name: safeCompany,
        email: safeEmail,
        phone: safeWhatsApp,
        services: "Web Development / Web Studio",
        package: selectedPackageName,
        budget: safeBudget,
        timeline: sanitize(timeline || (answers && answers.timeline) || "4–6 WEEKS"),
        requirements: businessDescription || (answers && answers.businessDescription) || "",
        source: "web-order",
      });
    } catch (emailErr) {
      console.warn("[WEB ORDER] Email notification skipped/failed, business record remains saved:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        projectId: invoiceRecord.projectId,
        invoiceId: invoiceRecord.invoiceId,
        message: "Web project specification successfully recorded.",
        data: { projectId: invoiceRecord.projectId, invoiceId: invoiceRecord.invoiceId },
      },
      {
        status: 200,
        headers: {
          "X-Content-Type-Options": "nosniff",
          "Referrer-Policy": "origin-when-cross-origin",
        },
      }
    );
  } catch (error: any) {
    console.error("[API WEB ORDER ERROR]", error);
    return NextResponse.json({ error: "DB Error: " + (error.message || String(error)) }, { status: 500 });
  }
}


