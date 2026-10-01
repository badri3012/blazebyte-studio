"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSound } from "@/context/sound-context";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Compass, 
  FileCode, 
  Rocket, 
  Check, 
  ChevronRight,
  Sparkles,
  Terminal,
  Activity
} from "lucide-react";

interface StageDetail {
  code: string;
  name: string;
  headline: string;
  focus: string;
  description: string;
  deliverables: string[];
  assurance: string;
  technicalArtifacts: string[];
}

const STAGES: StageDetail[] = [
  {
    code: "01",
    name: "DISCOVER",
    headline: "UNDERSTAND BEFORE WE BUILD.",
    focus: "Scope & Strategic Direction",
    description: "We audit your business goals, target audience, competitive space, and technical constraints to establish a bulletproof project foundation with absolute clarity.",
    deliverables: [
      "Technical Specification Blueprint",
      "Scope & Timeline Matrix",
      "User Flow & Intent Architecture",
      "System ROI & Conversion Model"
    ],
    assurance: "Zero vague requirements. Every feature is explicitly linked to a measurable business output.",
    technicalArtifacts: ["REQ-SPEC.v1", "USER-MAP.json", "FEASIBILITY.md"]
  },
  {
    code: "02",
    name: "ARCHITECT",
    headline: "DESIGN THE SYSTEM BEFORE THE SCREEN.",
    focus: "Information Architecture & Technical Blueprint",
    description: "Before writing visual components, we map out content structures, data schemas, API routes, and page routing logic for seamless long-term scalability.",
    deliverables: [
      "System Architecture Sitemap",
      "Database Schema & Entity Models",
      "API & Data Integration Flowchart",
      "Content Matrix & Layout Blueprint"
    ],
    assurance: "Clean separation of concerns, built for sub-second performance and zero architectural technical debt.",
    technicalArtifacts: ["SCHEMA.prisma", "ROUTING-TREE.svg", "API-CONTRACT.yaml"]
  },
  {
    code: "03",
    name: "DESIGN",
    headline: "MAKE THE SYSTEM FEEL RIGHT.",
    focus: "Visual System & Interaction Direction",
    description: "Crafting bespoke high-conversion UI, custom editorial typography, art-directed layouts, and tactile motion that embody your brand identity with precision.",
    deliverables: [
      "Production Design System (Tokens, Grid, Type)",
      "High-Fidelity Interactive Prototypes",
      "Responsive Layout Specifications",
      "Kinetic Motion & Micro-Interaction Guidelines"
    ],
    assurance: "100% custom visual identity with zero generic boilerplate SaaS visual patterns.",
    technicalArtifacts: ["TOKENS.json", "UI-COMPONENTS.fig", "MOTION-SPECS.ts"]
  },
  {
    code: "04",
    name: "ENGINEER",
    headline: "TURN THE DESIGN INTO A WORKING SYSTEM.",
    focus: "Production Build & QA",
    description: "Transforming design specifications into production-grade Next.js, React, TypeScript, and Tailwind code with sub-second page loads and zero-defect QA protocols.",
    deliverables: [
      "Production Next.js / TypeScript Codebase",
      "Performance Optimization Audit (95+ Lighthouse)",
      "Automated Security & Content Hardening",
      "Multi-Device Cross-Browser QA Verification"
    ],
    assurance: "Rigorous type checking, WCAG accessibility compliance, and enterprise security header controls.",
    technicalArtifacts: ["NEXT-APP.tsx", "TAILWIND.config", "LIGHTHOUSE-98.json"]
  },
  {
    code: "05",
    name: "LAUNCH",
    headline: "SHIP IT. THEN KEEP IT HEALTHY.",
    focus: "Production Release & Post-Launch Support",
    description: "Seamless domain deployment, global edge CDN distribution, DNS routing, conversion analytics, and ongoing proactive telemetry to guarantee long-term stability.",
    deliverables: [
      "Global Edge CDN Deployment (Vercel/Cloudflare)",
      "Real-Time Telemetry & Error Tracking Setup",
      "Client Administrative Manual & Handover",
      "Post-Launch Maintenance & SLA Agreement"
    ],
    assurance: "99.9% uptime target, active error monitoring, and dedicated post-launch support channels.",
    technicalArtifacts: ["DNS-VERIFIED.log", "TELEMETRY.dash", "SLA-ACTIVATE.pdf"]
  }
];

const CHECKPOINTS = [
  { code: "01", name: "SCOPE VERIFIED", detail: "Requirements signed off" },
  { code: "02", name: "SYSTEM REVIEWED", detail: "Architecture approved" },
  { code: "03", name: "SECURITY CHECKED", detail: "Headers & SSL hardened" },
  { code: "04", name: "PERFORMANCE TESTED", detail: "Core Web Vitals < 1s" },
  { code: "05", name: "RELEASE APPROVED", detail: "Production deployed" }
];

const REAL_WORK_CASES = [
  {
    client: "The Catfish Grill",
    location: "Hospitality & Dining — Ghana",
    summary: "High-converting culinary platform & real-time WhatsApp table reservation engine.",
    stagesApplied: "01 Discover → 03 UI Design → 04 Custom Engineering",
    link: "/work"
  },
  {
    client: "Andy Foods GH",
    location: "Food & Distribution Network",
    summary: "Structured B2B commercial catalog & digital lead acquisition pipeline.",
    stagesApplied: "02 Architecture → 04 Next.js Build → 05 Cloud Deployment",
    link: "/work"
  },
  {
    client: "Vitagold Kitchen",
    location: "Culinary & Corporate Catering",
    summary: "Artisan editorial showcase with dynamic event catering quote calculator.",
    stagesApplied: "01 Brand Strategy → 03 Editorial Design → 04 High-Speed Web",
    link: "/work"
  },
  {
    client: "SANVI Academy",
    location: "Professional Education Institute",
    summary: "Integrated educational portal & student inquiry automation dashboard.",
    stagesApplied: "02 Data Architecture → 04 Full-Stack Development → 05 QA Approval",
    link: "/work"
  }
];

export default function ProcessPage() {
  const { playHover, playClick } = useSound();
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  const activeStage = STAGES[activeStageIdx];

  return (
    <div className="bg-[#F4F1EA] text-[#17191C] font-sans min-h-screen selection:bg-[#3457FF]/20 selection:text-[#17191C]">
      
      {/* 01 — HERO / EDITORIAL HEADER */}
      <section className="relative pt-12 pb-16 border-b border-[#17191C]/15 overflow-hidden">
        {/* Subtle Architectural Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#17191C 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Top Architectural Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#17191C]/10 text-xs font-mono text-[#5A606A]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3457FF] animate-pulse" />
              <span className="font-bold text-[#17191C] tracking-wider uppercase">THE BLAZEBYTE METHOD</span>
              <span className="text-[#17191C]/30">//</span>
              <span>OPERATING SYSTEM v2.4</span>
            </div>
            <div className="flex items-center gap-6">
              <span>EST. 2026</span>
              <span>PRECISION DIGITAL ENGINEERING</span>
              <span className="hidden md:inline text-[#3457FF] font-semibold">100% PREDICTABLE DELIVERY</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline & Positioning */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17191C] text-[#F4F1EA] text-xs font-mono font-semibold tracking-wider uppercase">
                <Terminal className="w-3.5 h-3.5 text-[#3457FF]" />
                METHODOLOGY & PROTOCOL
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[0.95] text-[#17191C]">
                FROM<br />
                <span className="text-[#3457FF]">THOUGHT</span><br />
                TO SYSTEM.
              </h1>

              <p className="text-base sm:text-xl text-[#5A606A] leading-relaxed max-w-xl font-normal">
                Every BlazeByte project moves through a deliberate sequence of discovery, architecture, design, engineering, and launch. Zero guesswork. Zero superficial templates.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center font-mono text-xs text-[#5A606A]">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#17191C]/5 border border-[#17191C]/10">
                  <Check className="w-3.5 h-3.5 text-[#3457FF]" />
                  <span>STRICT QA PROTOCOLS</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#17191C]/5 border border-[#17191C]/10">
                  <Check className="w-3.5 h-3.5 text-[#3457FF]" />
                  <span>TRANSPARENT DELIVERABLES</span>
                </div>
              </div>
            </div>

            {/* Right Architectural Blueprint Artwork Box */}
            <div className="lg:col-span-5">
              <div className="relative border-2 border-[#17191C] bg-[#17191C] p-2 shadow-2xl shadow-[#17191C]/10">
                
                {/* Blueprint Frame Overlay */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0D14]">
                  <Image 
                    src="/images/architectural-process-blueprint.jpg"
                    alt="BlazeByte Architectural Process Blueprint"
                    fill
                    className="object-cover object-center opacity-90 hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Blueprint Monospace Annotations */}
                  <div className="absolute top-3 left-3 bg-[#17191C]/90 text-[#F4F1EA] px-2 py-1 text-[10px] font-mono border border-[#3457FF]/40 backdrop-blur">
                    SYS_ARCH :: BLUEPRINT_REF_01
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#3457FF] text-white px-2 py-1 text-[10px] font-mono font-bold tracking-wider uppercase">
                    5-STAGE WORKFLOW
                  </div>
                </div>

                {/* Bottom Frame Details */}
                <div className="mt-2 p-3 bg-[#17191C] text-[#F4F1EA] flex justify-between items-center text-[11px] font-mono border-t border-[#F4F1EA]/10">
                  <span className="text-[#A5A5A5]">FIG 1.0 — SYSTEM FLOW</span>
                  <span className="text-[#3457FF] font-semibold">VERIFIED ARCHITECTURE</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02 — CONTINUOUS 5-STAGE BLUEPRINT JOURNEY */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#17191C]/15 pb-6 gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#3457FF] tracking-wider uppercase">STAGE BY STAGE ENGINE</span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#17191C] uppercase tracking-tight">
              THE 5-STAGE ARCHITECTURAL PIPELINE
            </h2>
          </div>
          <p className="text-xs font-mono text-[#5A606A] max-w-sm">
            Click or hover any stage below to inspect its detailed specifications, deliverables, and quality assurances.
          </p>
        </div>

        {/* STAGE SELECTOR RAIL (Continuous Blueprint Line) */}
        <div className="relative">
          {/* Horizontal Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-[#17191C]/15 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
            {STAGES.map((stg, idx) => {
              const isActive = activeStageIdx === idx;
              return (
                <button
                  key={stg.code}
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setActiveStageIdx(idx);
                  }}
                  className={`p-5 text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${
                    isActive
                      ? "bg-[#17191C] text-[#F4F1EA] border-[#17191C] shadow-xl scale-[1.02]"
                      : "bg-[#F4F1EA] text-[#17191C] border-[#17191C]/20 hover:border-[#3457FF] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-mono font-black ${isActive ? "text-[#3457FF]" : "text-[#5A606A]"}`}>
                      {stg.code}
                    </span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#3457FF] animate-ping" />
                    ) : (
                      <span className="text-[10px] font-mono text-[#5A606A]">STAGE</span>
                    )}
                  </div>

                  <div>
                    <div className="font-heading font-black text-lg tracking-tight uppercase">
                      {stg.name}
                    </div>
                    <div className={`text-xs font-mono mt-1 ${isActive ? "text-[#A5A5A5]" : "text-[#5A606A]"}`}>
                      {stg.focus}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#17191C]/10 flex items-center justify-between text-[11px] font-mono">
                    <span className={isActive ? "text-[#3457FF]" : "text-[#5A606A]"}>
                      {isActive ? "ACTIVE STAGE" : "VIEW SPECS"}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-[#3457FF]" : "text-[#17191C]/40"}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE STAGE DEEP-DIVE BLUEPRINT PANEL */}
        <div className="bg-white border-2 border-[#17191C] p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Blueprint Accent Top Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#17191C]/10 pb-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl font-mono font-black text-[#3457FF]">
                {activeStage.code}
              </span>
              <div>
                <span className="text-xs font-mono text-[#5A606A] uppercase tracking-wider">SELECTED STAGE DEEP-DIVE</span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#17191C] uppercase tracking-tight">
                  {activeStage.name} — {activeStage.focus}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs bg-[#17191C] text-[#F4F1EA] px-4 py-2 border border-[#17191C]">
              <Activity className="w-4 h-4 text-[#3457FF]" />
              <span>CHECKPOINT STATUS: VERIFIED</span>
            </div>
          </div>

          {/* Stage Headline & Main Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xl sm:text-2xl font-heading font-black text-[#17191C] tracking-tight">
                "{activeStage.headline}"
              </h4>

              <p className="text-base sm:text-lg text-[#5A606A] leading-relaxed">
                {activeStage.description}
              </p>

              {/* Quality Assurance Highlight Box */}
              <div className="p-5 bg-[#F4F1EA] border-l-4 border-[#3457FF] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#3457FF]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>STAGE QUALITY ASSURANCE PROTOCOL</span>
                </div>
                <p className="text-sm font-heading font-bold text-[#17191C]">
                  {activeStage.assurance}
                </p>
              </div>
            </div>

            {/* Stage Deliverables List */}
            <div className="lg:col-span-5 bg-[#17191C] text-[#F4F1EA] p-6 space-y-6 border border-[#17191C]">
              <div className="flex items-center justify-between border-b border-[#F4F1EA]/15 pb-3">
                <span className="text-xs font-mono text-[#3457FF] font-bold uppercase tracking-wider">
                  STAGE DELIVERABLES MATRIX
                </span>
                <span className="text-[10px] font-mono text-[#A5A5A5]">4 ITEMS</span>
              </div>

              <ul className="space-y-3 font-sans text-sm">
                {activeStage.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#F4F1EA]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#3457FF] shrink-0 mt-0.5" />
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technical Code Artifact Badges */}
              <div className="pt-4 border-t border-[#F4F1EA]/10 space-y-2">
                <span className="text-[10px] font-mono text-[#A5A5A5] block uppercase">GENERATED ARTIFACTS:</span>
                <div className="flex flex-wrap gap-2">
                  {activeStage.technicalArtifacts.map((art, i) => (
                    <span key={i} className="px-2 py-1 bg-[#F4F1EA]/10 text-[#F4F1EA] text-[11px] font-mono border border-[#F4F1EA]/15">
                      {art}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 03 — METADATA RAIL & QUALITY CHECKPOINT PROTOCOLS */}
      <section className="bg-[#17191C] text-[#F4F1EA] py-16 border-y border-[#17191C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F4F1EA]/15 pb-6 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#3457FF] tracking-wider uppercase">QUALITY CONTROL SYSTEM</span>
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#F4F1EA] uppercase tracking-tight">
                THE 5-POINT QUALITY CHECKPOINT PROTOCOL
              </h2>
            </div>
            <div className="text-xs font-mono text-[#A5A5A5]">
              CURRENT ACTIVE STAGE: <span className="text-[#3457FF] font-bold">{activeStage.code} / 05 {activeStage.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CHECKPOINTS.map((chk, i) => {
              const isDoneOrActive = i <= activeStageIdx;
              return (
                <div 
                  key={chk.code}
                  className={`p-5 border transition-all ${
                    isDoneOrActive 
                      ? "bg-[#17191C] border-[#3457FF] text-[#F4F1EA]" 
                      : "bg-[#17191C]/50 border-[#F4F1EA]/10 text-[#A5A5A5]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#3457FF]">CHECKPOINT {chk.code}</span>
                    {isDoneOrActive ? (
                      <CheckCircle2 className="w-4 h-4 text-[#3457FF]" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-[#F4F1EA]/20" />
                    )}
                  </div>
                  <div className="font-heading font-extrabold text-sm text-[#F4F1EA] uppercase mb-1">
                    {chk.name}
                  </div>
                  <div className="text-xs font-mono text-[#A5A5A5]">
                    {chk.detail}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 04 — REAL WORK CONNECTION ("HOW THE METHOD BECOMES REAL") */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="border-b border-[#17191C]/15 pb-6 space-y-2">
          <span className="text-xs font-mono font-bold text-[#3457FF] tracking-wider uppercase">PROOF OF OPERATIONAL METHODOLOGY</span>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#17191C] uppercase tracking-tight">
            HOW THE METHOD BECOMES REAL
          </h2>
          <p className="text-sm text-[#5A606A] max-w-2xl font-normal">
            Every production system delivered by BlazeByte follows this exact 5-stage architectural pipeline. Inspect our delivered client builds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REAL_WORK_CASES.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border-2 border-[#17191C] p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-[#17191C]/10 pb-4">
                  <div>
                    <h3 className="text-xl font-heading font-black text-[#17191C] uppercase">
                      {item.client}
                    </h3>
                    <p className="text-xs font-mono text-[#5A606A] mt-0.5">
                      {item.location}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-[#17191C] text-[#F4F1EA] text-[10px] font-mono font-bold uppercase">
                    PROD RELEASED
                  </span>
                </div>

                <p className="text-sm text-[#5A606A] leading-relaxed">
                  {item.summary}
                </p>

                <div className="p-3 bg-[#F4F1EA] border border-[#17191C]/10 space-y-1">
                  <span className="text-[10px] font-mono text-[#3457FF] font-bold block uppercase">
                    APPLIED METHODOLOGY PATH
                  </span>
                  <span className="text-xs font-mono font-bold text-[#17191C]">
                    {item.stagesApplied}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#17191C]/10">
                <Link 
                  href={item.link} 
                  onMouseEnter={playHover} 
                  onClick={playClick}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#17191C] hover:text-[#3457FF] transition-colors"
                >
                  <span>INSPECT CASE STUDY DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 05 — FINAL EDITORIAL CONVERSION CTA */}
      <section className="bg-[#17191C] text-[#F4F1EA] py-20 border-t-2 border-[#17191C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3457FF] text-white text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>START STAGE 01 :: DISCOVERY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-[#F4F1EA] uppercase">
            READY TO BUILD IT PROPERLY?
          </h2>

          <p className="text-base sm:text-xl text-[#A5A5A5] max-w-2xl mx-auto leading-relaxed font-normal">
            Start with a clear problem. We'll turn it into a structured, high-performance digital system using The BlazeByte Method.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/web/order" 
              onMouseEnter={playHover} 
              onClick={playClick}
              className="w-full sm:w-auto px-8 py-4 bg-[#3457FF] hover:bg-[#3457FF]/90 text-white font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
            >
              <span>START A PROJECT →</span>
            </Link>

            <Link 
              href="/work" 
              onMouseEnter={playHover} 
              onClick={playClick}
              className="w-full sm:w-auto px-8 py-4 bg-[#F4F1EA] hover:bg-white text-[#17191C] font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 border border-[#F4F1EA] flex items-center justify-center gap-2"
            >
              <span>EXPLORE OUR WORK</span>
            </Link>
          </div>

          <div className="pt-8 text-xs font-mono text-[#A5A5A5] flex flex-wrap justify-center gap-6">
            <span>ZERO UNVERIFIED ASSUMPTIONS</span>
            <span>•</span>
            <span>DIRECT FOUNDER ARCHITECTURE</span>
            <span>•</span>
            <span>SUB-SECOND TARGETS</span>
          </div>

        </div>
      </section>

    </div>
  );
}
