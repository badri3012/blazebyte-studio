-- BlazeByte Studio Supabase Safe Migration Schema v3 (Final Security Audit)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: profiles (Admin/Staff Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: leads (Base table creation if not exists)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Safely add all required columns to leads without destroying existing data
DO $$ 
BEGIN
  BEGIN ALTER TABLE public.leads ADD COLUMN business_name TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN phone TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN location TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN industry TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN website_url TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN requirements TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN services TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN package TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN goals TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN budget TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN timeline TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN message TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN source TEXT DEFAULT 'contact'; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.leads ADD COLUMN status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost')); EXCEPTION WHEN duplicate_column THEN END;
END $$;

-- 4. Destroy instagram_url safely if it somehow exists
DO $$ 
BEGIN
  BEGIN ALTER TABLE public.leads DROP COLUMN instagram_url; EXCEPTION WHEN undefined_column THEN END;
END $$;

-- 5. Table: case_studies
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  challenge TEXT NOT NULL,
  strategy TEXT NOT NULL,
  execution TEXT NOT NULL,
  outcome TEXT NOT NULL,
  cover_image TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Table: testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  business_name TEXT,
  content TEXT NOT NULL,
  avatar_url TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 8. Drop existing policies safely to prevent conflicts
DO $$
BEGIN
    DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;
    DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
    
    DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
    DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
    DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
    
    DROP POLICY IF EXISTS "Public can view published case studies" ON public.case_studies;
    DROP POLICY IF EXISTS "Authorized users can manage case studies" ON public.case_studies;
    DROP POLICY IF EXISTS "Authenticated users can manage case studies" ON public.case_studies;
    DROP POLICY IF EXISTS "Admin/Staff can insert case studies" ON public.case_studies;
    DROP POLICY IF EXISTS "Admin/Staff can select case studies" ON public.case_studies;
    DROP POLICY IF EXISTS "Admin/Staff can update case studies" ON public.case_studies;
    DROP POLICY IF EXISTS "Admin/Staff can delete case studies" ON public.case_studies;
    
    DROP POLICY IF EXISTS "Public can view published testimonials" ON public.testimonials;
    DROP POLICY IF EXISTS "Authorized users can manage testimonials" ON public.testimonials;
    DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON public.testimonials;
    DROP POLICY IF EXISTS "Admin/Staff can insert testimonials" ON public.testimonials;
    DROP POLICY IF EXISTS "Admin/Staff can select testimonials" ON public.testimonials;
    DROP POLICY IF EXISTS "Admin/Staff can update testimonials" ON public.testimonials;
    DROP POLICY IF EXISTS "Admin/Staff can delete testimonials" ON public.testimonials;
END $$;

-- 9. Recreate Secure Policies for profiles
CREATE POLICY "Profiles are viewable by authenticated users" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 10. Recreate Secure Policies for leads
CREATE POLICY "Public can insert leads" ON public.leads
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can view leads" ON public.leads
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role IN ('admin', 'staff')));

CREATE POLICY "Admins can update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role IN ('admin', 'staff')));

-- 11. Recreate Secure Policies for case_studies
CREATE POLICY "Public can view published case studies" ON public.case_studies
  FOR SELECT TO public USING (is_published = true);

CREATE POLICY "Admin/Staff can insert case studies" ON public.case_studies
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role IN ('admin', 'staff')));

CREATE POLICY "Admin/Staff can select case studies" ON public.case_studies
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role IN ('admin', 'staff')));

CREATE POLICY "Admin/Staff can update case studies" ON public.case_studies
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role IN ('admin', 'staff')));

CREATE POLICY "Admin/Staff can delete case studies" ON public.case_studies
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role IN ('admin', 'staff')));

-- 12. Recreate Secure Policies for testimonials
CREATE POLICY "Public can view published testimonials" ON public.testimonials
  FOR SELECT TO public USING (is_published = true);

CREATE POLICY "Admin/Staff can insert testimonials" ON public.testimonials
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role IN ('admin', 'staff')));

CREATE POLICY "Admin/Staff can select testimonials" ON public.testimonials
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role IN ('admin', 'staff')));

CREATE POLICY "Admin/Staff can update testimonials" ON public.testimonials
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role IN ('admin', 'staff')));

CREATE POLICY "Admin/Staff can delete testimonials" ON public.testimonials
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND role IN ('admin', 'staff')));

-- 13. Security Triggers for Privilege Escalation Prevention
-- Prevent non-admins from changing their role during UPDATE
CREATE OR REPLACE FUNCTION check_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') THEN
      RAISE EXCEPTION 'Security Exception: You do not have permission to change your role.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Force 'staff' role on INSERT unless the creator is an admin
CREATE OR REPLACE FUNCTION enforce_staff_role_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'admin' THEN
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') THEN
      NEW.role = 'staff';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
    DROP TRIGGER IF EXISTS prevent_role_escalation ON public.profiles;
    DROP TRIGGER IF EXISTS prevent_admin_insert ON public.profiles;
END $$;

CREATE TRIGGER prevent_role_escalation BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE check_role_escalation();
CREATE TRIGGER prevent_admin_insert BEFORE INSERT ON public.profiles FOR EACH ROW EXECUTE PROCEDURE enforce_staff_role_on_insert();


-- 14. Update Timestamp Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
    DROP TRIGGER IF EXISTS update_profiles_modtime ON public.profiles;
    DROP TRIGGER IF EXISTS update_leads_modtime ON public.leads;
    DROP TRIGGER IF EXISTS update_case_studies_modtime ON public.case_studies;
    DROP TRIGGER IF EXISTS update_testimonials_modtime ON public.testimonials;
END $$;

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_leads_modtime BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_case_studies_modtime BEFORE UPDATE ON public.case_studies FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_testimonials_modtime BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
