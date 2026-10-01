"use client";

import React from "react";
import Link from "next/link";
import { BLAZEBYTE_TEAM, PROCESS_STAGES, SITE_CONFIG } from "@/config/studio-data";
import { ArrowRight, ShieldCheck, Terminal, Users, Cpu, Layers, Sparkles, Code2 } from "lucide-react";
import { useSound } from "@/context/sound-context";

export const StudioPositioning: React.FC = () => {
  const { playHover } = useSound();

  const pillars = [
    {
      code: "01",
      title: "HUMAN-CRAFTED DIGITAL EXPERIENCE",
      description:
        "Every layout, grid system, and visual decision is designed from first principles. We do not use generic AI templates, purple gradient noise, or stock SaaS components.",
      icon: Terminal,
      accent: "text-[#3457FF]",
      border: "border-[#3457FF]",
    },
    {
      code: "02",
      title: "SUB-SECOND PERFORMANCE ENGINEERING",
      description:
        "Engineered with strict Next.js App Router, TypeScript, and server edge architecture. Optimized for instant load times, clean search indexing, and sub-1s LCP.",
      icon: Code2,
      accent: "text-[#D9531E]",
      border: "border-[#D9531E]",
    },
    {
      code: "03",
      title: "INTENTIONAL BUSINESS AUTOMATION",
      description:
        "We build AI automation pipelines and system integrations that automate repetitive operations, connect fragmented tools, and save hundreds of operational hours.",
      icon: Cpu,
      accent: "text-[#1B4D3E]",
      border: "border-[#1B4D3E]",
    },
    {
      code: "04",
      title: "DIRECT ENGINEERING PARTNERSHIP",
      description:
        "No agency bloat, account managers, or hidden layers. You work directly with senior software engineers, designers, and growth specialists.",
      icon: Users,
      accent: "text-[#2563EB]",
      border: "border-[#2563EB]",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0D10] text-[#F4F3EE] relative overflow-hidden border-t border-[#F4F3EE]/15">
      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        {/* EDITORIAL MANIFESTO HEADER */}
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B8BDC7] px-3.5 py-1.5 border border-[#F4F3EE]/20 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#3457FF]" />
            <span>BLAZEBYTE STUDIO MANIFESTO & PHILOSOPHY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight leading-none text-[#FFFFFF]">
            WE DESIGN. WE ENGINEER. WE GROW. WE AUTOMATE.
          </h2>

          <p className="text-sm sm:text-base font-mono text-[#B8BDC7] leading-relaxed max-w-2xl mx-auto">
            {SITE_CONFIG.positioning}
          </p>
        </div>

        {/* 4 CORE STUDIO PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.code}
                onMouseEnter={playHover}
                className={`group p-8 bg-[#171A20] border-2 transition-all duration-300 flex flex-col justify-between space-y-6 ${pillar.border}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className={`font-bold ${pillar.accent}`}>{pillar.code} // PILLAR</span>
                    <Icon className={`w-5 h-5 ${pillar.accent}`} />
                  </div>

                  <h3 className="text-xl font-heading font-black uppercase tracking-tight text-[#FFFFFF]">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-sans text-[#B8BDC7] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4F3EE]/10 font-mono text-[10px] text-[#B8BDC7]">
                  <span>STANDARD: VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5-STAGE ENGINEERING PROCESS */}
        <div className="space-y-12 border-t border-[#F4F3EE]/15 pt-16">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#3457FF] uppercase tracking-widest block font-bold">
              WORKFLOW METHODOLOGY
            </span>
            <h3 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-[#FFFFFF]">
              OUR 5-STAGE ENGINEERING PROCESS
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#B8BDC7]">
              A disciplined, transparent delivery framework built for speed and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS_STAGES.map((stage) => (
              <div
                key={stage.code}
                onMouseEnter={playHover}
                className="p-6 bg-[#171A20] border border-[#F4F3EE]/20 hover:border-[#3457FF] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-mono text-xs text-[#3457FF] font-bold block">
                    STAGE {stage.code}
                  </span>
                  <h4 className="text-lg font-heading font-black uppercase text-[#FFFFFF]">
                    {stage.name}
                  </h4>
                  <p className="text-xs font-sans text-[#B8BDC7] leading-relaxed">
                    {stage.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F4F3EE]/10 font-mono text-[10px] text-[#F4F3EE]/80">
                  <strong className="text-[#3457FF] block text-[9px]">DELIVERABLE:</strong>
                  <span>{stage.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM ROSTER */}
        <div className="space-y-12 border-t border-[#F4F3EE]/15 pt-16">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#D9531E] uppercase tracking-widest block font-bold">
              STUDIO TEAM
            </span>
            <h3 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-[#FFFFFF]">
              MEET THE ENGINEERS & SPECIALISTS
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#B8BDC7]">
              The core team responsible for designing, building, and operating your digital systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLAZEBYTE_TEAM.map((member) => (
              <div
                key={member.name}
                className="p-6 bg-[#171A20] border border-[#F4F3EE]/20 space-y-3 hover:border-[#F4F3EE] transition-colors"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[#FFFFFF] text-sm">{member.name}</span>
                  <span className="text-[10px] text-[#3457FF] px-2 py-0.5 border border-[#3457FF]/30 font-bold uppercase">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs font-sans text-[#B8BDC7] leading-relaxed">{member.bio}</p>
                <div className="pt-3 border-t border-[#F4F3EE]/10 font-mono text-[10px] text-[#F4F3EE]/70">
                  <strong className="text-[#D9531E] block text-[9px] uppercase">FOCUS:</strong>
                  <span>{member.responsibility}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER TO WEB CONFIGURATOR */}
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#171A20] via-[#161B22] to-[#171A20] border-2 border-[#3457FF] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="font-mono text-xs text-[#3457FF] uppercase tracking-widest font-bold">
              READY TO BUILD YOUR DIGITAL SYSTEM?
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-[#FFFFFF]">
              LAUNCH YOUR WEB PROJECT CONFIGURATOR
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#B8BDC7]">
              Specify your project goals, scope, and estimated timeline in 11 interactive steps.
            </p>
          </div>

          <Link
            href="/web/order"
            className="px-8 py-4 bg-[#3457FF] text-[#FFFFFF] font-heading font-bold uppercase tracking-wider text-sm hover:bg-[#2544D9] transition-colors flex items-center gap-3 shrink-0"
          >
            <span>START A WEB PROJECT →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
