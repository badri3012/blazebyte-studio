"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useSound } from "@/context/sound-context";
import { SITE_CONFIG } from "@/config/studio-data";
import { 
  Building2, 
  Sparkles, 
  Globe, 
  Utensils, 
  ShoppingBag, 
  Calendar, 
  GraduationCap, 
  Rocket, 
  Layers, 
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  MessageSquare,
  ChevronRight,
  Check,
  Zap,
  Terminal,
  Clock,
  ShieldCheck,
  AlertCircle,
  Activity,
  Maximize2
} from "lucide-react";

export const WebProjectConfigurator = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { playHover, playClick, playSuccess } = useSound();

  // Screen State: 'hero' | 'configurator' | 'submitted'
  const [screen, setScreen] = useState<"hero" | "configurator" | "submitted">("hero");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // --- Step 01: Project Type ---
  const [projectType, setProjectType] = useState<string>("Business Website");

  // --- Step 02: Business Info ---
  const [businessName, setBusinessName] = useState<string>("");
  const [currentWebsite, setCurrentWebsite] = useState<string>("");
  const [industry, setIndustry] = useState<string>("Technology");
  const [locationCountry, setLocationCountry] = useState<string>("India");
  const [locationCity, setLocationCity] = useState<string>("");
  const [businessDoing, setBusinessDoing] = useState<string>("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["Get More Enquiries"]);

  // --- Step 03: Design Direction ---
  const [selectedMoods, setSelectedMoods] = useState<string[]>(["Premium", "Modern"]);
  const [colorPreference, setColorPreference] = useState<string>("Dark");
  const [brandingStatus, setBrandingStatus] = useState<string>("Yes");
  const [brandAssetNote, setBrandAssetNote] = useState<string>("");

  // --- Step 04: Features ---
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Responsive design",
    "Mobile optimisation",
    "Contact form",
    "WhatsApp integration",
    "SEO foundations",
    "CMS",
  ]);

  // --- Step 05: Content Readiness ---
  const [contentReadiness, setContentReadiness] = useState<string>("Partially Ready");
  const [hasLogo, setHasLogo] = useState<boolean>(true);
  const [hasText, setHasText] = useState<boolean>(false);
  const [hasPhotos, setHasPhotos] = useState<boolean>(false);
  const [needsCopywriting, setNeedsCopywriting] = useState<boolean>(true);
  const [needsImageSourcing, setNeedsImageSourcing] = useState<boolean>(true);

  // --- Step 06: Budget ---
  const [budgetRange, setBudgetRange] = useState<string>("â‚¹15K â€“ â‚¹30K");

  // --- Step 07: Timeline ---
  const [launchTimeline, setLaunchTimeline] = useState<string>("2â€“4 WEEKS");
  const [specificDate, setSpecificDate] = useState<string>("");

  // --- Step 08: References ---
  const [ref1, setRef1] = useState<string>("");
  const [ref2, setRef2] = useState<string>("");
  const [ref3, setRef3] = useState<string>("");
  const [refNotes, setRefNotes] = useState<string>("");

  // --- Step 09: Final Description ---
  const [projectDescription, setProjectDescription] = useState<string>("");

  // --- Step 10: Client Details ---
  const [clientName, setClientName] = useState<string>("");
  const [clientCompany, setClientCompany] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientWhatsapp, setClientWhatsapp] = useState<string>("");
  const [clientCountry, setClientCountry] = useState<string>("India");
  const [preferredContact, setPreferredContact] = useState<string>("WhatsApp");

  // Submission & API state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedProjectId, setGeneratedProjectId] = useState<string>("");
  const [generatedInvoiceId, setGeneratedInvoiceId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [microNotice, setMicroNotice] = useState<string>("");

  useEffect(() => {
    const pkgParam = searchParams.get("package");
    if (pkgParam) {
      if (pkgParam.includes("starter")) setBudgetRange("â‚¹5K â€“ â‚¹15K");
      else if (pkgParam.includes("growth")) setBudgetRange("â‚¹15K â€“ â‚¹30K");
      else if (pkgParam.includes("professional")) setBudgetRange("â‚¹30K â€“ â‚¹50K");
      else if (pkgParam.includes("scale")) setBudgetRange("â‚¹50K â€“ â‚¹1L");
      setScreen("configurator");
    }
  }, [searchParams]);

  // Subtle Mouse Parallax Handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 15;
    const y = (clientY / window.innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  const triggerMicroNotice = (text: string) => {
    setMicroNotice(text);
    setTimeout(() => setMicroNotice(""), 3000);
  };

  // 10 Editorial Project Type Modules
  const projectTypeOptions = [
    { id: "Business Website", code: "01", label: "BUSINESS WEBSITE", desc: "Corporate, local business, or firm.", icon: Building2, preview: "CMS â€¢ Leads â€¢ SEO" },
    { id: "Landing Page", code: "02", label: "LANDING PAGE", desc: "High-conversion product or campaign page.", icon: Rocket, preview: "CRO â€¢ Funnels â€¢ Ads" },
    { id: "Portfolio", code: "03", label: "PORTFOLIO", desc: "Personal brand, studio, or creator showcase.", icon: Globe, preview: "Editorial â€¢ Visual" },
    { id: "Restaurant / Food", code: "04", label: "RESTAURANT", desc: "Dining, cloud kitchen, or menu engine.", icon: Utensils, preview: "Menu â€¢ WhatsApp â€¢ Booking" },
    { id: "E-Commerce", code: "05", label: "E-COMMERCE", desc: "Product catalog, cart, and payment gateway.", icon: ShoppingBag, preview: "Razorpay â€¢ Catalog" },
    { id: "Booking Website", code: "06", label: "BOOKING", desc: "Appointments, reservations, or events.", icon: Calendar, preview: "Schedule â€¢ Deposits" },
    { id: "Education", code: "07", label: "EDUCATION", desc: "Academy, course catalog, or institute portal.", icon: GraduationCap, preview: "Programs â€¢ Enquiries" },
    { id: "Startup", code: "08", label: "STARTUP", desc: "SaaS product launch or tech portal.", icon: Zap, preview: "Interactive â€¢ Analytics" },
    { id: "Custom Platform", code: "09", label: "CUSTOM PLATFORM", desc: "Bespoke digital software system.", icon: Layers, preview: "API â€¢ Database â€¢ RBAC" },
    { id: "Other", code: "10", label: "OTHER", desc: "Custom bespoke digital concept.", icon: HelpCircle, preview: "Custom Blueprint" },
  ];

  const industryOptions = [
    "Technology", "Restaurant", "Fashion", "Beauty", "Education", "Healthcare", 
    "Finance", "Real Estate", "Professional Services", "E-commerce", "Agriculture", 
    "Hospitality", "Other"
  ];

  const goalOptions = [
    "Get More Enquiries", "Build Brand Credibility", "Sell Products", 
    "Get Bookings", "Generate Leads", "Launch a New Business", 
    "Build a Digital Presence", "Other"
  ];

  const moodOptions = [
    { id: "Premium", desc: "Editorial / sophisticated / luxury" },
    { id: "Modern", desc: "Clean / minimal / contemporary" },
    { id: "Cinematic", desc: "Immersive / visual / storytelling" },
    { id: "Corporate", desc: "Professional / structured / authoritative" },
    { id: "Creative", desc: "Experimental / expressive / unconventional" },
    { id: "Technology", desc: "Technical / futuristic / intelligent" },
  ];

  const featureCategories = {
    CORE: [
      "Responsive design", "Mobile optimisation", "Contact form", 
      "WhatsApp integration", "Google Maps", "Social links", "SEO foundations"
    ],
    BUSINESS: [
      "Lead generation", "Appointment booking", "Enquiry system", 
      "Testimonials", "FAQ section", "Blog system", "CMS", "Multilingual support"
    ],
    COMMERCE: [
      "Product catalogue", "Shopping cart", "Payments gateway", 
      "Orders management", "Coupons / Discounts", "Inventory sync", "Customer accounts"
    ],
    ADVANCED: [
      "User Authentication", "User dashboard", "Admin control panel", 
      "API integration", "CRM sync", "Custom database", "Advanced search", "Notifications"
    ],
    AI: [
      "AI chatbot", "AI smart assistant", "AI semantic search", 
      "AI recommendation", "AI lead qualification", "AI content workflows"
    ],
  };

  const budgetOptions = [
    { range: "â‚¹5K â€“ â‚¹15K", desc: "Starter websites / landing pages" },
    { range: "â‚¹15K â€“ â‚¹30K", desc: "Professional business websites" },
    { range: "â‚¹30K â€“ â‚¹50K", desc: "Premium custom websites" },
    { range: "â‚¹50K â€“ â‚¹1L", desc: "Advanced websites / web systems" },
    { range: "â‚¹1L+", desc: "Complex platforms / e-commerce / custom platforms" },
    { range: "NOT SURE", desc: "Let BlazeByte recommend appropriate scope" },
  ];

  const timelineOptions = ["ASAP", "1â€“2 WEEKS", "2â€“4 WEEKS", "1â€“2 MONTHS", "FLEXIBLE"];

  // 11 Project Journey Blueprint Steps
  const blueprintSteps = [
    "01 PROJECT", "02 BUSINESS", "03 DIRECTION", "04 FEATURES", 
    "05 CONTENT", "06 INVESTMENT", "07 TIMELINE", "08 REFERENCES", 
    "09 OVERVIEW", "10 CONTACT", "11 REVIEW"
  ];

  const totalSteps = 11;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const handleNextStep = () => {
    playClick();
    if (currentStep === 2 && !businessName.trim()) {
      setErrorMessage("Business / Brand Name is required.");
      return;
    }
    if (currentStep === 10 && (!clientName.trim() || !clientEmail.trim())) {
      setErrorMessage("Full Name and Email are required.");
      return;
    }
    setErrorMessage("");
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    playClick();
    setErrorMessage("");
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const toggleGoal = (goal: string) => {
    playClick();
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const toggleMood = (moodId: string) => {
    playClick();
    if (selectedMoods.includes(moodId)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== moodId));
    } else {
      if (selectedMoods.length >= 2) {
        setSelectedMoods([selectedMoods[1], moodId]);
      } else {
        setSelectedMoods([...selectedMoods, moodId]);
      }
    }
  };

  const toggleFeature = (feat: string) => {
    playClick();
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
      triggerMicroNotice(`${feat.toUpperCase()} ADDED TO SYSTEM`);
    }
  };

  const generateIds = () => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    return {
      projectId: `BB-WEB-2026-${rand}`,
      invoiceId: `INV-BB-2026-${rand}`
    };
  };

  const handleFinalSubmission = async () => {
    playClick();
    setIsSubmitting(true);
    setErrorMessage("");

    const ids = generateIds();
    setGeneratedProjectId(ids.projectId);
    setGeneratedInvoiceId(ids.invoiceId);

    const payload = {
      projectId: ids.projectId,
      invoiceId: ids.invoiceId,
      projectType,
      businessName,
      currentWebsite,
      industry,
      location: `${locationCity ? locationCity + ", " : ""}${locationCountry}`,
      businessDescription: businessDoing,
      projectGoals: selectedGoals,
      designDirection: selectedMoods,
      colorPreference,
      brandingStatus,
      brandAssetNote,
      selectedFeatures,
      contentStatus: contentReadiness,
      contentChecklist: { hasLogo, hasText, hasPhotos, needsCopywriting, needsImageSourcing },
      budgetRange,
      timeline: launchTimeline,
      specificLaunchDate: specificDate,
      referenceWebsites: [ref1, ref2, ref3].filter(Boolean),
      referenceNotes: refNotes,
      projectDescription,
      clientName,
      clientCompany,
      email: clientEmail,
      whatsapp: clientWhatsapp,
      preferredContact,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/web-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        playSuccess();
        setScreen("submitted");
      } else {
        const err = await res.json();
        setErrorMessage(err.error || "Form submission error. Please try direct WhatsApp dispatch.");
      }
    } catch {
      setErrorMessage("Network connection error. You can continue via WhatsApp dispatch.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppSummary = () => {
    return `*BLAZEBYTE WEB PROJECT SPECIFICATION*\n` +
      `*Project ID:* ${generatedProjectId || "BB-WEB-2026-PENDING"}\n` +
      `*Invoice ID:* ${generatedInvoiceId || "INV-BB-2026-PENDING"}\n` +
      `-----------------------------------\n` +
      `*Client:* ${clientName || "N/A"} (${clientCompany || "N/A"})\n` +
      `*Type:* ${projectType}\n` +
      `*Business:* ${businessName || "N/A"}\n` +
      `*Budget Range:* ${budgetRange}\n` +
      `*Target Timeline:* ${launchTimeline}\n` +
      `*Selected Modules (${selectedFeatures.length}):* ${selectedFeatures.slice(0, 4).join(", ")}...\n` +
      `-----------------------------------\n` +
      `Submitted via Digital Workshop blazebyte.shop/web/order`;
  };

  // --- SCREEN 01: HERO ENTRANCE SCREEN (THE DIGITAL WORKSHOP) ---
  if (screen === "hero") {
    return (
      <div 
        onMouseMove={handleMouseMove}
        className="bg-[#F4F1EA] text-[#17191C] font-sans min-h-screen selection:bg-[#3457FF]/20 selection:text-[#17191C] relative overflow-hidden"
      >
        
        {/* HERO ENVIRONMENT CONTAINER */}
        <section className="relative min-h-[92vh] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 border-b-2 border-[#17191C] overflow-hidden">
          
          {/* Full-Width 4K Anime Digital Workshop Background Image with Subtle Parallax */}
          <div className="absolute inset-0 z-0 opacity-25 sm:opacity-30 pointer-events-none overflow-hidden">
            <Image 
              src="/images/digital-workshop-hero.jpg"
              alt="BlazeByte Digital Workshop Studio Environment"
              fill
              className="object-cover object-center scale-105 transition-transform duration-700 ease-out"
              style={{
                transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.05)`
              }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EA] via-[#F4F1EA]/80 to-transparent" />
          </div>

          {/* Top Technical Editorial Marker */}
          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#17191C]/15 font-mono text-xs text-[#5A606A]">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#17191C] text-[#F4F1EA] border border-[#17191C] select-none">
              <span className="text-[#3457FF] font-bold">[ â†’ ]</span>
              <span className="font-bold tracking-widest uppercase text-white">BLAZEBYTE / WEB PROJECT SYSTEM</span>
              <span className="text-[#A5A5A5] hidden sm:inline">// DIGITAL WORKSHOP</span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-[11px]">
              <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-[#3457FF]" /> SYSTEM: ACTIVE</span>
              <span>EST. 2026</span>
              <span className="text-[#3457FF] font-bold">50% ADVANCE POLICY</span>
            </div>
          </div>

          {/* Main Hero Content & Architectural Browser Blueprint Grid */}
          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
            
            {/* Left Headline & Positioning */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#3457FF] tracking-wider uppercase block">
                  STEP-BY-STEP PROJECT ARCHITECTURE
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-[88px] xl:text-[96px] font-heading font-black text-[#17191C] uppercase tracking-tight leading-[0.9]">
                  BUILD YOUR<br />
                  <span className="text-[#3457FF]">DIGITAL</span><br />
                  PRESENCE
                </h1>
              </div>

              <div className="space-y-3 max-w-xl">
                <p className="text-xl sm:text-2xl font-serif italic text-[#17191C]/90 font-medium">
                  Tell us what you're building. We'll help shape the right web system for it.
                </p>
                <p className="text-xs sm:text-sm font-mono text-[#5A606A] leading-relaxed">
                  Configure your system in 11 structured steps. Select capabilities, investment parameters, and business objectives in our studio environment.
                </p>
              </div>

              {/* Redesigned CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => {
                    playClick();
                    setScreen("configurator");
                  }}
                  onMouseEnter={playHover}
                  className="w-full sm:w-auto px-8 py-4 bg-[#17191C] text-[#F4F1EA] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#3457FF] transition-all duration-300 rounded-none cursor-pointer shadow-xl flex items-center justify-center gap-3 group"
                >
                  <span>START CONFIGURATION</span>
                  <ArrowRight className="w-4 h-4 text-[#3457FF] group-hover:translate-x-1 group-hover:text-white transition-transform" />
                </button>

                <a 
                  href="#packages"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#17191C] text-[#17191C] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#17191C] hover:text-[#F4F1EA] transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center"
                >
                  <span>VIEW WEB PACKAGES</span>
                </a>
              </div>

              {/* Technical Annotations Ticks */}
              <div className="pt-4 flex flex-wrap gap-4 text-[10px] font-mono text-[#5A606A]">
                <span className="px-2 py-1 bg-white/80 border border-[#17191C]/15">01 / DISCOVERY</span>
                <span className="px-2 py-1 bg-white/80 border border-[#17191C]/15">02 / STRUCTURE</span>
                <span className="px-2 py-1 bg-white/80 border border-[#17191C]/15">03 / UI SYSTEM</span>
                <span className="px-2 py-1 bg-white/80 border border-[#17191C]/15">04 / ENGINEER</span>
                <span className="px-2 py-1 bg-[#3457FF] text-white font-bold">SEO & 50% ADVANCE</span>
              </div>

            </div>

            {/* Right Architectural Browser Blueprint Widget */}
            <div className="lg:col-span-5 hidden lg:block">
              <div 
                className="relative bg-white border-2 border-[#17191C] p-4 shadow-2xl space-y-4"
                style={{
                  transform: `translate3d(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px, 0)`
                }}
              >
                <div className="flex items-center justify-between border-b border-[#17191C]/15 pb-2 font-mono text-[10px] text-[#5A606A]">
                  <span className="font-bold text-[#17191C]">ARCHITECTURAL BROWSER WIREFRAME</span>
                  <span className="text-[#3457FF] font-bold">REF :: 01_SYSTEM</span>
                </div>

                <div className="aspect-[4/3] bg-[#F4F1EA] border border-[#17191C]/20 p-3 relative space-y-2 overflow-hidden">
                  <div className="flex items-center justify-between bg-[#17191C] text-[#F4F1EA] px-2 py-1 text-[9px] font-mono">
                    <span>NAVBAR :: SYSTEM HEADER</span>
                    <span>100% RESPONSIVE</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 h-20">
                    <div className="col-span-2 bg-[#3457FF]/10 border border-[#3457FF] p-2 flex flex-col justify-between">
                      <span className="text-[8px] font-mono text-[#3457FF] font-bold">HERO SECTION</span>
                      <span className="text-[9px] font-heading font-bold text-[#17191C]">EDITORIAL LAYOUT</span>
                    </div>
                    <div className="bg-white border border-[#17191C]/20 p-1 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#5A606A]">ASSET_01</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-white border border-[#17191C]/15 p-1 text-[8px] font-mono text-center">
                        MOD_0{i}
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-2 right-2 bg-[#17191C] text-[#F4F1EA] px-2 py-0.5 text-[8px] font-mono font-bold">
                    NEXT.JS + TAILWIND
                  </div>
                </div>

                <div className="p-2 bg-[#17191C] text-[#F4F1EA] text-[10px] font-mono flex justify-between items-center">
                  <span className="text-[#A5A5A5]">BLUEPRINT STAGE: READY</span>
                  <span className="text-[#3457FF] font-bold">SUB-SECOND TARGET</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Environmental Strip */}
          <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-[#17191C]/15 flex flex-wrap justify-between items-center font-mono text-xs text-[#5A606A] gap-4">
            <div>BLAZEBYTE DIGITAL WORKSHOP</div>
            <div className="flex items-center gap-6">
              <span>RESPONSIVE</span>
              <span>â€¢</span>
              <span>SCALABLE</span>
              <span>â€¢</span>
              <span>PERFORMANT</span>
              <span>â€¢</span>
              <span>SEO READY</span>
            </div>
          </div>

        </section>

        {/* SECTION 14 â€” PROJECT TYPE SELECTOR ("WHAT ARE WE BUILDING?") */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 border-b border-[#17191C]/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#17191C]/15 pb-6 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#3457FF] uppercase tracking-wider block">
                01 â€” SYSTEM DIRECTION
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#17191C] uppercase tracking-tight">
                WHAT ARE WE BUILDING?
              </h2>
            </div>
            <p className="text-xs font-mono text-[#5A606A] max-w-md">
              Select your primary digital project classification below. You can customize all functional modules in the next step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {projectTypeOptions.map((item) => {
              const Icon = item.icon;
              const isSelected = projectType === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setProjectType(item.id);
                    setScreen("configurator");
                    triggerMicroNotice(`${item.label} SELECTED`);
                  }}
                  className={`p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 ${
                    isSelected
                      ? "bg-[#17191C] text-[#F4F1EA] border-[#3457FF] shadow-2xl scale-[1.02]"
                      : "bg-white text-[#17191C] border-[#17191C]/20 hover:border-[#3457FF] hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${isSelected ? "text-[#3457FF]" : "text-[#5A606A]"}`}>
                      {item.code}
                    </span>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-[#3457FF]" : "text-[#17191C]"}`} />
                  </div>

                  <div className="space-y-1">
                    <div className="font-heading font-black text-base uppercase tracking-tight">
                      {item.label}
                    </div>
                    <div className={`text-xs ${isSelected ? "text-[#A5A5A5]" : "text-[#5A606A]"}`}>
                      {item.desc}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#17191C]/10 flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? "text-[#3457FF] font-bold" : "text-[#5A606A]"}>
                      {item.preview}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-[#3457FF]" : "text-[#17191C]/40"}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 15 â€” 11-STEP PROJECT BLUEPRINT TIMELINE */}
        <section className="py-16 bg-[#17191C] text-[#F4F1EA] border-b-2 border-[#17191C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F4F1EA]/15 pb-6 gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#3457FF] uppercase tracking-wider block">
                  SYSTEM JOURNEY
                </span>
                <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#F4F1EA] uppercase tracking-tight">
                  THE 11-STEP PROJECT BLUEPRINT TIMELINE
                </h2>
              </div>
              <p className="text-xs font-mono text-[#A5A5A5] max-w-sm">
                Every project moves through a transparent, 11-point architectural sequence.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-2 font-mono text-[10px]">
              {blueprintSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`p-3 border text-center flex flex-col justify-between gap-2 ${
                    idx === 0 
                      ? "bg-[#3457FF] text-white border-[#3457FF] font-bold" 
                      : "bg-[#17191C] border-[#F4F1EA]/15 text-[#A5A5A5]"
                  }`}
                >
                  <span className="text-[9px] opacity-70">STEP {idx + 1}</span>
                  <span className="font-bold">{step}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 16 â€” WEB PACKAGES GRID */}
        <section id="packages" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 border-b border-[#17191C]/15">
          <div className="border-b border-[#17191C]/15 pb-6 space-y-2">
            <span className="text-xs font-mono font-bold text-[#3457FF] uppercase tracking-wider block">
              TRANSPARENT PRICING & TIERS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#17191C] uppercase tracking-tight">
              WEB SERVICE PACKAGES
            </h2>
            <p className="text-sm text-[#5A606A]">
              Choose a pre-configured tier or customize a bespoke solution. 50% advance required to confirm and initiate build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "WEB STARTER",
                price: "â‚¹5,000+",
                desc: "Personal websites, simple business landing pages, basic service sites.",
                features: ["Mobile-optimized UI", "Contact form & WhatsApp", "Basic SEO setup", "SSL security"],
                pkgId: "web-starter"
              },
              {
                name: "WEB GROWTH",
                price: "â‚¹15,000+",
                popular: true,
                desc: "Growing businesses requiring a commanding digital presence & lead engine.",
                features: ["Custom UI/UX system", "Up to 7 pages", "WhatsApp conversion flows", "CMS ready"],
                pkgId: "web-growth"
              },
              {
                name: "WEB PROFESSIONAL",
                price: "â‚¹30,000+",
                desc: "Established enterprises seeking custom workflows, CMS, and market leadership.",
                features: ["Bespoke visual language", "Cinematic scroll motion", "API & webhooks", "WCAG & CSP controls"],
                pkgId: "web-professional"
              },
              {
                name: "WEB SCALE",
                price: "â‚¹50,000+",
                desc: "Enterprise platforms, e-commerce networks, booking portals, and SaaS dashboards.",
                features: ["Full-stack app architecture", "E-commerce or booking", "Multi-language & headless DB", "Edge CDN distribution"],
                pkgId: "web-scale"
              }
            ].map((pkg, i) => (
              <div 
                key={i}
                className={`p-6 bg-white border-2 flex flex-col justify-between space-y-6 ${
                  pkg.popular ? "border-[#3457FF] shadow-xl" : "border-[#17191C]"
                }`}
              >
                <div className="space-y-4">
                  {pkg.popular && (
                    <span className="px-2.5 py-0.5 bg-[#3457FF] text-white text-[10px] font-mono font-bold uppercase inline-block">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="text-xl font-heading font-black text-[#17191C] uppercase">{pkg.name}</h3>
                  <div className="text-3xl font-mono font-black text-[#3457FF]">{pkg.price}</div>
                  <p className="text-xs text-[#5A606A] leading-relaxed">{pkg.desc}</p>
                  
                  <ul className="space-y-2 text-xs font-mono border-t border-[#17191C]/10 pt-4 text-[#17191C]">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#3457FF] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    playClick();
                    router.push(`/web/order?package=${pkg.pkgId}`);
                  }}
                  onMouseEnter={playHover}
                  className="w-full py-3 bg-[#17191C] hover:bg-[#3457FF] text-[#F4F1EA] font-mono font-bold text-xs uppercase transition-colors cursor-pointer text-center"
                >
                  CONFIGURE THIS TIER â†’
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 17 â€” TRUST FLOW ("HOW YOUR PROJECT MOVES") */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="border-b border-[#17191C]/15 pb-6 space-y-2">
            <span className="text-xs font-mono font-bold text-[#3457FF] uppercase tracking-wider block">
              COMMERCIAL PROCESS
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#17191C] uppercase tracking-tight">
              HOW YOUR PROJECT MOVES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 text-center font-mono text-xs">
            {[
              { code: "01", name: "REQUEST" },
              { code: "02", name: "REVIEW" },
              { code: "03", name: "PROPOSAL" },
              { code: "04", name: "50% ADVANCE" },
              { code: "05", name: "BUILD" },
              { code: "06", name: "APPROVAL" },
              { code: "07", name: "LAUNCH" }
            ].map((step, i) => (
              <div key={i} className="p-4 bg-white border border-[#17191C]/20 space-y-2">
                <span className="text-xs font-bold text-[#3457FF] block">{step.code}</span>
                <span className="font-bold text-[#17191C]">{step.name}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    );
  }

  // --- SCREEN 03: SUBMITTED CONFIRMATION SCREEN ---
  if (screen === "submitted") {
    return (
      <div className="bg-[#F4F1EA] text-[#17191C] min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto bg-white border-2 border-[#17191C] p-8 sm:p-12 space-y-8 shadow-2xl relative">
          <div className="flex flex-wrap items-center justify-between border-b border-[#17191C]/20 pb-4 gap-2 font-mono text-xs">
            <div className="text-[#3457FF] font-bold">BLAZEBYTE / ENQUIRY DISPATCHED</div>
            <div>PROJ ID: <span className="text-[#17191C] font-bold">{generatedProjectId}</span></div>
          </div>

          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#3457FF]/10 border-2 border-[#3457FF] text-[#3457FF] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase text-[#17191C]">
              PROJECT SPECIFICATION RECORDED
            </h1>
            <p className="text-sm text-[#5A606A] font-sans max-w-lg mx-auto leading-relaxed">
              Your web project requirements have been stored in the BlazeByte studio system. You can inspect your generated commercial invoice or continue via WhatsApp dispatch.
            </p>
          </div>

          {/* Lifecycle Tracker */}
          <div className="border border-[#17191C]/20 p-6 bg-[#F4F1EA] space-y-4">
            <div className="font-mono text-xs text-[#3457FF] font-bold uppercase">COMMERCIAL MILESTONE PIPELINE</div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-[10px]">
              <div className="p-2 border border-[#3457FF] bg-[#3457FF] text-white font-bold text-center">
                01 / SPECIFICATION
              </div>
              <div className="p-2 border border-[#17191C]/30 text-center text-[#5A606A]">
                02 / REVIEW
              </div>
              <div className="p-2 border border-[#17191C]/30 text-center text-[#5A606A]">
                03 / INVOICE
              </div>
              <div className="p-2 border border-[#17191C]/30 text-center text-[#5A606A]">
                04 / 50% ADVANCE
              </div>
              <div className="p-2 border border-[#17191C]/30 text-center text-[#5A606A]">
                05 / BUILD
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {generatedInvoiceId && (
              <Link href={`/pay?id=${generatedInvoiceId}`} onClick={playClick}>
                <button className="w-full sm:w-auto px-6 py-3.5 bg-[#3457FF] text-white font-mono font-bold text-xs uppercase hover:bg-[#3457FF]/90 transition-all cursor-pointer">
                  PAY 50% ADVANCE →
                </button>
              </Link>
            )}
            {generatedInvoiceId && (
              <Link href={`/invoice?id=${generatedInvoiceId}`} onClick={playClick}>
                <button className="w-full sm:w-auto px-6 py-3.5 bg-[#17191C] text-white font-mono font-bold text-xs uppercase hover:bg-[#3457FF] transition-all cursor-pointer">
                  VIEW OFFICIAL INVOICE →
                </button>
              </Link>
            )}
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}?text=${encodeURIComponent(getWhatsAppSummary())}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playSuccess}
            >
              <button className="w-full sm:w-auto px-6 py-3.5 bg-[#3457FF] text-white font-mono font-bold text-xs uppercase hover:bg-[#3457FF]/90 transition-all cursor-pointer flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>CONTINUE TO WHATSAPP</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // --- SCREEN 02: MULTI-STEP PROJECT CONFIGURATOR ---
  return (
    <div className="bg-[#F4F1EA] text-[#17191C] min-h-screen font-sans pb-24 relative selection:bg-[#3457FF]/20 selection:text-[#17191C]">
      
      {/* Micro Notice Toast */}
      {microNotice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#3457FF] text-white font-mono text-xs font-bold shadow-2xl animate-in fade-in duration-150">
          âš¡ {microNotice}
        </div>
      )}

      {/* Persistent Desktop & Mobile Progress Header */}
      <div className="sticky top-20 z-40 bg-[#F4F1EA]/95 backdrop-blur-md border-b-2 border-[#17191C] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#3457FF] bg-[#17191C] text-white px-2 py-0.5">
              STEP {String(currentStep).padStart(2, "0")} / {totalSteps}
            </span>
            <span className="font-bold text-[#17191C] uppercase hidden sm:inline">
              {blueprintSteps[currentStep - 1]}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[11px] text-[#5A606A]">Progress: {progressPercent}%</span>
            <div className="w-24 sm:w-36 h-2 bg-gray-300 border border-[#17191C]/30 overflow-hidden">
              <div className="h-full bg-[#3457FF] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT & CENTER: STEP QUESTION & CONFIGURATION PANELS */}
          <div className="lg:col-span-2 space-y-8">
            {errorMessage && (
              <div className="p-3 bg-red-100 border border-red-500 text-red-900 font-mono text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* --- STEP 01: PROJECT TYPE --- */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs text-[#3457FF] font-bold uppercase">01 â€” PROJECT CLASSIFICATION</div>
                  <h2 className="text-3xl font-heading font-black text-[#17191C] uppercase">WHAT ARE WE BUILDING?</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projectTypeOptions.map((item) => {
                    const Icon = item.icon;
                    const isSelected = projectType === item.id;
                    return (
                      <div
                        key={item.id}
                        onMouseEnter={playHover}
                        onClick={() => {
                          playClick();
                          setProjectType(item.id);
                          triggerMicroNotice(`${item.label} SELECTED`);
                        }}
                        className={`p-5 border-2 transition-all cursor-pointer space-y-2 relative ${
                          isSelected
                            ? "border-[#3457FF] bg-[#17191C] text-[#F4F1EA] shadow-xl"
                            : "border-[#17191C]/30 bg-white hover:border-[#3457FF] text-[#17191C]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className={`w-5 h-5 ${isSelected ? "text-[#3457FF]" : "text-[#17191C]"}`} />
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#3457FF]" />}
                        </div>
                        <div className="font-heading font-bold text-sm">{item.label}</div>
                        <p className={`text-xs leading-relaxed ${isSelected ? "text-[#A5A5A5]" : "text-[#5A606A]"}`}>
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --- STEP 02: BUSINESS INFORMATION --- */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs text-[#3457FF] font-bold uppercase">02 â€” BUSINESS DETAILS</div>
                  <h2 className="text-3xl font-heading font-black text-[#17191C] uppercase">TELL US ABOUT THE BUSINESS</h2>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block font-bold text-[#17191C] mb-1">Business / Brand Name *</label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Acme Dining Co."
                      className="w-full p-3 border border-[#17191C]/40 bg-white text-[#17191C] text-sm focus:border-[#3457FF] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#17191C] mb-1">Current Website (Optional)</label>
                      <input
                        type="url"
                        value={currentWebsite}
                        onChange={(e) => setCurrentWebsite(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full p-3 border border-[#17191C]/40 bg-white text-[#17191C] text-sm focus:border-[#3457FF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#17191C] mb-1">Industry</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full p-3 border border-[#17191C]/40 bg-white text-[#17191C] text-sm focus:border-[#3457FF] focus:outline-none"
                      >
                        {industryOptions.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#17191C] mb-1">What does the business do?</label>
                    <textarea
                      rows={3}
                      value={businessDoing}
                      onChange={(e) => setBusinessDoing(e.target.value)}
                      placeholder="Briefly describe products, services, or target audience..."
                      className="w-full p-3 border border-[#17191C]/40 bg-white text-[#17191C] text-sm focus:border-[#3457FF] focus:outline-none font-sans"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 03: DESIGN DIRECTION --- */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs text-[#3457FF] font-bold uppercase">03 â€” DESIGN DIRECTION</div>
                  <h2 className="text-3xl font-heading font-black text-[#17191C] uppercase">HOW SHOULD IT FEEL?</h2>
                  <p className="text-xs text-[#5A606A] font-mono mt-1">Select up to 2 preferred design directions.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {moodOptions.map((mood) => {
                    const isSelected = selectedMoods.includes(mood.id);
                    return (
                      <div
                        key={mood.id}
                        onMouseEnter={playHover}
                        onClick={() => toggleMood(mood.id)}
                        className={`p-5 border-2 transition-all cursor-pointer space-y-1 ${
                          isSelected
                            ? "border-[#3457FF] bg-[#17191C] text-[#F4F1EA]"
                            : "border-[#17191C]/30 bg-white text-[#17191C] hover:border-[#3457FF]"
                        }`}
                      >
                        <div className="font-heading font-bold text-base flex items-center justify-between">
                          <span>{mood.id.toUpperCase()}</span>
                          {isSelected && <span className="text-xs font-mono text-[#3457FF]">SELECTED</span>}
                        </div>
                        <p className={`text-xs ${isSelected ? "text-[#A5A5A5]" : "text-[#5A606A]"}`}>
                          {mood.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --- STEP 04: FEATURES MODULES --- */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs text-[#3457FF] font-bold uppercase">04 â€” SYSTEM MODULES</div>
                  <h2 className="text-3xl font-heading font-black text-[#17191C] uppercase">REQUIRED CAPABILITY MODULES</h2>
                </div>

                <div className="space-y-6">
                  {Object.entries(featureCategories).map(([catName, feats]) => (
                    <div key={catName} className="space-y-2">
                      <div className="font-mono text-xs font-bold text-[#3457FF] uppercase">{catName} MODULES</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {feats.map((feat) => {
                          const isSelected = selectedFeatures.includes(feat);
                          return (
                            <div
                              key={feat}
                              onClick={() => toggleFeature(feat)}
                              className={`p-2.5 border text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? "bg-[#17191C] text-[#F4F1EA] border-[#17191C]"
                                  : "bg-white border-[#17191C]/30 text-[#17191C] hover:border-[#3457FF]"
                              }`}
                            >
                              <span className="line-clamp-1">{feat}</span>
                              {isSelected ? <Check className="w-3.5 h-3.5 text-[#3457FF] shrink-0" /> : <span className="text-[10px] text-[#5A606A]">+</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- STEP 05 TO 10 SUMMARY / RENDER --- */}
            {currentStep > 4 && currentStep < 11 && (
              <div className="space-y-6 font-mono text-xs">
                <div>
                  <div className="font-mono text-xs text-[#3457FF] font-bold uppercase">STEP {currentStep} OF 11</div>
                  <h2 className="text-3xl font-heading font-black text-[#17191C] uppercase">
                    {blueprintSteps[currentStep - 1]}
                  </h2>
                </div>

                {currentStep === 6 && (
                  <div className="space-y-4">
                    <label className="block font-bold text-[#17191C]">Choose Investment Parameter Range</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {budgetOptions.map((opt) => (
                        <div
                          key={opt.range}
                          onClick={() => {
                            playClick();
                            setBudgetRange(opt.range);
                          }}
                          className={`p-4 border-2 cursor-pointer ${
                            budgetRange === opt.range ? "border-[#3457FF] bg-[#17191C] text-white" : "border-[#17191C]/20 bg-white"
                          }`}
                        >
                          <div className="font-bold text-sm">{opt.range}</div>
                          <div className="text-[11px] opacity-70 mt-1">{opt.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 10 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold text-[#17191C] mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Vikram Seth"
                        className="w-full p-3 border border-[#17191C]/40 bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#17191C] mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="vikram@example.com"
                        className="w-full p-3 border border-[#17191C]/40 bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#17191C] mb-1">WhatsApp Number (Optional)</label>
                      <input
                        type="text"
                        value={clientWhatsapp}
                        onChange={(e) => setClientWhatsapp(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full p-3 border border-[#17191C]/40 bg-white text-sm"
                      />
                    </div>
                  </div>
                )}

                {currentStep !== 6 && currentStep !== 10 && (
                  <div className="p-6 bg-white border-2 border-[#17191C] space-y-3">
                    <p className="text-sm font-sans text-[#5A606A]">
                      Configuring specifications for <span className="font-bold text-[#17191C]">{blueprintSteps[currentStep - 1]}</span>...
                    </p>
                    <input 
                      type="text"
                      placeholder={`Enter notes or specifics for ${blueprintSteps[currentStep - 1]}...`}
                      className="w-full p-3 border border-[#17191C]/30 text-xs"
                      onChange={(e) => setRefNotes(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* --- STEP 11: FINAL REVIEW & SUBMIT --- */}
            {currentStep === 11 && (
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs text-[#3457FF] font-bold uppercase">11 â€” FINAL SPECIFICATION REVIEW</div>
                  <h2 className="text-3xl font-heading font-black text-[#17191C] uppercase">CONFIRM SYSTEM SPECIFICATIONS</h2>
                </div>

                <div className="bg-white border-2 border-[#17191C] p-6 space-y-4 font-mono text-xs">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-[#5A606A]">Project Classification:</span>
                    <span className="font-bold text-[#17191C]">{projectType}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-[#5A606A]">Business Name:</span>
                    <span className="font-bold text-[#17191C]">{businessName || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-[#5A606A]">Selected Modules:</span>
                    <span className="font-bold text-[#3457FF]">{selectedFeatures.length} Modules</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-[#5A606A]">Investment Range:</span>
                    <span className="font-bold text-[#17191C]">{budgetRange}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-[#5A606A]">Client Contact:</span>
                    <span className="font-bold text-[#17191C]">{clientName} ({clientEmail})</span>
                  </div>
                </div>

                <button
                  onClick={handleFinalSubmission}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#3457FF] text-white font-mono font-bold text-sm uppercase tracking-wider shadow-xl hover:bg-[#3457FF]/90 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "RECORDING SPECIFICATION..." : "SUBMIT SPECIFICATION & GENERATE INVOICE â†’"}
                </button>
              </div>
            )}

            {/* Step Control Buttons */}
            {currentStep < 11 && (
              <div className="flex items-center justify-between pt-6 border-t-2 border-[#17191C]">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 border border-[#17191C] font-mono font-bold text-xs uppercase cursor-pointer ${
                    currentStep === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#17191C] hover:text-white"
                  }`}
                >
                  â† PREVIOUS STEP
                </button>

                <button
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-[#17191C] text-white font-mono font-bold text-xs uppercase hover:bg-[#3457FF] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>NEXT STEP ({currentStep + 1}/11)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* RIGHT: LIVE SYSTEM SUMMARY PANEL */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white border-2 border-[#17191C] p-6 space-y-6 shadow-xl font-mono text-xs">
              <div className="flex justify-between items-center border-b-2 border-[#17191C] pb-3">
                <span className="font-bold text-[#17191C] uppercase">SYSTEM BLUEPRINT</span>
                <span className="text-[#3457FF] font-bold">LIVE SCOPE</span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-[#5A606A] uppercase block">CLASSIFICATION</span>
                  <span className="font-bold text-[#17191C] text-sm">{projectType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5A606A] uppercase block">BRAND / BUSINESS</span>
                  <span className="font-bold text-[#17191C]">{businessName || "Pending Input..."}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5A606A] uppercase block">ACTIVE MODULES</span>
                  <span className="font-bold text-[#3457FF]">{selectedFeatures.length} Enabled</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5A606A] uppercase block">COMMERCIAL POLICY</span>
                  <span className="font-bold text-[#17191C]">50% Advance Required</span>
                </div>
              </div>

              <div className="p-3 bg-[#F4F1EA] border border-[#17191C]/20 text-[11px] text-[#5A606A] space-y-1">
                <div className="font-bold text-[#17191C]">DIRECT STUDIO BLUEPRINT</div>
                <p>Recorded specifications are reviewed directly by BlazeByte's engineering leads.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
