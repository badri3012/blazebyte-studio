"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { sendLeadNotificationEmail, EmailLeadData } from "@/lib/email";

export async function submitLead(formData: FormData) {
  const supabase = await createClient();

  const full_name = (formData.get("full_name") as string) || (formData.get("name") as string) || "";
  const business_name = (formData.get("business_name") as string) || "";
  let email = (formData.get("email") as string) || "";
  const phone = (formData.get("phone") as string) || "";
  const location = (formData.get("location") as string) || "";
  const industry = (formData.get("industry") as string) || (formData.get("business_type") as string) || "";
  
  // requirements is only on the order project form
  const requirements = (formData.get("requirements") as string) || "";
  const services = (formData.get("services") as string) || (formData.get("service_interested_in") as string) || "";
  const package_name = (formData.get("package") as string) || "";
  const budget = (formData.get("budget") as string) || "";
  const timeline = (formData.get("timeline") as string) || "";
  const website_url = (formData.get("website_url") as string) || "";
  const goals = (formData.get("goals") as string) || (formData.get("marketing_goal") as string) || "";
  const message = (formData.get("message") as string) || "";
  const source = (formData.get("source") as string) || "contact";

  // Clean data
  email = email.trim().toLowerCase();
  const cleanedName = full_name.trim();
  const cleanedBusiness = business_name.trim();

  // Basic validation
  if (!cleanedName || !email) {
    return { error: "Name and email are required." };
  }
  
  // Robust email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please provide a valid email address." };
  }

  const leadData = {
    full_name: cleanedName,
    business_name: cleanedBusiness,
    email,
    phone: phone.trim(),
    location: location.trim(),
    industry,
    services,
    package: package_name,
    budget,
    timeline,
    website_url: website_url.trim(),
    goals,
    requirements: requirements.trim(),
    message: message.trim(),
    source,
    status: "New",
  };

  // 1. Insert to Supabase
  const { error: dbError } = await supabase.from("leads").insert(leadData);

  if (dbError) {
    console.error("Error submitting lead to DB:", dbError);
    return { error: "Failed to submit request. Please try again later." };
  }

  // 2. Send Email Notification
  // Note: If email fails, we still return success to the user since we saved the lead.
  // The error is logged securely on the server.
  const emailResult = await sendLeadNotificationEmail(leadData as EmailLeadData);
  if (!emailResult.success) {
    console.error("Lead saved but email notification failed:", emailResult.error);
  }

  revalidatePath("/admin/leads");
  return { success: true };
}
