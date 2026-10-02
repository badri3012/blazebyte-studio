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

