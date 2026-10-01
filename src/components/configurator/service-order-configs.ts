export interface QuestionConfig {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  type: "select_card" | "text_input" | "multi_select" | "dropdown" | "textarea";
  options?: { id: string; label: string; desc?: string }[];
}

export interface ServicePackageConfig {
  id: string;
  name: string;
  price: string;
  popular?: boolean;
  desc: string;
  features: string[];
}

export interface ServiceOrderConfig {
  serviceType: "WEB" | "MARKETING" | "AI" | "APPS";
  route: string;
  title: string;
  badgeText: string;
  headline: {
    line1: string;
    line2: string;
    line3: string;
  };
  subheading: string;
  ctaText: string;
  heroImage: string;
  colorPalette: {
    bg: string;
    cardBg: string;
    text: string;
    accent: string;
    accentSecondary?: string;
    border: string;
    muted: string;
    heroGradient: string;
  };
  transitionTitle: string;
  transitionSubtitle: string;
  projectIdPrefix: string;
  progressSystemTitle: string;
  blueprintSteps: string[];
  questions: QuestionConfig[];
  packages: ServicePackageConfig[];
  reviewTitle: string;
  trustFlowSteps: { code: string; name: string }[];
}

// 01 — WEB ORDER CONFIGURATION
export const WEB_ORDER_CONFIG: ServiceOrderConfig = {
  serviceType: "WEB",
  route: "/web/order",
  title: "Web Experiences",
  badgeText: "BLAZEBYTE / WEB PROJECT SYSTEM",
  headline: {
    line1: "BUILD YOUR",
    line2: "DIGITAL",
    line3: "PRESENCE."
  },
  subheading: "Tell us what you're building. We'll shape the right web system for it.",
  ctaText: "START WEB PROJECT →",
  heroImage: "/images/digital-workshop-hero.jpg",
  colorPalette: {
    bg: "#F4F1EA",
    cardBg: "#FFFFFF",
    text: "#17191C",
    accent: "#3457FF",
    border: "#17191C",
    muted: "#5A606A",
    heroGradient: "from-[#F4F1EA] via-[#F4F1EA]/85 to-transparent"
  },
  transitionTitle: "BUILDING WEB BLUEPRINT...",
  transitionSubtitle: "Mapping responsive architecture, layout grids & component specs.",
  projectIdPrefix: "BB-WEB-2026-",
  progressSystemTitle: "PROJECT BLUEPRINT",
  blueprintSteps: [
    "01 PROJECT", "02 BUSINESS", "03 DIRECTION", "04 FEATURES", 
    "05 CONTENT", "06 INVESTMENT", "07 TIMELINE", "08 REVIEW"
  ],
  questions: [
    {
      id: "projectType",
      code: "01",
      title: "PROJECT CLASSIFICATION",
      subtitle: "Choose the primary website system requirement.",
      type: "select_card",
      options: [
        { id: "Business Website", label: "BUSINESS WEBSITE", desc: "Corporate / firm / business portal." },
        { id: "Landing Page", label: "LANDING PAGE", desc: "Campaign / product / lead generation." },
        { id: "Portfolio", label: "PORTFOLIO", desc: "Personal brand / creator / agency showcase." },
        { id: "Restaurant / Food", label: "RESTAURANT / FOOD", desc: "Dining / cloud kitchen / menu engine." },
        { id: "E-Commerce", label: "E-COMMERCE", desc: "Online store / catalog / Razorpay checkout." },
        { id: "Booking Website", label: "BOOKING WEBSITE", desc: "Appointments / reservations / events." },
        { id: "Education", label: "EDUCATION", desc: "Academy / course catalog / training portal." },
        { id: "Startup", label: "STARTUP", desc: "SaaS product launch / tech portal." },
        { id: "Custom Platform", label: "CUSTOM PLATFORM", desc: "Bespoke digital software system." }
      ]
    },
    {
      id: "businessInfo",
      code: "02",
      title: "BUSINESS & BRAND DETAILS",
      subtitle: "Tell us about your brand name and industry.",
      type: "text_input"
    },
    {
      id: "designDirection",
      code: "03",
      title: "DESIGN DIRECTION & AESTHETIC",
      subtitle: "How should your web system look and feel?",
      type: "select_card",
      options: [
        { id: "Premium Editorial", label: "PREMIUM EDITORIAL", desc: "Sophisticated typography, high trust, Swiss design." },
        { id: "Modern Minimal", label: "MODERN MINIMAL", desc: "Clean lines, spacious, contemporary layouts." },
        { id: "Cinematic Immersive", label: "CINEMATIC IMMERSIVE", desc: "Dramatic visual storytelling & motion physics." },
        { id: "Corporate Authoritative", label: "CORPORATE AUTHORITATIVE", desc: "Structured, enterprise-grade, solid credibility." }
      ]
    },
    {
      id: "features",
      code: "04",
      title: "SYSTEM CAPABILITY MODULES",
      subtitle: "Select required web capability modules.",
      type: "multi_select",
      options: [
        { id: "Responsive UI", label: "Responsive UI" },
        { id: "WhatsApp Conversion", label: "WhatsApp Conversion" },
        { id: "Contact Forms", label: "Contact Forms" },
        { id: "SEO Foundations", label: "SEO Foundations" },
        { id: "CMS Content Manager", label: "CMS Content Manager" },
        { id: "Razorpay Checkout", label: "Razorpay Checkout" },
        { id: "Multilingual Support", label: "Multilingual Support" },
        { id: "User Dashboard", label: "User Dashboard" }
      ]
    },
    {
      id: "contentReadiness",
      code: "05",
      title: "CONTENT & BRAND READINESS",
      subtitle: "What materials do you currently have ready?",
      type: "select_card",
      options: [
        { id: "Complete", label: "COMPLETE", desc: "All logo, copy & images are ready." },
        { id: "Partial", label: "PARTIAL", desc: "Logo and basic text ready." },
        { id: "Need Copywriting", label: "NEED ASSISTANCE", desc: "Need BlazeByte to structure content." }
      ]
    },
    {
      id: "investment",
      code: "06",
      title: "INVESTMENT PARAMETER RANGE",
      subtitle: "Select your targeted budget allocation.",
      type: "select_card",
      options: [
        { id: "₹5K – ₹15K", label: "₹5K – ₹15K", desc: "Starter website / simple landing page" },
        { id: "₹15K – ₹30K", label: "₹15K – ₹30K", desc: "Growth business website (up to 7 pages)" },
        { id: "₹30K – ₹50K", label: "₹30K – ₹50K", desc: "Custom bespoke professional web system" },
        { id: "₹50K+", label: "₹50K+", desc: "Enterprise scale platform / E-commerce" }
      ]
    },
    {
      id: "timeline",
      code: "07",
      title: "TARGET LAUNCH TIMELINE",
      subtitle: "When do you plan to launch this web system?",
      type: "select_card",
      options: [
        { id: "ASAP", label: "ASAP", desc: "High-priority deployment" },
        { id: "2–4 WEEKS", label: "2–4 WEEKS", desc: "Standard engineering cycle" },
        { id: "1–2 MONTHS", label: "1–2 MONTHS", desc: "Planned strategic release" }
      ]
    }
  ],
  packages: [
    {
      id: "web-starter",
      name: "WEB STARTER",
      price: "₹5,000+",
      desc: "Personal websites, simple landing pages, small business sites.",
      features: ["Mobile-optimized UI", "Contact form & WhatsApp", "Basic SEO setup", "SSL security setup"]
    },
    {
      id: "web-growth",
      name: "WEB GROWTH",
      price: "₹15,000+",
      popular: true,
      desc: "Growing businesses requiring a commanding digital presence & lead engine.",
      features: ["Custom UI/UX system", "Up to 7 pages", "WhatsApp conversion flows", "CMS ready"]
    },
    {
      id: "web-professional",
      name: "WEB PROFESSIONAL",
      price: "₹30,000+",
      desc: "Established enterprises seeking custom workflows, CMS, and market leadership.",
      features: ["Bespoke visual language", "Cinematic scroll motion", "API & webhooks", "WCAG & CSP controls"]
    },
    {
      id: "web-scale",
      name: "WEB SCALE",
      price: "₹50,000+",
      desc: "Enterprise platforms, e-commerce networks, booking portals, and dashboards.",
      features: ["Full-stack app architecture", "E-commerce or booking", "Multi-language & DB", "Edge CDN distribution"]
    }
  ],
  reviewTitle: "WEB PROJECT SPECIFICATION",
  trustFlowSteps: [
    { code: "01", name: "REQUEST" },
    { code: "02", name: "REVIEW" },
    { code: "03", name: "PROPOSAL" },
    { code: "04", name: "50% ADVANCE" },
    { code: "05", name: "BUILD" },
    { code: "06", name: "APPROVAL" },
    { code: "07", name: "LAUNCH" }
  ]
};

// 02 — DIGITAL MARKETING ORDER CONFIGURATION
export const MARKETING_ORDER_CONFIG: ServiceOrderConfig = {
  serviceType: "MARKETING",
  route: "/marketing/order",
  title: "Digital Marketing & Growth",
  badgeText: "BLAZEBYTE / GROWTH & CAMPAIGN STUDIO",
  headline: {
    line1: "BUILD",
    line2: "DEMAND.",
    line3: "ACQUIRE."
  },
  subheading: "Tell us where your business is today. We'll design the growth system around it.",
  ctaText: "BUILD MY GROWTH SYSTEM →",
  heroImage: "/images/marketing-order-hero.jpg",
  colorPalette: {
    bg: "#17172B",
    cardBg: "#21213D",
    text: "#F6F1E8",
    accent: "#FF5C68",
    accentSecondary: "#FF9B54",
    border: "#FF5C68",
    muted: "#B8B5C8",
    heroGradient: "from-[#17172B] via-[#17172B]/85 to-transparent"
  },
  transitionTitle: "INITIATING CAMPAIGN BRIEF...",
  transitionSubtitle: "Mapping acquisition channels, audience personas & conversion funnels.",
  projectIdPrefix: "BB-MKT-2026-",
  progressSystemTitle: "CAMPAIGN BRIEF",
  blueprintSteps: [
    "01 BUSINESS", "02 AUDIENCE", "03 POSITION", "04 CHANNELS", 
    "05 CAMPAIGN", "06 BUDGET", "07 TIMELINE", "08 REVIEW"
  ],
  questions: [
    {
      id: "businessIndustry",
      code: "01",
      title: "BUSINESS & INDUSTRY PROFILE",
      subtitle: "What industry does your business operate in?",
      type: "text_input"
    },
    {
      id: "marketingObjectives",
      code: "02",
      title: "CORE MARKETING OBJECTIVES",
      subtitle: "Select your primary growth objectives.",
      type: "select_card",
      options: [
        { id: "Inbound Leads", label: "INBOUND LEAD GEN", desc: "Generate qualified customer enquiries daily." },
        { id: "Local SEO Authority", label: "LOCAL SEO DOMINANCE", desc: "Rank #1 on Google Search & Maps locally." },
        { id: "Paid Ads Scaling", label: "PAID ADS SCALING", desc: "Scale revenue via Google & Meta Ads." },
        { id: "Brand Positioning", label: "LUXURY BRAND POSITIONING", desc: "Elevate brand perception and commercial authority." }
      ]
    },
    {
      id: "targetAudience",
      code: "03",
      title: "TARGET AUDIENCE PROFILE",
      subtitle: "Who are your primary commercial buyers?",
      type: "select_card",
      options: [
        { id: "B2C Consumers", label: "B2C CONSUMERS", desc: "Local / regional retail & service customers." },
        { id: "B2B Enterprise", label: "B2B ENTERPRISE", desc: "Commercial buyers, corporate clients & decisions makers." },
        { id: "High-Net-Worth", label: "LUXURY / HNW BUYERS", desc: "Premium clients seeking bespoke offerings." }
      ]
    },
    {
      id: "channels",
      code: "04",
      title: "ACQUISITION CHANNELS",
      subtitle: "Which channels will drive your acquisition engine?",
      type: "multi_select",
      options: [
        { id: "Google Search SEO", label: "Google Search SEO" },
        { id: "Google Business Maps", label: "Google Business Maps" },
        { id: "Google Search Ads", label: "Google Search Ads" },
        { id: "Meta Ads (Instagram & FB)", label: "Meta Ads (Instagram & FB)" },
        { id: "WhatsApp Conversion Funnel", label: "WhatsApp Conversion Funnel" },
        { id: "Landing Page CRO", label: "Landing Page CRO" }
      ]
    },
    {
      id: "investment",
      code: "05",
      title: "MONTHLY GROWTH INVESTMENT",
      subtitle: "Select your preferred growth management tier.",
      type: "select_card",
      options: [
        { id: "₹10,000 One-Time", label: "₹10,000 SETUP", desc: "Marketing Foundation setup & GBP optimization." },
        { id: "₹25,000 / month", label: "₹25,000 / MONTH", desc: "Growth Engine — SEO, Content & Inbound Leads." },
        { id: "₹50,000 / month", label: "₹50,000 / MONTH", desc: "Performance Engine — Search Dominance & Paid Ads." },
        { id: "Custom Scale", label: "CUSTOM SCALE", desc: "Multi-location or enterprise acquisition." }
      ]
    }
  ],
  packages: [
    {
      id: "mkt-foundation",
      name: "MARKETING FOUNDATION",
      price: "₹10,000",
      desc: "One-time setup for local digital authority & Google Business Profile verification.",
      features: ["Google Business Profile setup", "Local SEO citations", "High-intent keyword map", "WhatsApp conversion setup"]
    },
    {
      id: "mkt-growth",
      name: "MARKETING GROWTH",
      price: "₹25,000 / mo",
      popular: true,
      desc: "Full organic growth engine to generate predictable inbound lead volume.",
      features: ["Technical & Content SEO", "Active Google Business mgmt", "Lead campaign design", "CRO landing page optimization"]
    },
    {
      id: "mkt-performance",
      name: "MARKETING PERFORMANCE",
      price: "₹50,000 / mo",
      desc: "Aggressive paid acquisition & search dominance engine for scaling revenue.",
      features: ["Google & Meta Ads Mgmt", "Custom landing page funnels", "CRM & call attribution", "Weekly campaign sprints"]
    },
    {
      id: "mkt-scale",
      name: "MARKETING SCALE",
      price: "Custom",
      desc: "Multi-location brands, e-commerce giants, and national scale acquisition operations.",
      features: ["Multi-tier funnel architecture", "Custom CRM automation", "Dedicated growth team", "Predictive lead scoring"]
    }
  ],
  reviewTitle: "GROWTH PROJECT BRIEF",
  trustFlowSteps: [
    { code: "01", name: "AUDIT" },
    { code: "02", name: "STRATEGY" },
    { code: "03", name: "PROPOSAL" },
    { code: "04", name: "50% ADVANCE" },
    { code: "05", name: "EXECUTION" },
    { code: "06", name: "OPTIMIZATION" },
    { code: "07", name: "SCALE" }
  ]
};

// 03 — AI SOLUTIONS ORDER CONFIGURATION
export const AI_ORDER_CONFIG: ServiceOrderConfig = {
  serviceType: "AI",
  route: "/ai/order",
  title: "AI Solutions & Automation",
  badgeText: "BLAZEBYTE / WORKFLOW & AI SYSTEMS",
  headline: {
    line1: "TURN",
    line2: "REPETITIVE WORK",
    line3: "INTO SYSTEMS."
  },
  subheading: "Tell us what your business does repeatedly. We'll identify what can be automated, connected and improved.",
  ctaText: "DESIGN MY AI SYSTEM →",
  heroImage: "/images/ai-order-hero.jpg",
  colorPalette: {
    bg: "#161B22",
    cardBg: "#1F242D",
    text: "#F9F9F8",
    accent: "#C86D51",
    accentSecondary: "#1B4D3E",
    border: "#C86D51",
    muted: "#8B949E",
    heroGradient: "from-[#161B22] via-[#161B22]/85 to-transparent"
  },
  transitionTitle: "MAPPING WORKFLOW NODES...",
  transitionSubtitle: "Parsing data sources, API integrations & automated pipeline logic.",
  projectIdPrefix: "BB-AI-2026-",
  progressSystemTitle: "SYSTEM SPECIFICATION",
  blueprintSteps: [
    "01 BUSINESS", "02 WORKFLOW", "03 TOOLS", "04 DATA", 
    "05 AUTOMATION", "06 INTEGRATIONS", "07 SECURITY", "08 REVIEW"
  ],
  questions: [
    {
      id: "organizationSector",
      code: "01",
      title: "ORGANIZATION & SECTOR",
      subtitle: "What is your business name and team headcount?",
      type: "text_input"
    },
    {
      id: "repetitiveTasks",
      code: "02",
      title: "REPETITIVE OPERATIONAL TASKS",
      subtitle: "Select the tasks currently causing operational bottlenecks.",
      type: "multi_select",
      options: [
        { id: "Customer Enquiry Triage", label: "Customer Enquiry Triage" },
        { id: "Document Parsing & Extraction", label: "Document Parsing & Extraction" },
        { id: "Invoice & Data Entry", label: "Invoice & Data Entry" },
        { id: "CRM & Database Updates", label: "CRM & Database Updates" },
        { id: "Automated Report Generation", label: "Automated Report Generation" },
        { id: "Internal Knowledge Search", label: "Internal Knowledge Search" }
      ]
    },
    {
      id: "aiCapabilities",
      code: "03",
      title: "AI SYSTEM REQUIREMENTS",
      subtitle: "What AI capabilities are required?",
      type: "select_card",
      options: [
        { id: "Custom Trained Assistant", label: "SMART ASSISTANT", desc: "Custom chatbot trained on your business data." },
        { id: "Workflow Automation Engine", label: "WORKFLOW ENGINE", desc: "Automate multi-step admin & CRM tasks." },
        { id: "RAG Vector System", label: "RAG KNOWLEDGE SEARCH", desc: "Enterprise document search & vector database." },
        { id: "Autonomous AI Agents", label: "AUTONOMOUS AGENTS", desc: "Specialized AI agents carrying out end-to-end tasks." }
      ]
    },
    {
      id: "softwareTools",
      code: "04",
      title: "EXISTING SOFTWARE STACK",
      subtitle: "What software tools need to connect?",
      type: "multi_select",
      options: [
        { id: "WhatsApp Business API", label: "WhatsApp Business API" },
        { id: "Email (Gmail / Outlook)", label: "Email (Gmail / Outlook)" },
        { id: "HubSpot / Zoho CRM", label: "HubSpot / Zoho CRM" },
        { id: "Google Sheets / Excel", label: "Google Sheets / Excel" },
        { id: "PostgreSQL / SQL DB", label: "PostgreSQL / SQL DB" },
        { id: "Slack / Teams", label: "Slack / Teams" }
      ]
    },
    {
      id: "investment",
      code: "05",
      title: "AI SYSTEM BUDGET PARAMETER",
      subtitle: "Select your target automation investment range.",
      type: "select_card",
      options: [
        { id: "₹25,000+", label: "₹25,000+ FOUNDATION", desc: "Smart chatbot & basic workflow automation." },
        { id: "₹50,000+", label: "₹50,000+ AUTOMATION", desc: "Multi-step AI workflow orchestration & CRM sync." },
        { id: "₹1,00,000+", label: "₹1,00,000+ INTELLIGENCE", desc: "Custom autonomous agents & RAG vector search." },
        { id: "Custom Enterprise", label: "CUSTOM ENTERPRISE", desc: "Self-hosted LLMs & enterprise infrastructure." }
      ]
    }
  ],
  packages: [
    {
      id: "ai-foundation",
      name: "AI FOUNDATION",
      price: "₹25,000+",
      desc: "Practical AI automation to eliminate manual inquiry response & data triage.",
      features: ["Process & workflow audit", "Smart assistant chatbot", "Document text extraction", "WhatsApp & Email API hook"]
    },
    {
      id: "ai-automation",
      name: "AI AUTOMATION",
      price: "₹50,000+",
      popular: true,
      desc: "Multi-step administrative, customer service, & CRM automated workflows.",
      features: ["Multi-step workflow orchestration", "CRM & DB data sync", "Custom knowledge assistant", "Automated telemetry dashboard"]
    },
    {
      id: "ai-intelligence",
      name: "AI INTELLIGENCE",
      price: "₹1,00,000+",
      desc: "Custom AI agents, internal copilots, and RAG knowledge search systems.",
      features: ["Autonomous AI agents", "RAG vector database", "Internal team copilot", "Role-based safety guardrails"]
    },
    {
      id: "ai-scale",
      name: "AI SCALE",
      price: "Custom",
      desc: "Enterprise-wide AI operational platforms and multi-agent collaborative networks.",
      features: ["Private LLM deployment", "Self-hosted vector DB", "SOC2 data handling", "Continuous model fine-tuning"]
    }
  ],
  reviewTitle: "AI SYSTEM SPECIFICATION",
  trustFlowSteps: [
    { code: "01", name: "AUDIT" },
    { code: "02", name: "ARCHITECTURE" },
    { code: "03", name: "PROPOSAL" },
    { code: "04", name: "50% ADVANCE" },
    { code: "05", name: "ENGINEERING" },
    { code: "06", name: "TESTING" },
    { code: "07", name: "DEPLOYMENT" }
  ]
};

// 04 — CUSTOM APPS ORDER CONFIGURATION
export const APPS_ORDER_CONFIG: ServiceOrderConfig = {
  serviceType: "APPS",
  route: "/apps/order",
  title: "Custom Applications",
  badgeText: "BLAZEBYTE / SOFTWARE PRODUCT STUDIO",
  headline: {
    line1: "TURN THE",
    line2: "IDEA INTO",
    line3: "A PRODUCT."
  },
  subheading: "From internal tools to customer-facing platforms, we design and engineer software around the way your business works.",
  ctaText: "START AN APP PROJECT →",
  heroImage: "/images/apps-order-hero.jpg",
  colorPalette: {
    bg: "#191C21",
    cardBg: "#23272F",
    text: "#FFFFFF",
    accent: "#2563EB",
    accentSecondary: "#EF4444",
    border: "#2563EB",
    muted: "#9CA3AF",
    heroGradient: "from-[#191C21] via-[#191C21]/85 to-transparent"
  },
  transitionTitle: "ASSEMBLING PRODUCT INTERFACE...",
  transitionSubtitle: "Structuring component libraries, DB schemas & REST/GraphQL API contracts.",
  projectIdPrefix: "BB-APP-2026-",
  progressSystemTitle: "PRODUCT SPECIFICATION",
  blueprintSteps: [
    "01 PRODUCT", "02 USERS", "03 FEATURES", "04 PLATFORM", 
    "05 SYSTEM", "06 INTEGRATIONS", "07 SCALE", "08 REVIEW"
  ],
  questions: [
    {
      id: "productClassification",
      code: "01",
      title: "PRODUCT CLASSIFICATION",
      subtitle: "What type of software product are we building?",
      type: "select_card",
      options: [
        { id: "SaaS Product", label: "SAAS PRODUCT", desc: "Multi-tenant cloud subscription product." },
        { id: "Internal Tool", label: "INTERNAL TOOL", desc: "Custom business dashboard & workflow management." },
        { id: "Customer Portal", label: "CUSTOMER PORTAL", desc: "Client self-service & account portal." },
        { id: "Marketplace / Booking", label: "MARKETPLACE / BOOKING", desc: "Multi-party booking or e-commerce platform." }
      ]
    },
    {
      id: "businessProblem",
      code: "02",
      title: "BUSINESS PROBLEM & OBJECTIVE",
      subtitle: "Describe what problem this application will solve.",
      type: "textarea"
    },
    {
      id: "userRoles",
      code: "03",
      title: "USER ROLES & AUTHENTICATION",
      subtitle: "Select required access control levels.",
      type: "multi_select",
      options: [
        { id: "Super Admin Control", label: "Super Admin Control" },
        { id: "Staff / Team Roles", label: "Staff / Team Roles" },
        { id: "Client / Customer Login", label: "Client / Customer Login" },
        { id: "Role-Based Permissions (RBAC)", label: "Role-Based Permissions (RBAC)" },
        { id: "OAuth / Google / Magic Links", label: "OAuth / Google / Magic Links" }
      ]
    },
    {
      id: "coreFeatures",
      code: "04",
      title: "CORE APPLICATION FEATURES",
      subtitle: "Select required application modules.",
      type: "multi_select",
      options: [
        { id: "Relational Database (Postgres)", label: "Relational Database (Postgres)" },
        { id: "Razorpay / Stripe Payments", label: "Razorpay / Stripe Payments" },
        { id: "Admin Telemetry Dashboard", label: "Admin Telemetry Dashboard" },
        { id: "Email & WhatsApp Notifications", label: "Email & WhatsApp Notifications" },
        { id: "Custom REST / GraphQL APIs", label: "Custom REST / GraphQL APIs" },
        { id: "Mobile Responsive / PWA", label: "Mobile Responsive / PWA" }
      ]
    },
    {
      id: "investment",
      code: "05",
      title: "SOFTWARE ESTIMATE SCOPE",
      subtitle: "Custom application builds start from ₹50,000+ based on scope review.",
      type: "select_card",
      options: [
        { id: "₹50,000+", label: "₹50,000+ STARTER SCOPE", desc: "MVP build / internal tool / basic portal." },
        { id: "₹1,00,000+", label: "₹1,00,000+ FULL PRODUCT", desc: "Complete SaaS product / multi-role platform." },
        { id: "Custom Estimate", label: "CUSTOM QUOTE", desc: "Enterprise scale software infrastructure." }
      ]
    }
  ],
  packages: [
    {
      id: "app-custom",
      name: "CUSTOM APPLICATION BUILD",
      price: "₹50,000+",
      popular: true,
      desc: "Custom software products, web applications, internal tools & customer portals.",
      features: [
        "Custom product UI/UX wireframes",
        "Full-stack Next.js / Node.js build",
        "Relational database & API engineering",
        "Role-based auth & admin dashboard",
        "Third-party payment & API integrations",
        "Rigorous automated testing & QA"
      ]
    }
  ],
  reviewTitle: "PRODUCT SPECIFICATION",
  trustFlowSteps: [
    { code: "01", name: "PROBLEM" },
    { code: "02", name: "WIREFRAMES" },
    { code: "03", name: "PROPOSAL" },
    { code: "04", name: "50% ADVANCE" },
    { code: "05", name: "BUILD" },
    { code: "06", name: "QA" },
    { code: "07", name: "RELEASE" }
  ]
};
