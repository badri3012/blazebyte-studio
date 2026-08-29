import { Resend } from "resend";
import { siteConfig } from "@/config/site";

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export type EmailLeadData = {
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  location?: string;
  industry?: string;
  services?: string;
  package?: string;
  budget?: string;
  timeline?: string;
  website_url?: string;
  requirements?: string;
  goals?: string;
  message?: string;
  source: string;
};

export async function sendLeadNotificationEmail(data: EmailLeadData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Email notification skipped.");
    return { success: false, error: "Missing API Key" };
  }

  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL || siteConfig.email;
  // Fallback to a verified domain if your domain isn't verified in Resend yet
  // E.g., onboarding@resend.dev is the default testing sender in Resend
  const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";
  
  const subject = `New BlazeByte Studio Project Enquiry — ${data.business_name || data.full_name}`;

  const isProject = data.source === 'order-project';

  const textBody = `
NEW PROJECT ENQUIRY

Client:
${data.full_name}

Business:
${data.business_name || 'N/A'}

Email:
${data.email}

Phone:
${data.phone || 'N/A'}

Location:
${data.location || 'N/A'}

Industry:
${data.industry || 'N/A'}

Website:
${data.website_url || 'N/A'}

${isProject ? `
Requirements:
${data.requirements || 'N/A'}
` : ''}

Services:
${data.services || 'N/A'}

Package:
${data.package || (data.budget ? `Budget: ${data.budget}` : 'N/A')}

Goals:
${data.goals || 'N/A'}

Timeline:
${data.timeline || 'N/A'}

Additional Message:
${data.message || 'N/A'}

Submitted At:
${new Date().toLocaleString()}
`;

  try {
    const { data: resendData, error } = await resend.emails.send({
      from: `BlazeByte Studio <${fromEmail}>`,
      to: notificationEmail,
      replyTo: data.email,
      subject,
      text: textBody,
    });

    if (error) {
      console.error("Resend API error:", error);
      return { success: false, error };
    }

    return { success: true, data: resendData };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}
