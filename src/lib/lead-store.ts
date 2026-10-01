export interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  business_name?: string;
  industry?: string;
  services?: string;
  package?: string;
  budget?: string;
  timeline?: string;
  goals?: string;
  requirements?: string;
  message?: string;
  source: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: "lead_1001",
    full_name: "Rahul Sharma",
    email: "rahul@sharmaartisans.com",
    phone: "+91 98765 43210",
    business_name: "Sharma Artisans",
    industry: "E-Commerce & Crafts",
    services: "Web Development",
    package: "WEB STARTER",
    budget: "₹5,000",
    timeline: "2 Weeks",
    source: "web-order",
    status: "New",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "lead_1002",
    full_name: "Kwame Mensah",
    email: "kwame@catfishgrill.com",
    phone: "+233 24 123 4567",
    business_name: "The Catfish Grill",
    industry: "Hospitality & Dining",
    services: "Web Development",
    package: "WEB GROWTH",
    budget: "₹15,000",
    timeline: "3 Weeks",
    source: "web-order",
    status: "Contacted",
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "lead_1003",
    full_name: "Priya Nair",
    email: "priya@vitagold.in",
    phone: "+91 91234 56789",
    business_name: "Vitagold Kitchen",
    industry: "Catering & Culinary",
    services: "Web Development",
    package: "WEB PROFESSIONAL",
    budget: "₹30,000",
    timeline: "4 Weeks",
    source: "web-order",
    status: "Qualified",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "lead_1004",
    full_name: "David Andy",
    email: "david@andyfoods.com",
    phone: "+233 20 987 6543",
    business_name: "Andy Foods GH",
    industry: "Food Distribution",
    services: "Digital Marketing",
    package: "MARKETING GROWTH",
    budget: "₹25,000 / mo",
    timeline: "Monthly",
    source: "marketing-order",
    status: "Proposal Sent",
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

function loadLeadsFromDisk(): Record<string, Lead> {
  if (typeof window !== "undefined") return {};
  try {
    const fs = require("fs");
    const path = require("path");
    const dataDir = path.join(process.cwd(), "data");
    const file = path.join(dataDir, "leads.json");

    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf8");
      return JSON.parse(data);
    } else {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      const map: Record<string, Lead> = {};
      INITIAL_LEADS.forEach((l) => { map[l.id] = l; });
      fs.writeFileSync(file, JSON.stringify(map, null, 2), "utf8");
      return map;
    }
  } catch (err) {
    console.error("[LEAD STORE] Disk read error:", err);
  }
  const map: Record<string, Lead> = {};
  INITIAL_LEADS.forEach((l) => { map[l.id] = l; });
  return map;
}

function saveLeadsToDisk(map: Record<string, Lead>): void {
  if (typeof window !== "undefined") return;
  try {
    const fs = require("fs");
    const path = require("path");
    const dataDir = path.join(process.cwd(), "data");
    const file = path.join(dataDir, "leads.json");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(map, null, 2), "utf8");
  } catch (err) {
    console.error("[LEAD STORE] Disk write error:", err);
  }
}

let leadRegistry: Record<string, Lead> = loadLeadsFromDisk();

export function getAllLeads(): Lead[] {
  leadRegistry = loadLeadsFromDisk();
  return Object.values(leadRegistry).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function getLeadById(id: string): Lead | null {
  leadRegistry = loadLeadsFromDisk();
  return leadRegistry[id] || null;
}

export function saveOrUpdateLead(leadData: Partial<Lead> & { full_name: string; email: string }): Lead {
  leadRegistry = loadLeadsFromDisk();

  const id = leadData.id || `lead_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const existing = leadRegistry[id];

  const lead: Lead = {
    id,
    full_name: leadData.full_name,
    email: leadData.email,
    phone: leadData.phone || existing?.phone || "",
    business_name: leadData.business_name || existing?.business_name || "",
    industry: leadData.industry || existing?.industry || "",
    services: leadData.services || existing?.services || "General Enquiry",
    package: leadData.package || existing?.package || "Custom",
    budget: leadData.budget || existing?.budget || "Not Specified",
    timeline: leadData.timeline || existing?.timeline || "Standard",
    goals: leadData.goals || existing?.goals || "",
    requirements: leadData.requirements || existing?.requirements || "",
    message: leadData.message || existing?.message || "",
    source: leadData.source || existing?.source || "website",
    status: leadData.status || existing?.status || "New",
    created_at: existing?.created_at || leadData.created_at || now,
    updated_at: now,
  };

  leadRegistry[id] = lead;
  saveLeadsToDisk(leadRegistry);
  return lead;
}

export function updateLeadStatusInStore(id: string, status: string): Lead | null {
  leadRegistry = loadLeadsFromDisk();
  if (!leadRegistry[id]) return null;

  leadRegistry[id].status = status;
  leadRegistry[id].updated_at = new Date().toISOString();

  saveLeadsToDisk(leadRegistry);
  return leadRegistry[id];
}
