"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CASE_STUDIES, CaseStudy } from "@/config/studio-data";
import { ArrowUpRight, ExternalLink, Globe, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSound } from "@/context/sound-context";

export const AsymmetricPortfolio: React.FC = () => {
  const { playHover } = useSound();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "Web", "Growth", "App"];

  const filteredCaseStudies =
    selectedCategory === "ALL"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === selectedCategory);

  const heroCaseStudy = CASE_STUDIES[0]; // The Catfish Grill
  const remainingCaseStudies = filteredCaseStudies.filter((cs) => cs.id !== heroCaseStudy.id);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0D10] text-[#F4F3EE] relative overflow-hidden border-t border-[#17A20]/20">
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#3457FF]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1B4D3E]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F4F3EE]/15 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B8BDC7]">
              <Sparkles className="w-3.5 h-3.5 text-[#3457FF]" />
              <span>DELIVERED CLIENT BUILDS & CASE STUDIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-black uppercase tracking-tight leading-none text-[#FFFFFF]">
              VISUAL PORTFOLIO
            </h2>
            <p className="text-sm font-mono text-[#B8BDC7] max-w-xl">
              Real platforms, digital acquisition engines, and custom software systems built for high performance.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                onMouseEnter={playHover}
                className={`px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "border-[#F4F3EE] bg-[#F4F3EE] text-[#0B0D10] font-bold"
                    : "border-[#F4F3EE]/20 text-[#B8BDC7] hover:border-[#F4F3EE]/60"
                }`}
              >
                {cat === "ALL" ? "ALL BUILDS" : cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* DOMINANT HERO CASE STUDY: THE CATFISH GRILL */}
        {(selectedCategory === "ALL" || selectedCategory === heroCaseStudy.category) && (
          <div className="group relative bg-[#171A20] border-2 border-[#F4F3EE]/20 hover:border-[#3457FF] transition-all duration-300 p-8 sm:p-12 space-y-8">
            {/* Top Label */}
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-[#F4F3EE]/15 pb-4">
              <span className="px-3 py-1 bg-[#3457FF] text-[#FFFFFF] font-bold uppercase tracking-wider text-[10px]">
                DOMINANT FEATURED BUILD // HOSPITALITY PLATFORM
              </span>
              <span className="text-[#B8BDC7]">{heroCaseStudy.location}</span>
            </div>

            {/* Asymmetric Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column - Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono text-[#3457FF] uppercase tracking-widest block mb-2 font-bold">
                    CLIENT CASE STUDY
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-[#FFFFFF] leading-tight">
                    {heroCaseStudy.title}
                  </h3>
                </div>

                <div className="space-y-4 font-sans text-xs sm:text-sm text-[#B8BDC7] leading-relaxed">
                  <div>
                    <strong className="font-mono uppercase text-[#F4F3EE] text-xs block mb-1">
                      CHALLENGE:
                    </strong>
                    <p>{heroCaseStudy.challenge}</p>
                  </div>

                  <div>
                    <strong className="font-mono uppercase text-[#3457FF] text-xs block mb-1">
                      OUR APPROACH & ARCHITECTURE:
                    </strong>
                    <p>{heroCaseStudy.approach}</p>
                  </div>

                  <div>
                    <strong className="font-mono uppercase text-[#F4F3EE] text-xs block mb-1">
                      DELIVERED RESULT:
                    </strong>
                    <p className="text-[#F4F3EE] font-medium">{heroCaseStudy.result}</p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-2 flex flex-wrap gap-2 font-mono text-[11px]">
                  {heroCaseStudy.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#0B0D10] border border-[#F4F3EE]/20 text-[#F4F3EE]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column - Visual Interface Showcase Container */}
              <div className="lg:col-span-5 relative bg-[#0B0D10] border border-[#F4F3EE]/20 p-6 space-y-6 overflow-hidden">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#B8BDC7] border-b border-[#F4F3EE]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#3457FF]" />
                    <span>thecatfishgrill.com</span>
                  </div>
                  <span className="text-emerald-400 font-bold">● LIVE PLATFORM</span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 bg-[#171A20] border border-[#F4F3EE]/10 space-y-2">
                    <div className="text-[10px] uppercase text-[#3457FF] font-bold">
                      KEY SYSTEM COMPONENTS
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-[#B8BDC7]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3457FF]" />
                        <span>Interactive Gastronomy Menu</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3457FF]" />
                        <span>Instant WhatsApp Booking Flow</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3457FF]" />
                        <span>Sub-Second Mobile Page Load</span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    href="/web/order"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#3457FF] text-[#FFFFFF] font-heading font-bold uppercase tracking-wider text-xs hover:bg-[#2544D9] transition-colors"
                  >
                    <span>CONFIGURE A SIMILAR SYSTEM →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ASYMMETRIC GRID FOR REMAINING REAL CLIENT BUILDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingCaseStudies.map((cs) => (
            <div
              key={cs.id}
              className="group relative bg-[#171A20] border border-[#F4F3EE]/20 hover:border-[#F4F3EE] transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2 py-0.5 border border-[#F4F3EE]/30 text-[#B8BDC7] text-[10px] uppercase font-bold">
                    {cs.category}
                  </span>
                  <span className="text-[#B8BDC7] text-[10px]">{cs.location}</span>
                </div>

                <div>
                  <h4 className="text-2xl font-heading font-black uppercase tracking-tight text-[#FFFFFF] group-hover:text-[#3457FF] transition-colors">
                    {cs.title}
                  </h4>
                </div>

                <p className="text-xs font-sans text-[#B8BDC7] leading-relaxed line-clamp-3">
                  {cs.approach}
                </p>

                <div className="p-3 bg-[#0B0D10] border border-[#F4F3EE]/10 text-[11px] font-mono text-[#F4F3EE]/90">
                  <strong className="text-[#3457FF] block text-[10px] uppercase mb-1">
                    RESULT:
                  </strong>
                  <span>{cs.result}</span>
                </div>
              </div>

              {/* Bottom Tech Pills */}
              <div className="pt-4 border-t border-[#F4F3EE]/10 flex flex-wrap gap-1.5 font-mono text-[10px] text-[#B8BDC7]">
                {cs.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-[#0B0D10] border border-[#F4F3EE]/15">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
