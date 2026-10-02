import { createClient } from "@supabase/supabase-js";
import { Lead } from "./lead-store";
import { Invoice, PaymentReceipt } from "./invoice-store";
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
  if (!supabase) return [];

  try {
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as Lead[];
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - LEADS]:", err);
    return [];
  }
}

export async function dbSaveLead(leadData: Partial<Lead> & { full_name: string; email: string }): Promise<Lead> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase is required to save a lead.");

  try {
    const payload = {
      id: leadData.id,
      full_name: leadData.full_name,
      name: leadData.full_name,
      email: leadData.email,
      phone: leadData.phone,
      business_name: leadData.business_name,
      industry: leadData.industry,
      business_type: leadData.industry,
      services: leadData.services,
      service_interested_in: leadData.services,
      package: leadData.package,
      budget: leadData.budget,
      timeline: leadData.timeline,
      goals: leadData.goals,
      requirements: leadData.requirements,
      message: leadData.message,
      source: leadData.source,
      status: leadData.status || "New",
    };

    const { data, error } = await supabase.from("leads").upsert(payload).select().single();
    if (error) {
      throw new Error(`[SUPABASE UPSERT ERROR - LEAD]: ${error.message}`);
    }
    return data as Lead;
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - SAVE LEAD]:", err);
    throw err;
  }
}

export async function dbUpdateLeadStatus(id: string, status: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

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
  if (!supabase) return [];

  try {
    const { data, error } = await supabase.from("invoices").select("*").order("invoiceDate", { ascending: false });
    if (error || !data) return [];
    return data as Invoice[];
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - INVOICES]:", err);
    return [];
  }
}

export async function dbGetInvoiceById(invoiceId: string): Promise<Invoice | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase.from("invoices").select("*").eq("invoiceId", invoiceId.trim().toUpperCase()).single();
    if (error || !data) return null;
    return data as Invoice;
  } catch {
    return null;
  }
}

export async function dbGetInvoiceByProjectId(projectId: string): Promise<Invoice | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase.from("invoices").select("*").eq("projectId", projectId.trim().toUpperCase()).single();
    if (error || !data) return null;
    return data as Invoice;
  } catch {
    return null;
  }
}

export async function dbSaveInvoice(invoiceData: Partial<Invoice> & { totalAmount: number; clientName: string; clientEmail: string }): Promise<Invoice> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase is required to save invoice.");

  // Generate ID if missing
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const invoiceId = invoiceData.invoiceId || `INV-BB-2026-${randNum}`;
  const projectId = invoiceData.projectId || `BB-PRJ-2026-${randNum}`;
  
  const totalAmount = Number(invoiceData.totalAmount);
  const advanceRequired = Math.round(totalAmount * 0.50);
  const advancePaid = invoiceData.advancePaid || 0;
  const balanceRemaining = totalAmount - advancePaid;

  const today = new Date().toISOString().split("T")[0];
  const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const payload: Invoice = {
    invoiceId,
    projectId,
    invoiceDate: invoiceData.invoiceDate || today,
    dueDate: invoiceData.dueDate || dueDate,
    clientName: invoiceData.clientName,
    clientCompany: invoiceData.clientCompany || "Independent Client",
    clientEmail: invoiceData.clientEmail,
    clientPhone: invoiceData.clientPhone || "+91 98765 43210",
    projectName: invoiceData.projectName || `${invoiceData.serviceCategory || "Digital"} System Build`,
    serviceCategory: invoiceData.serviceCategory || "Web",
    selectedPackage: invoiceData.selectedPackage || "Custom Package",
    scopeSummary: invoiceData.scopeSummary || [],
    subtotal: totalAmount,
    tax: invoiceData.tax || 0,
    totalAmount,
    advanceRequired,
    advancePaid,
    balanceRemaining,
    status: (invoiceData.status === "ADVANCE PAID" || invoiceData.status === "PAID IN FULL") && advancePaid > 0 && Boolean(invoiceData.razorpayPaymentId) 
      ? invoiceData.status 
      : "AWAITING ADVANCE",
    paymentTerms: invoiceData.paymentTerms || [],
    razorpayOrderId: invoiceData.razorpayOrderId,
    razorpayPaymentId: invoiceData.razorpayPaymentId,
    paymentDate: invoiceData.paymentDate,
    receiptId: invoiceData.receiptId,
    notes: invoiceData.notes || ""
  };

  try {
    const { data, error } = await supabase.from("invoices").upsert(payload).select().single();
    if (error) {
      throw new Error(`[SUPABASE UPSERT ERROR - INVOICE]: ${error.message}`);
    }
    return data as Invoice;
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - SAVE INVOICE]:", err);
    throw err;
  }
}

export async function dbUpdateInvoicePayment(
  invoiceId: string,
  razorpayOrderId: string,
  razorpayPaymentId: string
): Promise<{ invoice: Invoice; receipt: PaymentReceipt }> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase is required for payments.");

  try {
    const { data: inv, error: getErr } = await supabase.from("invoices").select("*").eq("invoiceId", invoiceId).single();
    if (getErr || !inv) throw new Error(`Invoice not found: ${getErr?.message || "Unknown error"}`);

    const amountPaid = inv.advanceRequired;
    const balanceRemaining = inv.totalAmount - amountPaid;
    const paymentDate = new Date().toISOString();
    const receiptId = `RCPT-BB-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const updatedInvoice = {
      ...inv,
      advancePaid: amountPaid,
      balanceRemaining,
      status: balanceRemaining === 0 ? "PAID IN FULL" : "ADVANCE PAID",
      razorpayOrderId,
      razorpayPaymentId,
      paymentDate,
      receiptId
    };

    const receipt: PaymentReceipt = {
      receiptId,
      invoiceId: inv.invoiceId,
      projectId: inv.projectId,
      clientName: inv.clientName,
      clientCompany: inv.clientCompany,
      clientEmail: inv.clientEmail,
      amountPaid,
      paymentType: "50% PROJECT ADVANCE",
      paymentMethod: "Razorpay Online Gateway",
      paymentReference: razorpayPaymentId,
      paymentDate,
      status: "PAID",
      balanceRemaining
    };

    // 1. Update Invoices Table
    const { error: invErr } = await supabase.from("invoices").update(updatedInvoice).eq("invoiceId", invoiceId);
    if (invErr) console.warn("[SUPABASE UPDATE ERROR - INVOICE PAYMENT]:", invErr.message);

    // 2. Insert into Payments Table
    const paymentRecord = {
      receipt_id: receiptId,
      invoice_id: receipt.invoiceId,
      project_id: receipt.projectId,
      client_name: receipt.clientName,
      client_email: receipt.clientEmail,
      amount_paid: receipt.amountPaid,
      payment_type: receipt.paymentType,
      payment_method: receipt.paymentMethod,
      payment_reference: receipt.paymentReference,
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      status: "VERIFIED",
      payment_date: receipt.paymentDate,
    };

    const { error: payErr } = await supabase.from("payments").upsert(paymentRecord);
    if (payErr) console.warn("[SUPABASE UPSERT ERROR - PAYMENT RECEIPT]:", payErr.message);

    // 3. Update Lead Status to "PROJECT ACTIVE"
    const { error: leadErr } = await supabase.from("leads").update({ status: "PROJECT ACTIVE" }).eq("id", inv.projectId);
    if (leadErr) console.warn("[SUPABASE UPDATE ERROR - LEAD STATUS]:", leadErr.message);

    return { invoice: updatedInvoice as Invoice, receipt };
  } catch (err) {
    console.error("[SUPABASE EXCEPTION - PAYMENT VERIFICATION]:", err);
    throw err;
  }
}
