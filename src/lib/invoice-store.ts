export interface Invoice {
  invoiceId: string;
  projectId: string;
  invoiceDate: string;
  dueDate: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  projectName: string;
  serviceCategory: "Web" | "Growth" | "AI" | "App" | "Custom";
  selectedPackage: string;
  scopeSummary: string[];
  subtotal: number; // In INR ₹
  tax: number; // In INR ₹
  totalAmount: number; // In INR ₹
  advanceRequired: number; // In INR ₹ (50%)
  advancePaid: number; // In INR ₹ (0 until paid)
  balanceRemaining: number; // In INR ₹ (50%)
  status: 
    | "DRAFT" 
    | "ISSUED" 
    | "AWAITING ADVANCE" 
    | "ADVANCE PAID" 
    | "PROJECT ACTIVE" 
    | "BALANCE DUE" 
    | "PAID IN FULL" 
    | "CANCELLED";
  paymentTerms: string[];
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentDate?: string;
  receiptId?: string;
  notes?: string;
}

export interface PaymentReceipt {
  receiptId: string;
  invoiceId: string;
  projectId: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  amountPaid: number;
  paymentType: "50% PROJECT ADVANCE" | "100% FULL PAYMENT" | "FINAL BALANCE";
  paymentMethod: string;
  paymentReference: string;
  paymentDate: string;
  status: "PAID";
  balanceRemaining: number;
}

// Authoritative Package Pricing & Scope Map (INR ₹)
export const PACKAGE_AUTHORITATIVE_PRICES: Record<string, { title: string; price: number; category: Invoice["serviceCategory"]; scope: string[] }> = {
  "web-starter": {
    title: "WEB STARTER",
    price: 5000,
    category: "Web",
    scope: [
      "Responsive, mobile-optimized UI architecture",
      "Modern architectural visual design",
      "Contact & enquiry integration",
      "Direct WhatsApp conversion integration",
      "Basic SEO metadata & indexable structure",
      "SSL security setup & deployment"
    ]
  },
  "web-growth": {
    title: "WEB GROWTH",
    price: 15000,
    category: "Web",
    scope: [
      "Premium custom UI/UX design system",
      "Multi-page architecture (up to 7 pages)",
      "Fluid interaction design & scroll animations",
      "Structured lead capture & enquiry forms",
      "Automated WhatsApp conversion flows",
      "Search engine optimization (SEO) foundations",
      "CMS integration ready",
      "Sub-second performance target"
    ]
  },
  "web-professional": {
    title: "WEB PROFESSIONAL",
    price: 30000,
    category: "Web",
    scope: [
      "Custom bespoke architectural visual language",
      "Cinematic motion & bespoke editorial design",
      "Conversion-focused user journey mapping",
      "CMS integration for self-serve content",
      "Multi-step lead qualification forms",
      "API & webhook system integrations",
      "Enterprise SEO & Schema metadata markup",
      "WCAG accessibility & CSP security controls"
    ]
  },
  "web-scale": {
    title: "WEB SCALE",
    price: 50000,
    category: "Web",
    scope: [
      "Bespoke enterprise full-stack web application",
      "E-commerce or booking portal architecture",
      "Multi-language dynamic localization",
      "Headless CMS & custom DB backend",
      "Third-party API & ERP integrations",
      "High-availability edge CDN deployment"
    ]
  },
  "mkt-foundation": {
    title: "MARKETING FOUNDATION",
    price: 10000,
    category: "Growth",
    scope: [
      "Digital asset & positioning audit",
      "Google Business Profile optimization",
      "Local SEO foundations & citation building",
      "High-intent keyword mapping",
      "WhatsApp enquiry conversion flow strategy"
    ]
  },
  "mkt-growth": {
    title: "MARKETING GROWTH",
    price: 25000,
    category: "Growth",
    scope: [
      "Full digital acquisition & growth strategy",
      "Technical & Content SEO optimization",
      "Google Business Profile active management",
      "Lead generation campaign architecture",
      "Landing page conversion optimization (CRO)",
      "Conversion analytics & monthly reporting"
    ]
  },
  "mkt-performance": {
    title: "MARKETING PERFORMANCE",
    price: 50000,
    category: "Growth",
    scope: [
      "High-velocity acquisition engine",
      "Enterprise SEO & authority building",
      "Paid Ads Management (Google Search & Meta)",
      "Custom landing page funnels & CRO",
      "CRM sync & call attribution tracking"
    ]
  },
  "ai-foundation": {
    title: "AI FOUNDATION",
    price: 25000,
    category: "AI",
    scope: [
      "Business process & automation audit",
      "AI workflow architecture & mapping",
      "Smart assistant / chatbot integration",
      "Document parsing & automated text extraction",
      "Lead qualification & instant automated responses"
    ]
  },
  "ai-automation": {
    title: "AI AUTOMATION",
    price: 50000,
    category: "AI",
    scope: [
      "Multi-step automated AI workflow orchestration",
      "Custom API integrations across business software",
      "CRM & database data synchronization",
      "Custom trained knowledge-base assistant",
      "Automated summary & reporting pipelines"
    ]
  },
  "ai-intelligence": {
    title: "AI INTELLIGENCE",
    price: 100000,
    category: "AI",
    scope: [
      "Custom autonomous AI agents",
      "RAG (Retrieval-Augmented Generation) vector architecture",
      "Secure document intelligence & enterprise search",
      "Multi-system workflow orchestration",
      "Custom command dashboard with role access"
    ]
  },
  "app-custom": {
    title: "CUSTOM APPLICATION BUILD",
    price: 75000,
    category: "App",
    scope: [
      "Custom product architecture & UI/UX wireframes",
      "Full-stack React / Next.js / Node.js development",
      "Relational database design & API engineering",
      "Role-based authentication & admin panel",
      "Third-party integrations & payment gateways"
    ]
  }
};

// Standard Payment Terms Policy
export const UNIVERSAL_PAYMENT_TERMS = [
  "1. A 50% advance payment is required to confirm and initiate project development.",
  "2. The remaining 50% balance is payable according to the agreed project delivery terms stated in the quotation/invoice.",
  "3. Project timelines and delivery schedules commence after advance payment verification and receipt of required client inputs.",
  "4. Additional scope requested outside the approved technical blueprint will be quoted separately as a scope revision.",
  "5. Payment status is officially confirmed only after server-side transaction verification."
];

// Initial In-Memory / Authoritative Invoice Registry
const INITIAL_INVOICES: Record<string, Invoice> = {
  "INV-BB-2026-1001": {
    invoiceId: "INV-BB-2026-1001",
    projectId: "BB-WEB-2026-1001",
    invoiceDate: "2026-09-29",
    dueDate: "2026-10-06",
    clientName: "Rahul Sharma",
    clientCompany: "Sharma Artisans",
    clientEmail: "rahul@sharmaartisans.com",
    clientPhone: "+91 98765 43210",
    projectName: "Sharma Artisans Web System",
    serviceCategory: "Web",
    selectedPackage: "WEB STARTER",
    scopeSummary: PACKAGE_AUTHORITATIVE_PRICES["web-starter"].scope,
    subtotal: 5000,
    tax: 0,
    totalAmount: 5000,
    advanceRequired: 2500,
    advancePaid: 0,
    balanceRemaining: 2500,
    status: "AWAITING ADVANCE",
    paymentTerms: UNIVERSAL_PAYMENT_TERMS
  },
  "INV-BB-2026-1002": {
    invoiceId: "INV-BB-2026-1002",
    projectId: "BB-WEB-2026-1002",
    invoiceDate: "2026-09-29",
    dueDate: "2026-10-06",
    clientName: "Kwame Mensah",
    clientCompany: "The Catfish Grill",
    clientEmail: "kwame@catfishgrill.com",
    clientPhone: "+233 24 123 4567",
    projectName: "The Catfish Grill Web & Reservation Engine",
    serviceCategory: "Web",
    selectedPackage: "WEB GROWTH",
    scopeSummary: PACKAGE_AUTHORITATIVE_PRICES["web-growth"].scope,
    subtotal: 15000,
    tax: 0,
    totalAmount: 15000,
    advanceRequired: 7500,
    advancePaid: 0,
    balanceRemaining: 7500,
    status: "AWAITING ADVANCE",
    paymentTerms: UNIVERSAL_PAYMENT_TERMS
  },
  "INV-BB-2026-1003": {
    invoiceId: "INV-BB-2026-1003",
    projectId: "BB-WEB-2026-1003",
    invoiceDate: "2026-09-29",
    dueDate: "2026-10-06",
    clientName: "Priya Nair",
    clientCompany: "Vitagold Kitchen",
    clientEmail: "priya@vitagold.in",
    clientPhone: "+91 91234 56789",
    projectName: "Vitagold Kitchen Platform",
    serviceCategory: "Web",
    selectedPackage: "WEB PROFESSIONAL",
    scopeSummary: PACKAGE_AUTHORITATIVE_PRICES["web-professional"].scope,
    subtotal: 30000,
    tax: 0,
    totalAmount: 30000,
    advanceRequired: 15000,
    advancePaid: 0,
    balanceRemaining: 15000,
    status: "AWAITING ADVANCE",
    paymentTerms: UNIVERSAL_PAYMENT_TERMS
  },
  "INV-BB-2026-1004": {
    invoiceId: "INV-BB-2026-1004",
    projectId: "BB-MKT-2026-1004",
    invoiceDate: "2026-09-29",
    dueDate: "2026-10-06",
    clientName: "David Andy",
    clientCompany: "Andy Foods GH",
    clientEmail: "david@andyfoods.com",
    clientPhone: "+233 20 987 6543",
    projectName: "Andy Foods Acquisition System",
    serviceCategory: "Growth",
    selectedPackage: "MARKETING GROWTH",
    scopeSummary: PACKAGE_AUTHORITATIVE_PRICES["mkt-growth"].scope,
    subtotal: 25000,
    tax: 0,
    totalAmount: 25000,
    advanceRequired: 12500,
    advancePaid: 0,
    balanceRemaining: 12500,
    status: "AWAITING ADVANCE",
    paymentTerms: UNIVERSAL_PAYMENT_TERMS
  },
  "INV-BB-2026-1005": {
    invoiceId: "INV-BB-2026-1005",
    projectId: "BB-AI-2026-1005",
    invoiceDate: "2026-09-29",
    dueDate: "2026-10-06",
    clientName: "Siddharth Verma",
    clientCompany: "Verma Logistics",
    clientEmail: "siddharth@vermalogistics.in",
    clientPhone: "+91 99887 76655",
    projectName: "Verma AI Operations Automation",
    serviceCategory: "AI",
    selectedPackage: "AI AUTOMATION",
    scopeSummary: PACKAGE_AUTHORITATIVE_PRICES["ai-automation"].scope,
    subtotal: 50000,
    tax: 0,
    totalAmount: 50000,
    advanceRequired: 25000,
    advancePaid: 0,
    balanceRemaining: 25000,
    status: "AWAITING ADVANCE",
    paymentTerms: UNIVERSAL_PAYMENT_TERMS
  },
  "INV-BB-2026-1006": {
    invoiceId: "INV-BB-2026-1006",
    projectId: "BB-APP-2026-1006",
    invoiceDate: "2026-09-29",
    dueDate: "2026-10-06",
    clientName: "Sanvi Academy Admin",
    clientCompany: "Sanvi Designers Academy",
    clientEmail: "admin@sanviacademy.com",
    clientPhone: "+91 98450 12345",
    projectName: "Sanvi Student Management Portal",
    serviceCategory: "App",
    selectedPackage: "CUSTOM APPLICATION BUILD",
    scopeSummary: PACKAGE_AUTHORITATIVE_PRICES["app-custom"].scope,
    subtotal: 75000,
    tax: 0,
    totalAmount: 75000,
    advanceRequired: 37500,
    advancePaid: 0,
    balanceRemaining: 37500,
    status: "AWAITING ADVANCE",
    paymentTerms: UNIVERSAL_PAYMENT_TERMS
  }
};

// Safe Node.js Server-Only Disk Persistence Helper
function loadInvoicesFromDisk(): Record<string, Invoice> {
  if (typeof window !== "undefined") return INITIAL_INVOICES;
  try {
    const fs = require("fs");
    const path = require("path");
    const dataDir = path.join(process.cwd(), "data");
    const file = path.join(dataDir, "invoices.json");
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf8");
      return JSON.parse(data);
    } else {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(file, JSON.stringify(INITIAL_INVOICES, null, 2), "utf8");
    }
  } catch (e) {
    console.error("[INVOICE STORE] Disk read error:", e);
  }
  return { ...INITIAL_INVOICES };
}

function saveInvoicesToDisk(data: Record<string, Invoice>) {
  if (typeof window !== "undefined") return;
  try {
    const fs = require("fs");
    const path = require("path");
    const dataDir = path.join(process.cwd(), "data");
    const file = path.join(dataDir, "invoices.json");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("[INVOICE STORE] Disk write error:", e);
  }
}

function loadReceiptsFromDisk(): Record<string, PaymentReceipt> {
  if (typeof window !== "undefined") return {};
  try {
    const fs = require("fs");
    const path = require("path");
    const dataDir = path.join(process.cwd(), "data");
    const file = path.join(dataDir, "receipts.json");
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("[INVOICE STORE] Receipts disk read error:", e);
  }
  return {};
}

function saveReceiptsToDisk(data: Record<string, PaymentReceipt>) {
  if (typeof window !== "undefined") return;
  try {
    const fs = require("fs");
    const path = require("path");
    const dataDir = path.join(process.cwd(), "data");
    const file = path.join(dataDir, "receipts.json");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("[INVOICE STORE] Receipts disk write error:", e);
  }
}

let invoiceRegistry: Record<string, Invoice> = loadInvoicesFromDisk();
let receiptRegistry: Record<string, PaymentReceipt> = loadReceiptsFromDisk();

export function getInvoiceById(invoiceId: string): Invoice | null {
  if (!invoiceId) return null;
  invoiceRegistry = loadInvoicesFromDisk();
  const cleanId = invoiceId.trim().toUpperCase();
  return invoiceRegistry[cleanId] || null;
}

export function getInvoiceByProjectId(projectId: string): Invoice | null {
  if (!projectId) return null;
  invoiceRegistry = loadInvoicesFromDisk();
  const cleanId = projectId.trim().toUpperCase();
  return Object.values(invoiceRegistry).find(inv => inv.projectId.toUpperCase() === cleanId) || null;
}

export function getAllInvoices(): Invoice[] {
  invoiceRegistry = loadInvoicesFromDisk();
  return Object.values(invoiceRegistry);
}

export function createOrUpdateInvoice(invoiceData: Partial<Invoice> & { totalAmount: number; clientName: string; clientEmail: string }): Invoice {
  invoiceRegistry = loadInvoicesFromDisk();

  const randNum = Math.floor(1000 + Math.random() * 9000);
  const invoiceId = invoiceData.invoiceId || `INV-BB-2026-${randNum}`;
  const projectId = invoiceData.projectId || `BB-PRJ-2026-${randNum}`;
  
  const totalAmount = Number(invoiceData.totalAmount);
  const advanceRequired = Math.round(totalAmount * 0.50);
  const advancePaid = invoiceData.advancePaid || 0;
  const balanceRemaining = totalAmount - advancePaid;

  const today = new Date().toISOString().split("T")[0];
  const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const newInvoice: Invoice = {
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
    scopeSummary: invoiceData.scopeSummary || [
      "Custom system architecture & technical wireframes",
      "High-performance production build",
      "Quality assurance testing & edge deployment"
    ],
    subtotal: totalAmount,
    tax: invoiceData.tax || 0,
    totalAmount,
    advanceRequired,
    advancePaid,
    balanceRemaining,
    status: invoiceData.status || (advancePaid >= advanceRequired ? "ADVANCE PAID" : "AWAITING ADVANCE"),
    paymentTerms: invoiceData.paymentTerms || UNIVERSAL_PAYMENT_TERMS,
    razorpayOrderId: invoiceData.razorpayOrderId,
    razorpayPaymentId: invoiceData.razorpayPaymentId,
    paymentDate: invoiceData.paymentDate,
    receiptId: invoiceData.receiptId,
    notes: invoiceData.notes || ""
  };

  invoiceRegistry[invoiceId] = newInvoice;
  saveInvoicesToDisk(invoiceRegistry);
  return newInvoice;
}

export function updateInvoicePaymentStatus(
  invoiceId: string, 
  razorpayOrderId: string, 
  razorpayPaymentId: string
): { invoice: Invoice; receipt: PaymentReceipt } {
  invoiceRegistry = loadInvoicesFromDisk();
  receiptRegistry = loadReceiptsFromDisk();

  const inv = getInvoiceById(invoiceId);
  if (!inv) {
    throw new Error(`Invoice ${invoiceId} not found.`);
  }

  const receiptId = `RCPT-BB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const paymentDate = new Date().toISOString();
  const amountPaid = inv.advanceRequired;
  const balanceRemaining = inv.totalAmount - amountPaid;

  inv.advancePaid = amountPaid;
  inv.balanceRemaining = balanceRemaining;
  inv.status = balanceRemaining === 0 ? "PAID IN FULL" : "ADVANCE PAID";
  inv.razorpayOrderId = razorpayOrderId;
  inv.razorpayPaymentId = razorpayPaymentId;
  inv.paymentDate = paymentDate;
  inv.receiptId = receiptId;

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

  invoiceRegistry[inv.invoiceId] = inv;
  receiptRegistry[receiptId] = receipt;

  saveInvoicesToDisk(invoiceRegistry);
  saveReceiptsToDisk(receiptRegistry);

  return { invoice: inv, receipt };
}

export function getReceiptById(receiptId: string): PaymentReceipt | null {
  if (!receiptId) return null;
  receiptRegistry = loadReceiptsFromDisk();
  return receiptRegistry[receiptId.trim().toUpperCase()] || null;
}
