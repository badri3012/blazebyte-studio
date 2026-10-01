import { NextResponse } from "next/server";
import { sendLeadNotificationEmail } from "@/lib/email";
import { dbSaveLead } from "@/lib/supabase-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, goal, details, message } = body;

    // 1. Validate
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Valid name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 });
    }

    const sanitize = (str: string) =>
      str ? String(str).replace(/[<>]/g, "").trim() : "";

    const cleanData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone || ""),
      service: sanitize(service || "General Enquiry"),
      budget: sanitize(budget || "Not Specified"),
      goal: sanitize(goal || "Not Specified"),
      details: sanitize(details || message || ""),
      timestamp: new Date().toISOString(),
    };

    // 2. Persist Lead to Supabase PostgreSQL Datastore
    await dbSaveLead({
      full_name: cleanData.name,
      email: cleanData.email,
      phone: cleanData.phone,
      services: cleanData.service,
      budget: cleanData.budget,
      goals: cleanData.goal,
      message: cleanData.details,
      source: "contact-form",
      status: "New",
    });

    // 3. Email Notification (Attempted after business record is securely persisted)
    try {
      await sendLeadNotificationEmail({
        full_name: cleanData.name,
        business_name: cleanData.name,
        email: cleanData.email,
        phone: cleanData.phone,
        services: cleanData.service,
        budget: cleanData.budget,
        goals: cleanData.goal,
        message: cleanData.details,
        source: "contact-form",
      });
    } catch (emailErr) {
      console.warn("[CONTACT FORM] Email notification skipped/failed, lead remains saved:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry successfully received. Our team will respond within 24 hours.",
        data: { name: cleanData.name, service: cleanData.service },
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
    console.error("[API CONTACT ERROR]", error);
    return NextResponse.json(
      { error: "Internal server processing error" },
      { status: 500 }
    );
  }
}
