-- ============================================================
-- BLAZEBYTE STUDIO — PRODUCTION POSTGRESQL SCHEMA (SUPABASE)
-- STRICT RLS SECURITY HARDENED, SCOPED TO service_role & IDEMPOTENT
-- ============================================================

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 01. PROFILES TABLE (Linked to Supabase Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT DEFAULT '',
    role TEXT NOT NULL DEFAULT 'CLIENT', -- 'SUPER_ADMIN' | 'ADMIN' | 'CLIENT'
    avatar_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 02. LEADS TABLE (Inbound Enquiries & Service Orders)
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    name TEXT DEFAULT '',
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    business_name TEXT DEFAULT '',
    industry TEXT DEFAULT '',
    business_type TEXT DEFAULT '',
    services TEXT DEFAULT '',
    service_interested_in TEXT DEFAULT '',
    package TEXT DEFAULT '',
    budget TEXT DEFAULT '',
    timeline TEXT DEFAULT '',
    goals TEXT DEFAULT '',
    requirements TEXT DEFAULT '',
    message TEXT DEFAULT '',
    source TEXT DEFAULT 'website',
    status TEXT DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 03. INVOICES TABLE (Official Quotations & Commercial Invoices)
CREATE TABLE IF NOT EXISTS public.invoices (
    "invoiceId" TEXT PRIMARY KEY,
    "projectId" TEXT UNIQUE NOT NULL,
    "invoiceDate" DATE NOT NULL,
    "dueDate" DATE NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientCompany" TEXT DEFAULT '',
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT DEFAULT '',
    "projectName" TEXT NOT NULL,
    "serviceCategory" TEXT NOT NULL,
    "selectedPackage" TEXT NOT NULL,
    "scopeSummary" JSONB DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    tax NUMERIC DEFAULT 0,
    "totalAmount" NUMERIC NOT NULL,
    "advanceRequired" NUMERIC NOT NULL,
    "advancePaid" NUMERIC DEFAULT 0,
    "balanceRemaining" NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'AWAITING ADVANCE',
    "paymentTerms" JSONB DEFAULT '[]'::jsonb,
    "razorpayOrderId" TEXT DEFAULT '',
    "razorpayPaymentId" TEXT DEFAULT '',
    "paymentDate" TIMESTAMPTZ,
    "receiptId" TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 04. PAYMENTS TABLE (Razorpay Verified Payment Receipts)
CREATE TABLE IF NOT EXISTS public.payments (
    receipt_id TEXT PRIMARY KEY,
    invoice_id TEXT REFERENCES public.invoices("invoiceId") ON DELETE CASCADE,
    project_id TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    amount_paid NUMERIC NOT NULL,
    payment_type TEXT DEFAULT '50% PROJECT ADVANCE',
    payment_method TEXT DEFAULT 'Razorpay Online Gateway',
    payment_reference TEXT NOT NULL,
    razorpay_order_id TEXT NOT NULL,
    razorpay_payment_id TEXT NOT NULL,
    status TEXT DEFAULT 'VERIFIED',
    payment_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 05. CASE STUDIES TABLE (Verified Client Work & Projects)
CREATE TABLE IF NOT EXISTS public.case_studies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Web' | 'Growth' | 'AI' | 'App'
    location TEXT DEFAULT '',
    challenge TEXT DEFAULT '',
    approach TEXT DEFAULT '',
    build TEXT DEFAULT '',
    result TEXT DEFAULT '',
    tech_stack JSONB DEFAULT '[]'::jsonb,
    image_bg TEXT DEFAULT '',
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 06. TESTIMONIALS TABLE (Client Reviews & Endorsements)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    client_name TEXT NOT NULL,
    company TEXT DEFAULT '',
    role TEXT DEFAULT '',
    content TEXT NOT NULL,
    rating NUMERIC DEFAULT 5,
    avatar_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

CREATE INDEX IF NOT EXISTS idx_invoices_project_id ON public.invoices("projectId");
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_client_email ON public.invoices("clientEmail");

CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON public.payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_order ON public.payments(razorpay_order_id);

CREATE INDEX IF NOT EXISTS idx_case_studies_category ON public.case_studies(category);

-- ROW LEVEL SECURITY (RLS) ACTIVATION
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- IDEMPOTENT RLS POLICIES (SCOPED TO SPECIFIC ROLES)
-- ============================================================

-- 1. PUBLIC READ ACCESS (Published Content Only: Scoped TO anon, authenticated)
DROP POLICY IF EXISTS "Allow public read access to case_studies" ON public.case_studies;
CREATE POLICY "Allow public read access to case_studies" ON public.case_studies FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read access to testimonials" ON public.testimonials;
CREATE POLICY "Allow public read access to testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (true);

-- 2. PUBLIC WRITE ACCESS (Inbound Lead Submissions Only: Scoped TO anon, authenticated)
DROP POLICY IF EXISTS "Allow public insert to leads" ON public.leads;
CREATE POLICY "Allow public insert to leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Drop any previous insecure or unscoped policies
DROP POLICY IF EXISTS "Allow public select of invoices" ON public.invoices;
DROP POLICY IF EXISTS "Allow public select of leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public insert to invoices" ON public.invoices;
DROP POLICY IF EXISTS "Allow public insert to payments" ON public.payments;

-- 3. SERVICE ROLE FULL ACCESS (Explicitly Scoped TO service_role ONLY)
DROP POLICY IF EXISTS "Allow service role full access to profiles" ON public.profiles;
CREATE POLICY "Allow service role full access to profiles" ON public.profiles FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access to leads" ON public.leads;
CREATE POLICY "Allow service role full access to leads" ON public.leads FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access to invoices" ON public.invoices;
CREATE POLICY "Allow service role full access to invoices" ON public.invoices FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access to payments" ON public.payments;
CREATE POLICY "Allow service role full access to payments" ON public.payments FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access to case_studies" ON public.case_studies;
CREATE POLICY "Allow service role full access to case_studies" ON public.case_studies FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access to testimonials" ON public.testimonials;
CREATE POLICY "Allow service role full access to testimonials" ON public.testimonials FOR ALL TO service_role USING (true) WITH CHECK (true);
