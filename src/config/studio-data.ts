﻿﻿export interface PackageItem {
  id: string;
  name: string;
  price: string;
  priceDetails?: string;
  forWho: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface ServicePortalConfig {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  route: string;
  badge: string;
  accentColor: "indigo" | "teal" | "blue" | "ivory";
  accentHex: string;
  heroHeadline: string;
  heroSubheading: string;
  primaryCTA: string;
  packages: PackageItem[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: "Web" | "Growth" | "AI" | "App";
  location?: string;
  challenge: string;
  approach: string;
  build: string;
  result: string;
  techStack: string[];
  imageBg: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  responsibility: string;
}

export const SITE_CONFIG = {
  name: "BLAZEBYTE STUDIO",
  domain: "blazebyte.store",
  tagline: "Web + Marketing + AI + Apps — Coimbatore",
  coreConcept: {
    line1: "Build better digital systems.",
    line2: "Create stronger digital experiences.",
    line3: "Automate what should not be manual.",
  },
  positioning: "A premium digital and software studio based in Coimbatore, Tamil Nadu — engineering high-performance web platforms, digital marketing systems, AI automation, and custom software for Indian businesses and international clients.",
  seoPositioning: "Software Development Company in Coimbatore | Web Development | Digital Marketing | AI Solutions | Custom App Development",
  udyamRegistration: "UDYAM-TN-03-0334061",
  location: {
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    region: "South India",
    display: "Coimbatore, Tamil Nadu, India",
  },
    contact: {
    email: "blazebytestudio7@gmail.com",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "Contact Studio Support",
    whatsappMessage: "Hello BlazeByte Studio, I would like to discuss a project. Please share the next steps.",
    availability: "24 hours",
    location: "Coimbatore, Tamil Nadu, India",
  },
  socials: {
    twitter: "https://x.com/blazebytestudio",
    linkedin: "https://linkedin.com/company/blazebyte-studio",
    github: "https://github.com/blazebyte-studio",
  },
};


export const BLAZEBYTE_TEAM: TeamMember[] = [
  {
    name: "Badri",
    role: "Founder / Super Admin",
    bio: "Directs overarching studio strategy, architectural standards, and core technical vision across all digital systems.",
    responsibility: "Executive Direction & System Architecture",
  },
  {
    name: "Jerson",
    role: "Sales Manager",
    bio: "Leads commercial client engagements, project scoping, and enterprise acquisition partnerships.",
    responsibility: "Commercial Scoping & Client Partnerships",
  },
  {
    name: "Saraswathi",
    role: "Operations Manager",
    bio: "Coordinates project delivery timelines, milestone assurances, and operational resource planning.",
    responsibility: "Delivery Operations & SLA Management",
  },
  {
    name: "Bharath",
    role: "Web Designer",
    bio: "Crafts bespoke architectural visual systems, editorial component systems, and fluid interaction designs.",
    responsibility: "UI/UX Design Systems & Editorial Aesthetics",
  },
  {
    name: "Prabha",
    role: "Web Developer",
    bio: "Engineers strictly typed React, Next.js, and Node.js full-stack web applications with high concurrency standards.",
    responsibility: "Full-Stack Web Engineering & Edge Deployment",
  },
  {
    name: "Praneeth Kumar",
    role: "Client Handling & Lead Specialist",
    bio: "Manages technical inquiry intake, proposal breakdowns, and ongoing client communication channels.",
    responsibility: "Inquiry Scoping & Client Communication",
  },
];

export const PORTALS = [
  {
    id: "web",
    code: "01 — WEB",
    title: "Web Experiences",
    route: "/web",
    orderRoute: "/web/order",
    tagline: "Build websites that communicate, convert and scale.",
    accentColor: "indigo",
    accentHex: "#5B5CE2",
    atmosphere: "Editorial technology & architectural digital studio",
  },
  {
    id: "marketing",
    code: "02 — GROWTH",
    title: "Digital Marketing",
    route: "/marketing",
    orderRoute: "/marketing/order",
    tagline: "Turn attention into measurable business growth.",
    accentColor: "teal",
    accentHex: "#20B8A6",
    atmosphere: "Growth laboratory & data-driven command center",
  },
  {
    id: "ai",
    code: "03 — AI",
    title: "AI Solutions",
    route: "/ai",
    orderRoute: "/ai/order",
    tagline: "Automate workflows, intelligence and repetitive operations.",
    accentColor: "blue",
    accentHex: "#38BDF8",
    atmosphere: "AI operating system & intelligent infrastructure",
  },
  {
    id: "apps",
    code: "04 — APPS",
    title: "Custom Applications",
    route: "/apps",
    orderRoute: "/apps/order",
    tagline: "Custom software products and internal systems.",
    badge: "Custom projects from ₹50,000+",
    accentColor: "ivory",
    accentHex: "#F7F7F2",
    atmosphere: "Product engineering & bespoke application studio",
  },
];

export const WEB_SERVICE_CONFIG: ServicePortalConfig = {
  id: "web",
  code: "01",
  title: "Web Development",
  shortTitle: "Web",
  description: "Editorial technology & architectural digital web development studio",
  route: "/web",
  badge: "High Performance Web Systems",
  accentColor: "indigo",
  accentHex: "#5B5CE2",
  heroHeadline: "WE BUILD DIGITAL EXPERIENCES.",
  heroSubheading: "From high-converting landing pages to complete business platforms — designed, engineered and built for growth.",
  primaryCTA: "Start a Web Project",
  packages: [
    {
      id: "web-starter",
      name: "WEB STARTER",
      price: "₹5,000+",
      priceDetails: "Starting at",
      forWho: "Personal websites, simple business landing pages, portfolios, small local businesses, basic service sites",
      features: [
        "Responsive, mobile-optimized UI architecture",
        "Modern architectural visual design",
        "High-converting contact & inquiry section",
        "Direct WhatsApp conversion integration",
        "Basic search engine metadata & SEO structure",
        "Core performance optimization & image compression",
        "Deployment assistance & DNS configuration",
        "SSL-ready security setup",
      ],
      ctaText: "Configure Starter Project",
    },
    {
      id: "web-growth",
      name: "WEB GROWTH",
      price: "₹15,000+",
      priceDetails: "Starting at",
      popular: true,
      forWho: "Growing businesses requiring a commanding digital presence & lead generation engine",
      features: [
        "Premium custom UI/UX design system",
        "Multi-page architecture (up to 7 pages)",
        "Advanced fluid interaction design & animations",
        "Structured lead capture & inquiry forms",
        "Automated WhatsApp conversion flows",
        "Search engine optimization (SEO) foundations",
        "Google-friendly indexable structural markup",
        "Analytics & conversion tracking integration",
        "Performance engineering (<1s load targets)",
        "Content management framework ready",
        "Basic security hardening & header policies",
      ],
      ctaText: "Start Growth Web Project",
    },
    {
      id: "web-professional",
      name: "WEB PROFESSIONAL",
      price: "₹30,000+",
      priceDetails: "Starting at",
      forWho: "Established enterprises seeking market leadership, custom workflows, and CMS integration",
      features: [
        "Custom bespoke architectural visual language",
        "Advanced interaction & cinematic scroll motion",
        "Conversion-focused user journey mapping",
        "CMS integration for self-serve content",
        "Multi-step lead qualification forms",
        "API & webhook system integrations",
        "Comprehensive SEO architecture & Schema metadata",
        "High-concurrency performance engineering",
        "WCAG accessibility standards compliance",
        "Enhanced security hardening & CSP controls",
        "Production deployment & post-launch support period",
      ],
      ctaText: "Build Professional Platform",
    },
    {
      id: "web-scale",
      name: "WEB SCALE",
      price: "₹50,000+",
      priceDetails: "Custom Estimate",
      forWho: "Large enterprise platforms, e-commerce networks, booking portals, SaaS dashboards, and multi-language portals",
      features: [
        "Bespoke enterprise full-stack application architecture",
        "E-commerce, booking systems, or user dashboards",
        "Multi-language, localization & dynamic content",
        "Advanced headless CMS or custom DB backend",
        "Complex third-party API & ERP integrations",
        "High-availability serverless / edge deployment",
        "Dedicated performance & load testing",
        "Custom administrative control systems",
      ],
      ctaText: "Build My System",
    },
  ],
};

export const WEB_TECH_STACK = {
  frontend: [
    { name: "Next.js", description: "App Router, Server Components & SSG" },
    { name: "React", description: "UI Component Architecture" },
    { name: "TypeScript", description: "Strict End-to-End Type Safety" },
    { name: "Tailwind CSS", description: "Architectural Utility-First Styling" },
  ],
  motion: [
    { name: "Framer Motion", description: "Hardware-Accelerated Layout Motion" },
    { name: "Lenis", description: "Smooth Kinetic Scroll Physics" },
  ],
  threeD: [
    { name: "Three.js & R3F", description: "Selective 3D Visualizations where justified" },
  ],
  backend: [
    { name: "Node.js", description: "High-Performance Serverless Handlers" },
    { name: "PostgreSQL & Prisma", description: "Relational Schema & Type-Safe Queries" },
    { name: "API Architecture", description: "REST & GraphQL Endpoint Design" },
  ],
  infrastructure: [
    { name: "Vercel Edge Network", description: "Sub-50ms Global CDN Distribution" },
    { name: "HTTPS & CSP", description: "Bank-Grade Encryption & Header Protection" },
    { name: "Caching & Monitoring", description: "Edge Caching & Real-Time Telemetry" },
  ],
};

export const MARKETING_SERVICE_CONFIG: ServicePortalConfig = {
  id: "marketing",
  code: "02",
  title: "Digital Marketing",
  shortTitle: "Marketing",
  description: "Growth laboratory & data-driven digital acquisition command center",
  route: "/marketing",
  badge: "Acquisition & Conversion Engines",
  accentColor: "teal",
  accentHex: "#20B8A6",
  heroHeadline: "ATTENTION IS NOT THE GOAL. GROWTH IS.",
  heroSubheading: "Build a digital acquisition system that turns visibility into enquiries, customers and measurable business outcomes.",
  primaryCTA: "Build My Growth System",
  packages: [
    {
      id: "mkt-foundation",
      name: "MARKETING FOUNDATION",
      price: "₹10,000",
      priceDetails: "One-Time Setup",
      forWho: "Businesses establishing their initial digital presence and local search authority",
      features: [
        "Comprehensive digital presence & asset audit",
        "Google Business Profile optimization & verification",
        "Local SEO foundations & citation building",
        "High-intent keyword research & mapping",
        "Competitor positioning & market intelligence",
        "Social media strategy & profile optimization",
        "Content strategy blueprint for organic authority",
        "WhatsApp enquiry conversion flow strategy",
        "Monthly performance baseline reporting",
      ],
      ctaText: "Launch Foundation Engine",
    },
    {
      id: "mkt-growth",
      name: "MARKETING GROWTH",
      price: "₹25,000",
      priceDetails: "/ month",
      popular: true,
      forWho: "Growing companies ready to generate predictable inbound leads & organic search traffic",
      features: [
        "Full digital acquisition & growth strategy",
        "Audience persona & competitor intelligence",
        "Technical & Content Search Engine Optimization (SEO)",
        "Google Business Profile active management",
        "Multi-channel content planning & campaign design",
        "Dedicated lead-generation campaign architecture",
        "Landing page conversion optimization (CRO)",
        "Conversion event tracking & analytics setup",
        "Monthly performance cycles & optimization",
      ],
      ctaText: "Deploy Growth Engine",
    },
    {
      id: "mkt-performance",
      name: "MARKETING PERFORMANCE",
      price: "₹50,000",
      priceDetails: "/ month + Ad Spend",
      forWho: "Established businesses aggressively scaling revenue via paid ad funnels & search dominance",
      features: [
        "Advanced high-velocity acquisition strategy",
        "Enterprise SEO & authority building system",
        "Paid Ads Management (Google Search, Display & Meta Ads)",
        "Landing page funnels & custom conversion paths",
        "Lead tracking, CRM sync & call attribution",
        "Remarketing funnels & audience segmentation",
        "Attribution modeling & multi-touch analytics",
        "Live reporting command dashboard",
        "Weekly campaign optimization sprints",
        "*Note: Advertising spend is billed directly by ad networks separately.",
      ],
      ctaText: "Scale Acquisition System",
    },
    {
      id: "mkt-scale",
      name: "MARKETING SCALE",
      price: "Custom",
      priceDetails: "Enterprise Growth",
      forWho: "Multi-location brands, e-commerce giants, and national scale acquisition operations",
      features: [
        "Multi-channel global/regional acquisition systems",
        "Advanced multi-tier funnel architecture",
        "Custom CRM & Marketing Automation sync",
        "Predictive lead scoring & pipeline tracking",
        "Dedicated growth team & analytics infrastructure",
        "Custom attribution dashboards & ROI models",
      ],
      ctaText: "Scale My Growth",
    },
  ],
};

export const AI_SERVICE_CONFIG: ServicePortalConfig = {
  id: "ai",
  code: "03",
  title: "AI Solutions & Automation",
  shortTitle: "AI Solutions",
  description: "AI operating system & intelligent operational infrastructure",
  route: "/ai",
  badge: "Intelligent Systems & Workflows",
  accentColor: "blue",
  accentHex: "#38BDF8",
  heroHeadline: "AUTOMATE THE WORK. AMPLIFY THE TEAM.",
  heroSubheading: "Design AI systems that reduce repetitive work, connect your tools and turn business processes into intelligent workflows.",
  primaryCTA: "Build an AI System",
  packages: [
    {
      id: "ai-foundation",
      name: "AI FOUNDATION",
      price: "₹25,000",
      priceDetails: "Starting at",
      forWho: "Businesses starting with practical AI automation to eliminate manual inquiry response & data triage",
      features: [
        "Business process & workflow analysis",
        "Automation audit & bottleneck identification",
        "AI workflow architecture & mapping",
        "Custom smart assistant / chatbot integration",
        "Document parsing & automated text extraction",
        "Lead qualification & instant automated responses",
        "Basic API connections (Email, WhatsApp, CRM)",
        "Testing & deployment assistance",
      ],
      ctaText: "Automate Foundation",
    },
    {
      id: "ai-automation",
      name: "AI AUTOMATION",
      price: "₹50,000",
      priceDetails: "Starting at",
      popular: true,
      forWho: "Operational teams looking to automate multi-step administrative, customer service, & CRM workflows",
      features: [
        "Multi-step automated AI workflow orchestration",
        "Custom API integrations across business software",
        "CRM & database automated data synchronization",
        "Document & invoice intelligence processing",
        "Custom trained knowledge-base assistant",
        "Automated notification & task dispatch systems",
        "Automated summary & reporting generation",
        "System telemetry & monitoring interface",
      ],
      ctaText: "Deploy Automation Engine",
    },
    {
      id: "ai-intelligence",
      name: "AI INTELLIGENCE",
      price: "₹1,00,000",
      priceDetails: "Starting at",
      forWho: "Companies requiring custom AI agents, internal copilots, and RAG knowledge systems",
      features: [
        "Custom autonomous AI agents for specialized operations",
        "Internal team copilot & knowledge assistant",
        "RAG (Retrieval-Augmented Generation) vector architecture",
        "Secure document intelligence & enterprise search",
        "Multi-system workflow orchestration & API pipelines",
        "Custom command dashboard with role-based access",
        "Evaluation metrics & accuracy safety guardrails",
        "Production deployment & model fine-tuning support",
      ],
      ctaText: "Build Intelligent System",
    },
    {
      id: "ai-scale",
      name: "AI SCALE",
      price: "Custom",
      priceDetails: "Enterprise Infrastructure",
      forWho: "Large organizations seeking enterprise-wide AI operational platforms and multi-agent systems",
      features: [
        "Enterprise AI operational infrastructure",
        "Multi-agent collaborative workflow networks",
        "Private LLM deployment & self-hosted vector databases",
        "Advanced custom analytics & orchestration platforms",
        "Role-based security & SOC2-compliant data handling",
        "Continuous fine-tuning & evaluation benchmarks",
      ],
      ctaText: "Architect My AI System",
    },
  ],
};

export const APP_SERVICE_CONFIG: ServicePortalConfig = {
  id: "apps",
  code: "04",
  title: "App Development",
  shortTitle: "Apps",
  description: "Bespoke software products, web applications & internal tools",
  route: "/apps",
  badge: "Custom Software Engineering",
  accentColor: "ivory",
  accentHex: "#F7F7F2",
  heroHeadline: "FROM IDEA TO SOFTWARE PRODUCT.",
  heroSubheading: "Custom applications designed around the way your business actually works.",
  primaryCTA: "Request a Custom Build",
  packages: [
    {
      id: "app-custom",
      name: "CUSTOM APPLICATION BUILD",
      price: "₹50,000+",
      priceDetails: "Custom Scope Estimate",
      forWho: "Businesses building SaaS products, internal operations tools, customer portals, or booking marketplaces",
      features: [
        "Custom product architecture & UI/UX wireframing",
        "Full-stack React / Next.js / Node.js development",
        "Relational database design & API engineering",
        "Role-based authentication & access controls",
        "Third-party integrations (Payments, WhatsApp, AI)",
        "Admin control panel & analytics dashboard",
        "Rigorous automated testing & security audit",
        "Scalable cloud deployment (Vercel, AWS, Supabase)",
      ],
      ctaText: "Configure App Scope",
    },
  ],
};

export const APP_BUILD_TYPES = [
  "Business Application",
  "Internal Tool",
  "SaaS Product",
  "Customer Portal",
  "Dashboard",
  "Booking System",
  "Marketplace",
  "CRM System",
  "Custom Platform",
  "Other Product Concept",
];

export const APP_FEATURE_REQUIREMENTS = [
  "User Authentication & Roles",
  "Payment Gateway (Razorpay/Stripe)",
  "Database Architecture",
  "Admin Command Dashboard",
  "Email / WhatsApp Notifications",
  "Third-Party API Integrations",
  "AI / Machine Learning Features",
  "Analytics & Telemetry",
  "Role-Based Access Control (RBAC)",
  "Mobile & Tablet Responsive",
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "catfish-grill",
    title: "The Catfish Grill — Ghana",
    client: "The Catfish Grill",
    category: "Web",
    location: "Hospitality & Dining — Ghana",
    challenge: "Traditional dining venue with low online table reservations, an unoptimized mobile experience, and zero direct digital order conversion flow.",
    approach: "Architected a high-converting, visually rich web platform with real-time menu interaction, instant WhatsApp table booking, and local SEO dominance.",
    build: "Built using Next.js, Tailwind CSS, Framer Motion, and automated WhatsApp business API dispatch hooks.",
    result: "Established a 100% digital menu and table reservation engine, driving streamlined guest bookings with sub-second page loads.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "WhatsApp API"],
    imageBg: "from-amber-950/40 via-graphite to-graphite",
  },
  {
    id: "andy-foods-gh",
    title: "Andy Foods GH",
    client: "Andy Foods GH",
    category: "Growth",
    location: "Food & Distribution",
    challenge: "Rapidly expanding food supply brand lacking a streamlined B2B product showcase and digital lead acquisition system for commercial buyers.",
    approach: "Engineered a structured catalog interface backed by local SEO campaigns, digital acquisition funnels, and structured B2B inquiry routing.",
    build: "Developed custom product web architecture with automated email/WhatsApp order routing and Google Search Optimization.",
    result: "Transformed buyer inquiries into direct digital orders and secured prime organic rankings across regional trade keywords.",
    techStack: ["React", "TypeScript", "Local SEO", "Acquisition Funnels"],
    imageBg: "from-emerald-950/40 via-graphite to-graphite",
  },
  {
    id: "vitagold-kitchen",
    title: "Vitagold Kitchen",
    client: "Vitagold Kitchen",
    category: "Web",
    location: "Culinary & Catering",
    challenge: "High-volume commercial kitchen requiring an elegant brand experience to capture corporate catering accounts and event orders.",
    approach: "Designed a minimalist, high-end culinary studio interface highlighting package tiers, catering calculators, and instant quote requests.",
    build: "Implemented Next.js App Router, dynamic quote generator, and responsive mobile architecture.",
    result: "Elevated brand perception to attract premium corporate clientele and simplified event catering requests into single-click inquiries.",
    techStack: ["Next.js", "Tailwind CSS", "Quote Calculator", "Vercel"],
    imageBg: "from-orange-950/40 via-graphite to-graphite",
  },
  {
    id: "jikoni-kitchen-of-fire",
    title: "Jikoni — The Kitchen of Fire — Kampala",
    client: "Jikoni",
    category: "Web",
    location: "Specialty Gastronomy — Kampala",
    challenge: "Artisanal flame-grill brand needing a dramatic, cinematic web portal to convey its signature open-fire culinary experience.",
    approach: "Created a dark, cinematic editorial design featuring dark graphite surfaces, subtle flame-tone highlights, and responsive reservation systems.",
    build: "Leveraged Framer Motion physics, Next.js server rendering, and high-performance WebP media optimization.",
    result: "Delivered a captivating visual showcase that significantly elevated brand prestige and increased weekend table bookings.",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "SEO Architecture"],
    imageBg: "from-red-950/40 via-graphite to-graphite",
  },
  {
    id: "je-me-regale",
    title: "Je Me Régale",
    client: "Je Me Régale",
    category: "Growth",
    location: "Gourmet Confectionery",
    challenge: "Bespoke confectionery brand needing targeted digital marketing strategies to reach high-value luxury gift buyers.",
    approach: "Formulated a targeted Google Business & Social Acquisition framework paired with a conversion-optimized online showcase.",
    build: "Executed local SEO optimization, digital campaign funnels, and structured product inquiry flows.",
    result: "Established steady inbound commercial orders and expanded brand visibility among targeted gourmet audiences.",
    techStack: ["Digital Strategy", "Google SEO", "Conversion CRO", "Meta Ads"],
    imageBg: "from-indigo-950/40 via-graphite to-graphite",
  },
  {
    id: "sanvi-designers-academy",
    title: "SANVI DESIGNERS & BEAUTY THERAPY Academy",
    client: "Sanvi Academy",
    category: "App",
    location: "Professional Education",
    challenge: "Premier vocational institute burdened by manual student admissions, course catalog distribution, and fee inquiry tracking.",
    approach: "Engineered an integrated educational portal with course curriculum modules, automated student inquiry routing, and fee structure breakdown.",
    build: "Built a multi-page web application with interactive program filters, lead capturing forms, and admin inquiry tracking.",
    result: "Automated student onboarding inquiries, reduced administrative response lag, and increased enrollment conversions.",
    techStack: ["Next.js", "Custom Forms", "Lead Tracking", "Tailwind CSS"],
    imageBg: "from-purple-950/40 via-graphite to-graphite",
  },
];

export const PROCESS_STAGES = [
  {
    code: "01",
    name: "DISCOVER",
    title: "Understand the Business & Objective",
    description: "We dive deep into your business model, customer touchpoints, competitive landscape, and technical constraints to define absolute clarity.",
    deliverable: "Project Scope Blueprint & Architectural Strategy",
  },
  {
    code: "02",
    name: "ARCHITECT",
    title: "Define System & Experience Design",
    description: "We construct the technical architecture, database schemas, user journeys, and wireframes necessary for a resilient digital foundation.",
    deliverable: "System Map, Database Schema & Visual Blueprint",
  },
  {
    code: "03",
    name: "DESIGN",
    title: "Build Visual & Interaction Systems",
    description: "We craft an exclusive visual identity, typography system, responsive UI components, and fluid micro-interactions tailored to your brand.",
    deliverable: "High-Fidelity UI System & Component Library",
  },
  {
    code: "04",
    name: "ENGINEER",
    title: "Develop, Integrate & Optimise",
    description: "We write clean, strictly typed, production-grade code with sub-second performance targets, security hardening, and API integrations.",
    deliverable: "Fully Engineered Codebase & API Infrastructure",
  },
  {
    code: "05",
    name: "LAUNCH",
    title: "Test, Deploy, Monitor & Scale",
    description: "We perform rigorous cross-device QA, security audits, and global edge deployment followed by real-time telemetry and post-launch support.",
    deliverable: "Live Production System, Analytics & SSL Hardening",
  },
];
