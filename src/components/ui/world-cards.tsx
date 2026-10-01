"use client";

import React from "react";
import Link from "next/link";
import { useSound } from "@/context/sound-context";
import { PackageItem } from "@/config/studio-data";
import { WorldButton } from "@/components/ui/world-buttons";
import { Check, ArrowRight, TrendingUp, Cpu, Terminal, ArrowUpRight } from "lucide-react";

interface PackageCardProps {
  world: "web" | "marketing" | "ai" | "apps";
  pkg: PackageItem;
}

export const WorldPackageCard: React.FC<PackageCardProps> = ({ world, pkg }) => {
  const { playHover, playClick } = useSound();

  // WORLD 01 — WEB CARD (Editorial Architectural Panel)
  if (world === "web") {
    return (
      <div
        onMouseEnter={playHover}
        className={`group relative bg-[#F4F1EA] text-[#17191C] border border-[#17191C]/30 p-8 flex flex-col justify-between transition-all duration-300 rounded-none overflow-hidden ${
          pkg.popular ? "border-[#3457FF] border-2 shadow-xl" : "hover:border-[#3457FF]"
        }`}
      >
        {/* Cobalt Travel Line on Hover */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#3457FF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono text-xs tracking-wider text-[#17191C]/70">
            <span>WEB / {pkg.id.toUpperCase().replace("WEB-", "")}</span>
            {pkg.popular && <span className="px-2 py-0.5 bg-[#3457FF] text-[#F4F1EA] font-bold">RECOMMENDED</span>}
          </div>

          <div>
            <h3 className="text-3xl font-heading font-extrabold tracking-tight text-[#17191C] uppercase">
              {pkg.name}
            </h3>
            <div className="text-4xl font-heading font-extrabold text-[#3457FF] mt-2">
              {pkg.price}
            </div>
            <p className="text-xs font-mono text-[#17191C]/80 mt-2 border-t border-[#17191C]/20 pt-3">
              {pkg.forWho}
            </p>
          </div>

          <div className="border-t border-[#17191C]/20 pt-4 space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7257FF]">
              SPECIFICATION SHEET:
            </div>
            <ul className="space-y-2 text-xs font-sans">
              {pkg.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#3457FF] font-bold">—</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#17191C]/20 mt-6">
          <Link href={`/contact?service=web&package=${pkg.id}`} onClick={playClick} className="block">
            <WorldButton world="web" size="md" className="w-full">
              {pkg.ctaText}
            </WorldButton>
          </Link>
        </div>
      </div>
    );
  }

  // WORLD 02 — MARKETING CARD (Data-Panel Intelligence Dashboard)
  if (world === "marketing") {
    return (
      <div
        onMouseEnter={playHover}
        className={`group relative bg-[#0C2238] border border-[#24D6C5]/30 p-6 rounded-lg flex flex-col justify-between transition-all duration-300 text-[#F2F7F7] bg-marketing-grid ${
          pkg.popular ? "border-[#24D6C5] shadow-[0_0_30px_rgba(36,214,197,0.2)] glow-aqua" : "hover:border-[#8AF7EF]"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#24D6C5]">
            <span>GROWTH / {pkg.id.toUpperCase().replace("MKT-", "")}</span>
            <span className="flex items-center gap-1 font-bold">
              <TrendingUp className="w-3.5 h-3.5" /> SIGNAL LIVE
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-heading font-extrabold text-[#F2F7F7]">{pkg.name}</h3>
            <div className="text-3xl font-heading font-extrabold text-[#24D6C5] mt-1">
              {pkg.price} <span className="text-xs font-mono text-[#8AF7EF] font-normal">{pkg.priceDetails}</span>
            </div>
            <p className="text-xs text-[#F2F7F7]/80 mt-2 border-t border-[#24D6C5]/20 pt-2">
              {pkg.forWho}
            </p>
          </div>

          {/* Micro Conversion Path Diagram */}
          <div className="p-3 rounded bg-[#071522] border border-[#24D6C5]/20 space-y-1 font-mono text-[10px] text-[#24D6C5]">
            <div className="text-[#B8E34F] font-bold">CONVERSION PATH PIPELINE:</div>
            <div className="flex items-center justify-between pt-1 text-[#F2F7F7]">
              <span>REACH</span> → <span>ENGAGE</span> → <span>ENQUIRE</span> → <span className="text-[#24D6C5] font-bold">CONVERT</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="text-[10px] font-mono text-[#24D6C5] font-bold">CAPABILITY MATRIX:</div>
            <ul className="space-y-1.5 text-xs text-[#F2F7F7]/90">
              {pkg.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#24D6C5] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#24D6C5]/20 mt-6">
          <Link href={`/contact?service=marketing&package=${pkg.id}`} onClick={playClick} className="block">
            <WorldButton world="marketing" size="md" className="w-full">
              {pkg.ctaText}
            </WorldButton>
          </Link>
        </div>
      </div>
    );
  }

  // WORLD 03 — AI CARD (Computational System Intelligence Module)
  if (world === "ai") {
    return (
      <div
        onMouseEnter={playHover}
        className={`group relative bg-[#11151B] border border-[#7C5CFF]/40 p-6 rounded-xl flex flex-col justify-between transition-all duration-300 text-[#EDEFF5] bg-ai-topology ${
          pkg.popular ? "border-[#6FFFD2] shadow-[0_0_30px_rgba(124,92,255,0.3)] glow-ultraviolet" : "hover:border-[#7C5CFF]"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#C5B8FF]">
            <span>AI / MODULE_{pkg.id.toUpperCase().replace("AI-", "")}</span>
            <span className="w-2 h-2 rounded-full bg-[#6FFFD2] animate-pulse" />
          </div>

          <div>
            <h3 className="text-2xl font-heading font-bold text-[#EDEFF5]">{pkg.name}</h3>
            <div className="text-3xl font-heading font-extrabold text-[#6FFFD2] mt-1">
              {pkg.price}
            </div>
            <p className="text-xs text-[#EDEFF5]/70 mt-2 border-t border-[#7C5CFF]/20 pt-2">
              {pkg.forWho}
            </p>
          </div>

          {/* Node Flow Diagram */}
          <div className="p-3 rounded bg-[#090B0F] border border-[#7C5CFF]/30 space-y-1 font-mono text-[10px] text-[#C5B8FF]">
            <div className="text-[#6FFFD2] font-bold">NODE TOPOLOGY FLOW:</div>
            <div className="flex items-center justify-between pt-1 text-[#EDEFF5] text-[9px]">
              <span>INPUT</span> ↓ <span>AI PROCESSING</span> ↓ <span>DECISION</span> ↓ <span className="text-[#6FFFD2]">ACTION</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="text-[10px] font-mono text-[#C5B8FF] font-bold">SYSTEM CAPABILITIES:</div>
            <ul className="space-y-1.5 text-xs text-[#EDEFF5]/85">
              {pkg.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#7C5CFF] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#7C5CFF]/20 mt-6">
          <Link href={`/contact?service=ai&package=${pkg.id}`} onClick={playClick} className="block">
            <WorldButton world="ai" size="md" className="w-full">
              {pkg.ctaText}
            </WorldButton>
          </Link>
        </div>
      </div>
    );
  }

  // WORLD 04 — APP CARD (Software Operating System Window)
  return (
    <div
      onMouseEnter={playHover}
      className="group relative bg-[#202631] border border-[#DDE2E8]/30 p-6 rounded-xl flex flex-col justify-between transition-all duration-300 text-[#F5F6F8] shadow-2xl hover:border-[#6246EA]"
    >
      <div className="space-y-6">
        {/* Software Window Header */}
        <div className="flex items-center justify-between border-b border-[#DDE2E8]/20 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B5E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2D479]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#6246EA]" />
          </div>
          <span className="text-[10px] font-mono text-[#F2D479]">APP / SOFTWARE BUILD</span>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-extrabold text-[#F5F6F8]">{pkg.name}</h3>
          <div className="text-3xl font-heading font-extrabold text-[#F2D479] mt-1">
            {pkg.price}
          </div>
          <p className="text-xs text-[#F5F6F8]/80 mt-2 border-t border-[#DDE2E8]/20 pt-2">
            {pkg.forWho}
          </p>
        </div>

        {/* Software Modular Components Grid */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-[#F2D479] font-bold uppercase">INCLUDED MODULAR COMPONENTS:</div>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
            {["AUTH & RBAC", "DATABASE SCHEMAS", "ADMIN DASHBOARD", "PAYMENTS & APIS", "AI MODULES", "ANALYTICS"].map((mod) => (
              <div key={mod} className="p-1.5 rounded bg-[#0B0D10] border border-[#6246EA]/40 text-[#DDE2E8] flex items-center gap-1">
                <Terminal className="w-3 h-3 text-[#6246EA]" />
                <span>{mod}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="text-[10px] font-mono text-[#DDE2E8] font-bold">SOFTWARE DELIVERABLES:</div>
          <ul className="space-y-1.5 text-xs text-[#F5F6F8]/90">
            {pkg.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#6246EA] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-[#DDE2E8]/20 mt-6">
        <Link href={`/contact?service=apps&package=${pkg.id}`} onClick={playClick} className="block">
          <WorldButton world="apps" size="md" className="w-full">
            {pkg.ctaText}
          </WorldButton>
        </Link>
      </div>
    </div>
  );
};
