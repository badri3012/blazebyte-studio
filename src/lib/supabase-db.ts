import { createClient } from "@supabase/supabase-js";
import { Lead, getAllLeads as getLocalLeads, saveOrUpdateLead as saveLocalLead, updateLeadStatusInStore as updateLocalLeadStatus } from "./lead-store";
import { Invoice, PaymentReceipt, getAllInvoices as getLocalInvoices, getInvoiceById as getLocalInvoiceById, getInvoiceByProjectId as getLocalInvoiceByProjectId, createOrUpdateInvoice as saveLocalInvoice, updateInvoicePaymentStatus as updateLocalInvoicePayment } from "./invoice-store";

// Clean Supabase URL helper
function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

function getSupabaseKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
}

export function isSupabaseConfigured(): boolean {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  return Boolean(url && key && url !== "https://placeholder.supabase.co");
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  return createClient(getSupabaseUrl(), getSupabaseKey(), {
    auth: { persistSession: false },
  });
}

// ==========================================
// 01. LEADS DATA LAYER (Supabase Authoritative)
// ==========================================

export async function dbGetAllLeads(): Promise<Lead[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.log("[DATA LAYER] Supabase not configured. Returning local development leads.");
    return getLocalLeads();
  }

  try {
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (error || !data) {
      console.warn("[SUPABASE READ ERROR - LEADS]:", error?.message);
      return getLocalLeads();
    }
    return data as Lead[];
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - LEADS]:", err);
    return getLocalLeads();
  }
}

export async function dbSaveLead(leadData: Partial<Lead> & { full_name: string; email: string }): Promise<Lead> {
  const localLead = saveLocalLead(leadData);

  const supabase = getSupabaseClient();
  if (!supabase) return localLead;

  try {
    const payload = {
      id: localLead.id,
      full_name: localLead.full_name,
      name: localLead.full_name,
      email: localLead.email,
      phone: localLead.phone,
      business_name: localLead.business_name,
      industry: localLead.industry,
      business_type: localLead.industry,
      services: localLead.services,
      service_interested_in: localLead.services,
      package: localLead.package,
      budget: localLead.budget,
      timeline: localLead.timeline,
      goals: localLead.goals,
      requirements: localLead.requirements,
      message: localLead.message,
      source: localLead.source,
      status: localLead.status,
      created_at: localLead.created_at,
      updated_at: localLead.updated_at,
    };

    const { data, error } = await supabase.from("leads").upsert(payload).select().single();
    if (error) {
      console.warn("[SUPABASE UPSERT ERROR - LEAD]:", error.message);
    } else if (data) {
      return data as Lead;
    }
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - SAVE LEAD]:", err);
  }

  return localLead;
}

export async function dbUpdateLeadStatus(id: string, status: string): Promise<boolean> {
  updateLocalLeadStatus(id, status);

  const supabase = getSupabaseClient();
  if (!supabase) return true;

  try {
    const { error } = await supabase
      .from("leads")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.warn("[SUPABASE UPDATE ERROR - LEAD STATUS]:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - LEAD STATUS]:", err);
    return false;
  }
}

// ==========================================
// 02. INVOICES & PAYMENTS DATA LAYER
// ==========================================

export async function dbGetAllInvoices(): Promise<Invoice[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return getLocalInvoices();

  try {
    const { data, error } = await supabase.from("invoices").select("*").order("invoiceDate", { ascending: false });
    if (error || !data || data.length === 0) {
      return getLocalInvoices();
    }
    return data as Invoice[];
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - INVOICES]:", err);
    return getLocalInvoices();
  }
}

export async function dbGetInvoiceById(invoiceId: string): Promise<Invoice | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return getLocalInvoiceById(invoiceId);

  try {
    const { data, error } = await supabase.from("invoices").select("*").eq("invoiceId", invoiceId.trim().toUpperCase()).single();
    if (error || !data) {
      return getLocalInvoiceById(invoiceId);
    }
    return data as Invoice;
  } catch {
    return getLocalInvoiceById(invoiceId);
  }
}

export async function dbGetInvoiceByProjectId(projectId: string): Promise<Invoice | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return getLocalInvoiceByProjectId(projectId);

  try {
    const { data, error } = await supabase.from("invoices").select("*").eq("projectId", projectId.trim().toUpperCase()).single();
    if (error || !data) {
      return getLocalInvoiceByProjectId(projectId);
    }
    return data as Invoice;
  } catch {
    return getLocalInvoiceByProjectId(projectId);
  }
}

export async function dbSaveInvoice(invoiceData: Partial<Invoice> & { totalAmount: number; clientName: string; clientEmail: string }): Promise<Invoice> {
  const localInvoice = saveLocalInvoice(invoiceData);

  const supabase = getSupabaseClient();
  if (!supabase) return localInvoice;

  try {
    const { data, error } = await supabase.from("invoices").upsert(localInvoice).select().single();
    if (error) {
      console.warn("[SUPABASE UPSERT ERROR - INVOICE]:", error.message);
    } else if (data) {
      return data as Invoice;
    }
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - SAVE INVOICE]:", err);
  }

  return localInvoice;
}

export async function dbUpdateInvoicePayment(
  invoiceId: string,
  razorpayOrderId: string,
  razorpayPaymentId: string
): Promise<{ invoice: Invoice; receipt: PaymentReceipt }> {
  const localResult = updateLocalInvoicePayment(invoiceId, razorpayOrderId, razorpayPaymentId);

  const supabase = getSupabaseClient();
  if (!supabase) return localResult;

  try {
    // 1. Update Invoices Table
    const { error: invErr } = await supabase.from("invoices").update(localResult.invoice).eq("invoiceId", invoiceId);
    if (invErr) console.warn("[SUPABASE UPDATE ERROR - INVOICE PAYMENT]:", invErr.message);

    // 2. Insert into Payments Table
    const paymentRecord = {
      receipt_id: localResult.receipt.receiptId,
      invoice_id: localResult.receipt.invoiceId,
      project_id: localResult.receipt.projectId,
      client_name: localResult.receipt.clientName,
      client_email: localResult.receipt.clientEmail,
      amount_paid: localResult.receipt.amountPaid,
      payment_type: localResult.receipt.paymentType,
      payment_method: localResult.receipt.paymentMethod,
      payment_reference: localResult.receipt.paymentReference,
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      status: "VERIFIED",
      payment_date: localResult.receipt.paymentDate,
    };

    const { error: payErr } = await supabase.from("payments").upsert(paymentRecord);
    if (payErr) console.warn("[SUPABASE UPSERT ERROR - PAYMENT RECEIPT]:", payErr.message);
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - PAYMENT VERIFICATION]:", err);
  }

  return localResult;
}
