"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSound } from "@/context/sound-context";
import { ServiceOrderConfig } from "./service-order-configs";
import { SITE_CONFIG } from "@/config/studio-data";
import { 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  MessageSquare, 
  Activity, 
  Terminal, 
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Layers,
  Sparkles
} from "lucide-react";

interface ServiceOrderEngineProps {
  config: ServiceOrderConfig;
}

export function ServiceOrderEngine({ config }: ServiceOrderEngineProps) {
  const router = useRouter();
  const { playHover, playClick, playSuccess } = useSound();

  // Screen State: 'hero' | 'configurator' | 'submitted'
  const [screen, setScreen] = useState<"hero" | "configurator" | "submitted">("hero");
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [showEntryTransition, setShowEntryTransition] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Form State
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [clientName, setClientName] = useState<string>("");
  const [clientCompany, setClientCompany] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientWhatsapp, setClientWhatsapp] = useState<string>("");

  // API State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedProjectId, setGeneratedProjectId] = useState<string>("");
  const [generatedInvoiceId, setGeneratedInvoiceId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fast 600ms visual entry transition on initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntryTransition(false);
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 12;
    const y = (clientY / window.innerHeight - 0.5) * 12;
    setMousePos({ x, y });
  };

  const handleOptionSelect = (questionId: string, value: any) => {
    playClick();
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const toggleMultiSelect = (feat: string) => {
    playClick();
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const generateServiceIds = () => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    return {
      projectId: `${config.projectIdPrefix}${rand}`,
      invoiceId: `INV-BB-2026-${rand}`
    };
  };

  const getApiEndpoint = () => {
    switch (config.serviceType) {
      case "MARKETING": return "/api/marketing-order";
      case "AI": return "/api/ai-order";
      case "APPS": return "/api/apps-order";
      default: return "/api/web-order";
    }
  };

  const handleFinalSubmit = async () => {
    playClick();
    setIsSubmitting(true);
    setErrorMessage("");

    const ids = generateServiceIds();
    setGeneratedProjectId(ids.projectId);
    setGeneratedInvoiceId(ids.invoiceId);

    const payload = {
      serviceType: config.serviceType,
      projectId: ids.projectId,
      invoiceId: ids.invoiceId,
      clientName,
      clientCompany,
      email: clientEmail,
      whatsapp: clientWhatsapp,
      answers,
      selectedFeatures,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch(getApiEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        playSuccess();
        setScreen("submitted");
      } else {
        const err = await res.json();
        setErrorMessage(err.error || "Submission failed. Please continue via WhatsApp.");
      }
    } catch {
      setErrorMessage("Network connection error. You can proceed directly to WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppSummary = () => {
    return `*BLAZEBYTE ${config.serviceType} SPECIFICATION*\n` +
      `*Project ID:* ${generatedProjectId || "PENDING"}\n` +
      `*Invoice ID:* ${generatedInvoiceId || "PENDING"}\n` +
      `-----------------------------------\n` +
      `*Client:* ${clientName || "N/A"} (${clientCompany || "N/A"})\n` +
      `*Email:* ${clientEmail || "N/A"}\n` +
      `*Service:* ${config.title}\n` +
      `-----------------------------------\n` +
      `Submitted via blazebyte.store${config.route}`;
  };

  const palette = config.colorPalette;
  const currentQuestion = config.questions[currentStepIdx] || config.questions[0];
  const progressPercent = Math.round(((currentStepIdx + 1) / config.questions.length) * 100);

  return (
    <div 
      style={{ backgroundColor: palette.bg, color: palette.text }}
      className="min-h-screen font-sans relative selection:bg-white/20 select-none"
    >

      {/* 01 — SERVICE-SPECIFIC ENTRY TRANSITION OVERLAY */}
      {showEntryTransition && (
        <div 
          style={{ backgroundColor: palette.bg, color: palette.text }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 font-mono transition-opacity duration-300 pointer-events-none"
        >
          <div className="w-12 h-12 border-2 border-current border-t-transparent animate-spin rounded-full" />
          <div className="text-sm font-bold uppercase tracking-widest">{config.transitionTitle}</div>
          <div className="text-xs opacity-70">{config.transitionSubtitle}</div>
        </div>
      )}

      {/* 02 — HERO ENTRANCE SCREEN */}
      {screen === "hero" && (
        <div onMouseMove={handleMouseMove} className="relative min-h-[92vh] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 border-b-2 overflow-hidden" style={{ borderColor: palette.border }}>
          
          {/* Full-bleed 4K Service Hero Artwork Background with Parallax */}
          <div className="absolute inset-0 z-0 opacity-25 sm:opacity-35 pointer-events-none overflow-hidden">
            <Image 
              src={config.heroImage}
              alt={`${config.title} Studio Environment`}
              fill
              className="object-cover object-center scale-105 transition-transform duration-700 ease-out"
              style={{
                transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.05)`
              }}
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${palette.heroGradient}`} />
          </div>

          {/* Top Technical Badge Marker */}
          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-current/15 font-mono text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-current select-none" style={{ backgroundColor: palette.bg }}>
              <span style={{ color: palette.accent }} className="font-bold">[ → ]</span>
              <span className="font-bold tracking-widest uppercase">{config.badgeText}</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-[11px] opacity-80">
              <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" style={{ color: palette.accent }} /> SERVICE WORLD: {config.serviceType}</span>
              <span>50% ADVANCE POLICY</span>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
            <div className="lg:col-span-8 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider block" style={{ color: palette.accent }}>
                  COMMERCIAL {config.serviceType} STUDIO
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-heading font-black uppercase tracking-tight leading-[0.9]">
                  {config.headline.line1}<br />
                  <span style={{ color: palette.accent }}>{config.headline.line2}</span><br />
                  {config.headline.line3}
                </h1>
              </div>

              <div className="space-y-3 max-w-xl">
                <p className="text-xl sm:text-2xl font-serif italic opacity-90 font-medium">
                  {config.subheading}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => {
                    playClick();
                    setScreen("configurator");
                  }}
                  onMouseEnter={playHover}
                  style={{ backgroundColor: palette.accent, color: "#FFFFFF" }}
                  className="w-full sm:w-auto px-8 py-4 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 rounded-none cursor-pointer shadow-xl flex items-center justify-center gap-3 group"
                >
                  <span>{config.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a 
                  href="#packages"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  style={{ borderColor: palette.border }}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 font-mono font-bold text-xs uppercase tracking-wider hover:opacity-80 transition-all rounded-none cursor-pointer flex items-center justify-center"
                >
                  <span>EXPLORE PACKAGES</span>
                </a>
              </div>

            </div>
          </div>

          {/* Bottom Environmental Strip */}
          <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-current/15 flex flex-wrap justify-between items-center font-mono text-xs opacity-70">
            <div>BLAZEBYTE {config.serviceType} STUDIO</div>
            <div>DIRECT FOUNDER & LEAD ARCHITECTURE</div>
          </div>

        </div>
      )}

      {/* 03 — SERVICE PACKAGES GRID */}
      {screen === "hero" && (
        <section id="packages" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 border-b border-current/15">
          <div className="border-b border-current/15 pb-6 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider block" style={{ color: palette.accent }}>
              APPROVED COMMERCIAL TIERS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight">
              {config.title.toUpperCase()} PACKAGES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.packages.map((pkg, i) => (
              <div 
                key={i}
                style={{ backgroundColor: palette.cardBg, borderColor: pkg.popular ? palette.accent : palette.border }}
                className={`p-6 border-2 flex flex-col justify-between space-y-6 ${pkg.popular ? "shadow-xl" : ""}`}
              >
                <div className="space-y-4">
                  {pkg.popular && (
                    <span style={{ backgroundColor: palette.accent, color: "#FFFFFF" }} className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase inline-block">
                      POPULAR CHOICE
                    </span>
                  )}
                  <h3 className="text-xl font-heading font-black uppercase">{pkg.name}</h3>
                  <div className="text-3xl font-mono font-black" style={{ color: palette.accent }}>{pkg.price}</div>
                  <p className="text-xs opacity-80 leading-relaxed">{pkg.desc}</p>
                  
                  <ul className="space-y-2 text-xs font-mono border-t border-current/10 pt-4">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    playClick();
                    setAnswers(prev => ({ ...prev, selectedPackage: pkg.name }));
                    setScreen("configurator");
                  }}
                  onMouseEnter={playHover}
                  style={{ backgroundColor: palette.accent, color: "#FFFFFF" }}
                  className="w-full py-3 font-mono font-bold text-xs uppercase transition-colors cursor-pointer text-center"
                >
                  SELECT THIS TIER →
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 04 — CONFIGURATOR STEP SCREEN */}
      {screen === "configurator" && (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-mono">
          
          {/* Progress Header */}
          <div className="flex flex-wrap items-center justify-between border-b-2 pb-4 gap-4" style={{ borderColor: palette.border }}>
            <div className="flex items-center gap-3">
              <span className="font-bold px-3 py-1 text-white" style={{ backgroundColor: palette.accent }}>
                STEP {String(currentStepIdx + 1).padStart(2, "0")} / {config.questions.length}
              </span>
              <span className="font-bold text-base uppercase">
                {currentQuestion.title}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span>{config.progressSystemTitle}: {progressPercent}%</span>
              <div className="w-32 h-2 bg-gray-400 border overflow-hidden">
                <div className="h-full transition-all duration-300" style={{ width: `${progressPercent}%`, backgroundColor: palette.accent }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Question Panel */}
            <div className="lg:col-span-8 space-y-6">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: palette.accent }}>
                  {currentQuestion.code} — {currentQuestion.title}
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase mt-1">
                  {currentQuestion.subtitle}
                </h2>
              </div>

              {/* Option Rendering */}
              {currentQuestion.type === "select_card" && currentQuestion.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuestion.options.map(opt => {
                    const isSelected = answers[currentQuestion.id] === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleOptionSelect(currentQuestion.id, opt.id)}
                        onMouseEnter={playHover}
                        style={{
                          backgroundColor: isSelected ? palette.accent : palette.cardBg,
                          color: isSelected ? "#FFFFFF" : palette.text,
                          borderColor: palette.border
                        }}
                        className="p-5 border-2 transition-all cursor-pointer space-y-2"
                      >
                        <div className="font-heading font-bold text-sm uppercase">{opt.label}</div>
                        {opt.desc && <p className="text-xs opacity-80">{opt.desc}</p>}
                      </div>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "multi_select" && currentQuestion.options && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {currentQuestion.options.map(opt => {
                    const isSelected = selectedFeatures.includes(opt.label);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleMultiSelect(opt.label)}
                        style={{
                          backgroundColor: isSelected ? palette.accent : palette.cardBg,
                          color: isSelected ? "#FFFFFF" : palette.text,
                          borderColor: palette.border
                        }}
                        className="p-3 border text-xs cursor-pointer flex items-center justify-between"
                      >
                        <span className="line-clamp-1">{opt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "text_input" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">Company / Business Name *</label>
                    <input 
                      type="text"
                      value={answers.businessName || ""}
                      onChange={e => handleOptionSelect("businessName", e.target.value)}
                      placeholder="e.g. Acme Studio"
                      className="w-full p-3 border text-sm text-[#17191C] bg-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t-2" style={{ borderColor: palette.border }}>
                <button
                  onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}
                  disabled={currentStepIdx === 0}
                  className={`px-6 py-3 border font-bold text-xs uppercase cursor-pointer ${
                    currentStepIdx === 0 ? "opacity-30 cursor-not-allowed" : "hover:opacity-80"
                  }`}
                  style={{ borderColor: palette.border }}
                >
                  ← PREVIOUS
                </button>

                {currentStepIdx < config.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentStepIdx(currentStepIdx + 1)}
                    style={{ backgroundColor: palette.accent, color: "#FFFFFF" }}
                    className="px-8 py-3 font-bold text-xs uppercase cursor-pointer flex items-center gap-2"
                  >
                    <span>NEXT ({currentStepIdx + 2}/{config.questions.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="space-y-4 w-full sm:w-auto">
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        placeholder="Your Full Name *" 
                        value={clientName} 
                        onChange={e => setClientName(e.target.value)}
                        className="w-full p-3 border text-xs text-[#17191C] bg-white"
                      />
                      <input 
                        type="email" 
                        placeholder="Your Email Address *" 
                        value={clientEmail} 
                        onChange={e => setClientEmail(e.target.value)}
                        className="w-full p-3 border text-xs text-[#17191C] bg-white"
                      />
                    </div>
                    <button
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting}
                      style={{ backgroundColor: palette.accent, color: "#FFFFFF" }}
                      className="w-full px-8 py-4 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-xl"
                    >
                      {isSubmitting ? "RECORDING SPECIFICATION..." : `SUBMIT ${config.serviceType} SPECIFICATION →`}
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Sidebar Scope Summary */}
            <div className="lg:col-span-4">
              <div className="p-6 border-2 space-y-4" style={{ backgroundColor: palette.cardBg, borderColor: palette.border }}>
                <div className="font-bold text-xs uppercase pb-2 border-b" style={{ borderColor: palette.border }}>
                  {config.serviceType} LIVE SPECIFICATION
                </div>
                <div className="text-xs space-y-2">
                  <div>Service: <span className="font-bold">{config.title}</span></div>
                  <div>Enabled Modules: <span className="font-bold" style={{ color: palette.accent }}>{selectedFeatures.length} Selected</span></div>
                  <div>Commercial Policy: <span className="font-bold">50% Advance Confirmation</span></div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 05 — SUBMITTED CONFIRMATION SCREEN */}
      {screen === "submitted" && (
        <div className="min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="max-w-2xl w-full border-2 p-8 sm:p-12 space-y-8 text-center" style={{ backgroundColor: palette.cardBg, borderColor: palette.border }}>
            <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto" style={{ borderColor: palette.accent, color: palette.accent }}>
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h1 className="text-3xl font-heading font-black uppercase">
              {config.reviewTitle} RECORDED
            </h1>

            <div className="p-4 bg-black/20 border text-xs font-mono space-y-1" style={{ borderColor: palette.border }}>
              <div>PROJECT ID: <span style={{ color: palette.accent }} className="font-bold">{generatedProjectId}</span></div>
              <div>INVOICE ID: <span className="font-bold">{generatedInvoiceId}</span></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {generatedInvoiceId && (
                <Link href={`/invoice?id=${generatedInvoiceId}`} onClick={playClick}>
                  <button className="px-6 py-3.5 text-white font-mono font-bold text-xs uppercase cursor-pointer" style={{ backgroundColor: palette.accent }}>
                    VIEW OFFICIAL INVOICE →
                  </button>
                </Link>
              )}
              {SITE_CONFIG.contact.whatsapp ? (
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}?text=${encodeURIComponent(getWhatsAppSummary())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playSuccess}
                >
                  <button className="px-6 py-3.5 border font-mono font-bold text-xs uppercase cursor-pointer flex items-center gap-2" style={{ borderColor: palette.border }}>
                    <MessageSquare className="w-4 h-4" />
                    <span>DISPATCH VIA WHATSAPP</span>
                  </button>
                </a>
              ) : (
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}?subject=Project Specification ${generatedProjectId}&body=${encodeURIComponent(getWhatsAppSummary())}`}
                  onClick={playSuccess}
                >
                  <button className="px-6 py-3.5 border font-mono font-bold text-xs uppercase cursor-pointer flex items-center gap-2" style={{ borderColor: palette.border }}>
                    <MessageSquare className="w-4 h-4" />
                    <span>SEND VIA EMAIL</span>
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
