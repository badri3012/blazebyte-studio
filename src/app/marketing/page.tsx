"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MARKETING_SERVICE_CONFIG, CASE_STUDIES } from "@/config/studio-data";
import { WorldLoader } from "@/components/ui/world-loaders";
import { useSound } from "@/context/sound-context";
import { useServiceTransition } from "@/context/service-transition-context";
import {
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Target,
  Search,
  Megaphone,
  BarChart3,
  Layers,
} from "lucide-react";

// --------------------------------------------------------------------------
// SIGNATURE ANIME PAPER ROCKET COMPONENT (ELECTRIC CORAL INK TRAIL)
// --------------------------------------------------------------------------
const AnimePaperRocket: React.FC<{ isLaunching: boolean }> = ({ isLaunching }) => (
  <div className="relative inline-flex items-center">
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={
        isLaunching
          ? {
              x: [0, 60, 450],
              y: [0, -60, -450],
              scale: [1, 1.3, 0.4],
              opacity: [1, 1, 0],
            }
          : { y: [0, -3, 0], rotate: [0, -3, 0] }
      }
      transition={
        isLaunching
          ? { duration: 0.75, ease: "easeOut" }
          : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
      }
      className="text-[#FF5C68] drop-shadow-[0_0_12px_rgba(255,92,104,0.8)] cursor-pointer"
    >
      <path d="M4.5 16.5L21.5 3L13.5 21L10.5 13.5L3 10.5L4.5 16.5Z" fill="#FF5C68" fillOpacity="0.25" />
      <path d="M10.5 13.5L21.5 3" />
      <path d="M16 11.5L8.5 19" strokeDasharray="2 2" />
    </motion.svg>
    {isLaunching && (
      <motion.svg
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.7 }}
      >
        <path
          d="M 12 12 Q 100 -50, 350 -280"
          fill="none"
          stroke="#FF5C68"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
      </motion.svg>
    )}
  </div>
);

export default function MarketingServicePage() {
  const router = useRouter();
  const { playHover, playClick } = useSound();
  const { triggerTransition } = useServiceTransition();
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);

  const handleRocketClick = (targetRoute: string) => {
    setIsRocketLaunching(true);
    playClick();
    setTimeout(() => {
      triggerTransition("growth", targetRoute);
    }, 700);
  };

  const storyStages = [
    {
      code: "01",
      title: "POSITION",
      headline: "Know the Market. Define the Voice.",
      description: "Deep competitor intelligence and strategic brand positioning before spending a single rupee on ads.",
      icon: Target,
      image: "/images/indigo-anime-marketing-strategy.jpg",
    },
    {
      code: "02",
      title: "DISCOVER",
      headline: "Be Found by High-Intent Buyers",
      description: "Organic search dominance, local SEO, and intent-mapped Google Search visibility.",
      icon: Search,
      image: "/images/anime-growth-discovery.jpg",
    },
    {
      code: "03",
      title: "ATTRACT",
      headline: "Turn Visibility into High-Velocity Traffic",
      description: "Targeted ad creative across Google & Meta networks engineered for immediate response.",
      icon: Megaphone,
      image: "/images/indigo-anime-marketing-acquisition.jpg",
    },
    {
      code: "04",
      title: "CONVERT",
      headline: "Make Interest Move into Enquiries",
      description: "Conversion rate optimization (CRO), sub-second landing speed, and direct WhatsApp lead flows.",
      icon: BarChart3,
      image: "/images/marketing-hero.jpg",
    },
    {
      code: "05",
      title: "GROW",
      headline: "Scale the Revenue Engine Predictably",
      description: "Attribution analytics, pipeline tracking, and continuous campaign optimization cycles.",
      icon: Layers,
      image: "/images/indigo-anime-marketing-hero.jpg",
    },
  ];

  const chapters = [
    {
      id: "strategy",
      code: "01 / STRATEGY",
      headline: "KNOW WHO YOU'RE BUILDING FOR.",
      description: "Audience persona mapping, market positioning, and high-converting message architecture.",
      image: "/images/indigo-anime-marketing-strategy.jpg",
      specs: ["Audience Intelligence", "Competitor Audit", "Value Proposition", "Brand Voice Sheet"],
    },
    {
      id: "discovery",
      code: "02 / DISCOVERY",
      headline: "BE FOUND BY THE RIGHT PEOPLE.",
      description: "Technical SEO, Google Business authority, and high-intent local search dominance.",
      image: "/images/anime-growth-discovery.jpg",
      specs: ["Local SEO Blueprint", "Schema Metadata", "Google Business Profile", "High-Intent Keywords"],
    },
    {
      id: "acquisition",
      code: "03 / ACQUISITION",
      headline: "TURN ATTENTION INTO ACTION.",
      description: "High-impact paid search and Meta ad campaigns designed for direct response and commercial inquiry intake.",
      image: "/images/indigo-anime-marketing-acquisition.jpg",
      specs: ["Google Search Ads", "Meta Campaign Funnels", "Landing Page CRO", "Ad Copy Architecture"],
    },
    {
      id: "conversion",
      code: "04 / CONVERSION",
      headline: "MAKE INTEREST MOVE.",
      description: "Lead attribution, CRM pipeline integration, and automated WhatsApp inquiry routing.",
      image: "/images/marketing-hero.jpg",
      specs: ["WhatsApp Automation", "Lead Qualification", "Conversion Telemetry", "Monthly ROI Reports"],
    },
  ];

  const packageIllustrations = {
    "mkt-foundation": "/images/indigo-anime-marketing-strategy.jpg",
    "mkt-growth": "/images/indigo-anime-marketing-hero.jpg",
    "mkt-performance": "/images/indigo-anime-marketing-acquisition.jpg",
    "mkt-scale": "/images/anime-growth-discovery.jpg",
  };

  return (
    <div className="bg-[#17172B] text-[#F6F1E8] min-h-screen space-y-24 pb-24 font-sans selection:bg-[#FF5C68] selection:text-[#F6F1E8] relative overflow-hidden">
      {/* 01 — WORLD LOADER */}
      <WorldLoader world="marketing" />

      {/* 02 — HERO SECTION (MIDNIGHT INDIGO + ELECTRIC CORAL + WARM IVORY) */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-b-2 border-[#242044] bg-gradient-to-b from-[#101014] via-[#17172B] to-[#17172B]">
        {/* Background Haze Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <img
            src="/images/indigo-anime-marketing-hero.jpg"
            alt="Indigo Anime Studio Background"
            className="w-full h-full object-cover filter blur-sm contrast-125"
          />
        </div>

        {/* Ambient Coral Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[480px] bg-[#FF5C68]/15 blur-[150px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Top Editorial Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-[#242044] pb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#242044] text-[#F6F1E8] border border-[#FF5C68] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9B54]" />
              <span>BLAZEBYTE / GROWTH STUDIO // MIDNIGHT INDIGO EXPERIENCE</span>
            </div>
            <span className="text-[#FF9B54] font-bold">TOKYO / CAMPAIGN NIGHT • SCENE 01</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#FF5C68] uppercase tracking-widest block font-extrabold">
                  THE GROWTH CAMPAIGN
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black tracking-tight text-[#F6F1E8] uppercase leading-[0.88] drop-shadow-md">
                  WE BUILD <br />
                  <span className="text-[#FF5C68]">DEMAND.</span>
                </h1>
              </div>

              <div className="border-l-4 border-[#FF5C68] pl-6 space-y-2 font-mono text-sm sm:text-base text-[#F6F1E8]/90 leading-relaxed max-w-xl">
                <p>
                  Digital marketing systems designed to turn attention into qualified enquiries, customers and measurable business growth.
                </p>
              </div>

              {/* CTAs with Signature Paper Rocket Interaction */}
              <div className="flex flex-wrap items-center gap-6 pt-4 font-mono text-xs">
                <button
                  onClick={() => handleRocketClick("/marketing/order")}
                  onMouseEnter={playHover}
                  className="px-8 py-4 bg-[#FF5C68] text-[#F6F1E8] font-heading font-bold text-sm uppercase hover:bg-[#F6F1E8] hover:text-[#17172B] transition-all cursor-pointer flex items-center gap-3 shadow-[0_10px_30px_rgba(255,92,104,0.4)] border border-[#FF9B54]/40"
                >
                  <span>BUILD MY GROWTH SYSTEM</span>
                  <AnimePaperRocket isLaunching={isRocketLaunching} />
                </button>

                <a
                  href="#story"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="px-6 py-4 bg-transparent border border-[#242044] text-[#F6F1E8] font-mono text-xs font-bold hover:border-[#FF5C68] hover:text-[#FF9B54] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>EXPLORE OUR APPROACH ↓</span>
                </a>
              </div>
            </div>

            {/* Right Column: High-Resolution Indigo Anime Hero Scene */}
            <div className="lg:col-span-5 relative group">
              <div className="relative border-2 border-[#FF5C68] bg-[#101014] p-2 shadow-[12px_12px_0px_#242044] overflow-hidden">
                <motion.img
                  src="/images/indigo-anime-marketing-hero.jpg"
                  alt="Creative Strategy Studio at Night Indigo Anime Scene"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-auto object-cover border border-[#242044]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17172B]/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Editorial Metadata */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#101014]/90 border border-[#FF5C68]/60 p-3 font-mono text-[10px] text-[#F6F1E8] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF5C68] animate-ping" />
                    <span className="font-bold">TOKYO / CAMPAIGN NIGHT • INDIGO FRAME 01</span>
                  </div>
                  <span className="text-[#FF9B54]">MAIN STRATEGIST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — EDITORIAL SCENE BREAK TRANSITION */}
      <section className="py-12 bg-[#101014] border-y border-[#242044] font-mono text-center space-y-2">
        <span className="text-[10px] uppercase text-[#FF5C68] tracking-widest font-bold">
          SCENE BREAK // PRINCIPLE OF GROWTH
        </span>
        <h3 className="text-2xl sm:text-4xl font-heading font-black uppercase text-[#F6F1E8]">
          ATTENTION IS EASY. <span className="text-[#FF5C68]">RELEVANCE IS VALUABLE.</span>
        </h3>
      </section>

      {/* 04 — SCENE 02 / STRATEGY ROOM & 5-STAGE STORY FLYWHEEL */}
      <section id="story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-[#242044] pb-6 space-y-3">
          <span className="font-mono text-xs text-[#FF5C68] uppercase tracking-widest block font-bold">
            SCENE 02 // STRATEGIC NARRATIVE
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#F6F1E8] uppercase tracking-tight">
            THE CAMPAIGN STARTS WITH A QUESTION.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#F6F1E8]/80 max-w-xl">
            A 5-stage strategic flywheel that transforms attention into commercial revenue.
          </p>
        </div>

        {/* Dynamic Display of Active Stage Anime Scene */}
        <div className="relative border-2 border-[#FF5C68] bg-[#101014] p-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs text-[#FF5C68] font-bold block">
              STAGE {storyStages[activeStage].code} // {storyStages[activeStage].title}
            </span>
            <h3 className="text-3xl font-heading font-black uppercase text-[#F6F1E8]">
              {storyStages[activeStage].headline}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#F6F1E8]/85 leading-relaxed">
              {storyStages[activeStage].description}
            </p>
          </div>

          <div className="lg:col-span-5 relative overflow-hidden border border-[#242044] h-64">
            <AnimatePresence mode="wait">
              <motion.img
                key={storyStages[activeStage].code}
                src={storyStages[activeStage].image}
                alt={storyStages[activeStage].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-3 left-3 bg-[#101014]/90 text-[#F6F1E8] text-[9px] font-mono px-2 py-1 border border-[#FF5C68]">
              ANIME SCENE {storyStages[activeStage].code}
            </div>
          </div>
        </div>

        {/* 5-Stage Selection Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {storyStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStage === idx;

            return (
              <div
                key={stage.code}
                onMouseEnter={() => {
                  setActiveStage(idx);
                  playHover();
                }}
                className={`p-5 border-2 transition-all duration-300 space-y-3 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-[#242044] border-[#FF5C68] shadow-xl scale-[1.02]"
                    : "bg-[#101014]/80 border-[#242044] hover:border-[#FF5C68]"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[#FF5C68]">{stage.code}</span>
                  <Icon className="w-4 h-4 text-[#FF9B54]" />
                </div>
                <h4 className="text-sm font-heading font-black uppercase text-[#F6F1E8]">
                  {stage.title}
                </h4>
                <p className="text-[11px] font-sans text-[#F6F1E8]/70 line-clamp-2">
                  {stage.headline}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 05 — 4 CINEMATIC SERVICE CHAPTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-mono text-xs text-[#FF5C68] uppercase tracking-widest block font-bold">
            SCENE 03 & 04 // SERVICE CHAPTERS
          </span>
          <h2 className="text-4xl sm:text-6xl font-heading font-black text-[#F6F1E8] uppercase tracking-tight">
            ENGINEERED GROWTH CHAPTERS
          </h2>
        </div>

        <div className="space-y-16">
          {chapters.map((ch, idx) => (
            <div
              key={ch.id}
              className={`p-8 sm:p-12 border-2 border-[#242044] bg-[#101014] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Frame */}
              <div className="lg:col-span-6 relative group overflow-hidden border border-[#FF5C68]">
                <img
                  src={ch.image}
                  alt={ch.headline}
                  className="w-full h-80 object-cover filter contrast-[1.05] group-hover:scale-1.05 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17172B]/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 font-mono text-[10px] bg-[#17172B] text-[#F6F1E8] px-2.5 py-1 border border-[#FF5C68] font-bold">
                  {ch.code}
                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-xs text-[#FF5C68] uppercase tracking-widest font-bold block">
                  CHAPTER {ch.code}
                </span>

                <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase text-[#F6F1E8] leading-tight">
                  {ch.headline}
                </h3>

                <p className="text-xs sm:text-sm font-sans text-[#F6F1E8]/85 leading-relaxed">
                  {ch.description}
                </p>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-2">
                  {ch.specs.map((spec) => (
                    <div
                      key={spec}
                      className="p-2 bg-[#242044] border border-[#242044] text-[#F6F1E8]/90 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5C68]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => handleRocketClick("/marketing/order")}
                    onMouseEnter={playHover}
                    className="px-6 py-3 bg-[#FF5C68] text-[#F6F1E8] font-mono text-xs font-bold uppercase hover:bg-[#F6F1E8] hover:text-[#17172B] transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>DEPLOY THIS CHAPTER →</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06 — DIGITAL MARKETING PACKAGES (WARM IVORY DOSSIERS WITH ELECTRIC CORAL ACCENTS) */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs text-[#FF5C68] uppercase tracking-widest block font-bold">
            CAMPAIGN DOSSIERS & PACKAGES
          </span>
          <h2 className="text-4xl font-heading font-black text-[#F6F1E8] uppercase">
            DIGITAL MARKETING TIERS
          </h2>
          <p className="text-xs font-mono text-[#F6F1E8]/80">
            Defined acquisition scopes with transparent pricing and verified deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MARKETING_SERVICE_CONFIG.packages.map((pkg) => {
            const isHovered = hoveredPackage === pkg.id;
            const animeFragment = packageIllustrations[pkg.id as keyof typeof packageIllustrations] || packageIllustrations["mkt-foundation"];

            return (
              <div
                key={pkg.id}
                onMouseEnter={() => {
                  setHoveredPackage(pkg.id);
                  playHover();
                }}
                onMouseLeave={() => setHoveredPackage(null)}
                className={`group relative p-7 rounded-none border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[460px] bg-[#F6F1E8] text-[#101014] ${
                  isHovered
                    ? "border-[#FF5C68] shadow-[0_20px_40px_rgba(255,92,104,0.3)] scale-[1.02]"
                    : "border-[#101014]/30 hover:border-[#101014]"
                }`}
              >
                {/* Anime Artwork Fragment Header */}
                <div className="relative h-28 -mx-7 -mt-7 mb-4 overflow-hidden bg-[#101014]">
                  <img
                    src={animeFragment}
                    alt={pkg.name}
                    className="w-full h-full object-cover filter contrast-125 opacity-90 group-hover:scale-1.08 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F6F1E8] via-transparent to-transparent" />
                  <div className="absolute top-2 right-2 bg-[#FF5C68] text-[#F6F1E8] font-mono text-[9px] px-2 py-0.5 font-bold">
                    DOSSIER // {pkg.name.split(" ")[0]}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#101014]/60 block">
                      {pkg.priceDetails}
                    </span>
                    <h3 className="text-3xl font-heading font-black text-[#101014]">
                      {pkg.price}
                    </h3>
                  </div>

                  <p className="text-xs font-sans text-[#101014]/80 leading-relaxed border-t border-[#101014]/15 pt-3">
                    {pkg.forWho}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-1.5 font-mono text-[10px] text-[#101014]/90 pt-1">
                    {pkg.features.slice(0, 4).map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5C68] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#101014]/20 font-mono">
                  <button
                    onClick={() => handleRocketClick("/marketing/order")}
                    className="w-full py-3 bg-[#101014] text-[#F6F1E8] font-bold text-xs uppercase hover:bg-[#FF5C68] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 07 — CASE STUDIES: REAL CLIENT BUILDS + ANIME EDITORIAL FRAMING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-[#242044] pb-6 space-y-3">
          <span className="font-mono text-xs text-[#FF5C68] uppercase tracking-widest block font-bold">
            VERIFIED PROOF & PORTFOLIO
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#F6F1E8] uppercase tracking-tight">
            CAMPAIGNS IN MOTION.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#F6F1E8]/80 max-w-xl">
            Real client platforms, organic search rankings, and verified acquisition funnels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.filter((s) => s.category === "Growth" || s.id === "andy-foods-gh" || s.id === "je-me-regale").map((study) => (
            <div
              key={study.id}
              className="bg-[#101014] border-2 border-[#242044] p-6 space-y-6 hover:border-[#FF5C68] transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2 py-0.5 bg-[#FF5C68] text-[#F6F1E8] font-bold text-[10px] uppercase">
                  REAL WORK PROOF
                </span>
                <span className="text-[#FF9B54] text-[10px] font-bold">{study.location}</span>
              </div>

              <div>
                <h3 className="text-2xl font-heading font-black uppercase text-[#F6F1E8]">
                  {study.title}
                </h3>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#F6F1E8]/85">
                <div className="p-3 bg-[#17172B] border border-[#242044] space-y-1">
                  <strong className="text-[#FF5C68] text-[10px] uppercase block">OBJECTIVE:</strong>
                  <p className="font-sans text-[11px]">{study.challenge}</p>
                </div>

                <div className="p-3 bg-[#17172B] border border-[#242044] space-y-1">
                  <strong className="text-[#FF9B54] text-[10px] uppercase block">VERIFIED RESULT:</strong>
                  <p className="font-sans text-[11px] font-bold text-[#F6F1E8]">{study.result}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#242044] flex flex-wrap gap-1.5 font-mono text-[10px] text-[#F6F1E8]/70">
                {study.techStack.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-[#17172B] border border-[#242044]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 08 — SCENE 05 / FINAL CTA: CREATIVE STRATEGIST IN STUDIO AT NIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative border-2 border-[#FF5C68] bg-[#101014] p-8 lg:p-14 overflow-hidden shadow-[0_20px_60px_rgba(255,92,104,0.3)]">
          {/* Background Anime Scene Layer */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <img
              src="/images/indigo-anime-marketing-hero.jpg"
              alt="Final Indigo Anime Studio CTA Scene"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101014] via-[#101014]/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="font-mono text-xs text-[#FF5C68] uppercase tracking-widest font-bold block">
              SCENE 05 // FINAL STRATEGY CALL
            </span>
            <h2 className="text-4xl sm:text-6xl font-heading font-black text-[#F6F1E8] uppercase leading-none">
              READY TO <br />
              <span className="text-[#FF5C68]">BUILD DEMAND?</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#F6F1E8]/80">
              Transform your business with a high-velocity digital marketing and lead acquisition engine.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleRocketClick("/marketing/order")}
                onMouseEnter={playHover}
                className="px-8 py-4 bg-[#FF5C68] text-[#F6F1E8] font-heading font-bold text-sm uppercase hover:bg-[#F6F1E8] hover:text-[#17172B] transition-all cursor-pointer flex items-center gap-3 shadow-2xl border border-[#FF9B54]/50"
              >
                <span>BUILD MY GROWTH SYSTEM →</span>
                <AnimePaperRocket isLaunching={isRocketLaunching} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
