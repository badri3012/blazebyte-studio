"use client";

import React from "react";
import Link from "next/link";
import { PackageItem, CaseStudy } from "@/config/studio-data";
import { useSound } from "@/context/sound-context";
import { ArrowRight, ArrowUpRight, Check, Terminal, FileCode, Layers } from "lucide-react";

// --- 01 — WEB: EditorialProjectCard ---
interface EditorialProjectCardProps {
  study?: CaseStudy;
  pkg?: PackageItem;
}

export const EditorialProjectCard: React.FC<EditorialProjectCardProps> = ({ study, pkg }) => {
  const { playHover, playClick } = useSound();

  if (pkg) {
    const titleWords = pkg.name.split(" ");

    return (
      <div
        onMouseEnter={playHover}
        className="group relative bg-[#F4F1EA] text-[#17191C] border-2 border-[#17191C] p-6 sm:p-8 flex flex-col justify-between rounded-none shadow-[8px_8px_0px_#17191C] hover:shadow-[12px_12px_0px_#3457FF] transition-all duration-300 h-full min-w-0 overflow-hidden"
      >
        <div className="space-y-6 min-w-0 flex-1 flex flex-col">
          {/* 01 — METADATA */}
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest text-[#17191C]/70 pb-2 border-b border-[#17191C]/15">
            <span className="font-bold">WEB / {pkg.id.toUpperCase()}</span>
            {pkg.popular && (
              <span className="px-2 py-0.5 bg-[#3457FF] text-[#F4F1EA] font-bold text-[10px]">
                RECOMMENDED
              </span>
            )}
          </div>

          {/* 02 — PACKAGE TITLE (INTENTIONAL MULTI-LINE EDITORIAL TYPOGRAPHY) */}
          <div className="min-w-0">
            <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-black tracking-tight text-[#17191C] uppercase leading-[0.95] space-y-0.5">
              {titleWords.map((word, idx) => (
                <span key={idx} className="block break-words [overflow-wrap:break-word] font-black">
                  {word}
                </span>
              ))}
            </h3>

            {/* 03 — PRICE */}
            <div className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-heading font-extrabold text-[#3457FF] mt-4 leading-none">
              {pkg.price}
            </div>

            {/* 04 — DIVIDER & 05 — DESCRIPTION */}
            <p className="text-xs font-mono text-[#17191C]/80 mt-4 border-t border-[#17191C]/20 pt-3 leading-relaxed break-words">
              {pkg.forWho}
            </p>
          </div>

          {/* 06 — FEATURE LIST */}
          <div className="border-t border-[#17191C]/20 pt-4 space-y-2 font-mono text-xs min-w-0 mt-auto">
            <div className="text-[10px] font-bold uppercase text-[#3457FF] tracking-wider">
              SPECIFICATION MATRIX:
            </div>
            <ul className="space-y-2 text-xs min-w-0">
              {pkg.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 min-w-0">
                  <span className="text-[#3457FF] font-bold shrink-0">—</span>
                  <span className="break-words font-sans text-xs text-[#17191C]/90">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 07 — CTA */}
        <div className="pt-6 border-t border-[#17191C]/20 mt-6">
          <Link href={`/web/order?package=${pkg.id}`} onClick={playClick} className="block">
            <button className="w-full py-3.5 bg-[#17191C] text-[#F4F1EA] font-heading font-bold text-xs uppercase hover:bg-[#3457FF] transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:translate-x-1">
              <span>{pkg.ctaText}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (study) {
    return (
      <div
        onMouseEnter={playHover}
        className="group bg-[#F4F1EA] text-[#17191C] border border-[#17191C] p-6 sm:p-8 space-y-6 flex flex-col justify-between transition-all duration-300 rounded-none hover:border-[#3457FF] h-full min-w-0 overflow-hidden"
      >
        <div className="space-y-4 min-w-0">
          <div className="flex items-center justify-between font-mono text-xs text-[#3457FF]">
            <span className="font-bold">{study.category.toUpperCase()} SYSTEM</span>
            <span className="text-[#17191C]/60 text-[10px]">{study.location}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold uppercase tracking-tight text-[#17191C] group-hover:text-[#3457FF] transition-colors break-words leading-tight">
            {study.title}
          </h3>

          <div className="space-y-2 text-xs text-[#17191C]/80 font-sans leading-relaxed min-w-0">
            <p className="break-words"><strong>CHALLENGE:</strong> {study.challenge}</p>
            <p className="text-[#17191C] font-semibold break-words"><strong>RESULT:</strong> {study.result}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#17191C]/20 flex items-center justify-between font-mono text-[10px] min-w-0">
          <span className="text-[#17191C]/60 truncate">{study.techStack.join(" • ")}</span>
          <span className="text-[#3457FF] font-bold group-hover:translate-x-1 transition-transform shrink-0">→</span>
        </div>
      </div>
    );
  }

  return null;
};

// --- 02 — MARKETING: MagazineGrowthPanel ---
interface MagazineGrowthPanelProps {
  pkg?: PackageItem;
  metric?: { stat: string; label: string; context: string };
}

export const MagazineGrowthPanel: React.FC<MagazineGrowthPanelProps> = ({ pkg, metric }) => {
  const { playHover, playClick } = useSound();

  if (metric) {
    return (
      <div className="bg-[#17172B] text-[#F6F1E8] border-2 border-[#FF5C68] p-6 sm:p-8 space-y-4 rounded-none shadow-[8px_8px_0px_#FF5C68] h-full flex flex-col justify-between min-w-0">
        <div className="space-y-2">
          <div className="text-5xl sm:text-7xl font-heading font-black text-[#FF5C68] leading-none break-words">
            {metric.stat}
          </div>
          <div className="font-heading font-bold text-lg sm:text-xl uppercase tracking-tight text-[#F6F1E8] break-words">
            {metric.label}
          </div>
        </div>
        <p className="text-xs font-mono text-[#F6F1E8]/80 leading-relaxed border-t border-[#FF5C68]/30 pt-3 break-words">
          {metric.context}
        </p>
      </div>
    );
  }

  if (pkg) {
    const titleWords = pkg.name.split(" ");

    return (
      <div
        onMouseEnter={playHover}
        className="group relative bg-[#F6F1E8] text-[#101014] border-2 border-[#101014] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 rounded-none shadow-xl hover:border-[#FF5C68] h-full min-w-0 overflow-hidden"
      >
        <div className="space-y-6 min-w-0 flex-1 flex flex-col">
          {/* 01 — METADATA */}
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest text-[#FF5C68] font-bold pb-2 border-b border-[#101014]/15">
            <span>GROWTH / {pkg.id.toUpperCase()}</span>
            {pkg.popular && (
              <span className="px-2 py-0.5 bg-[#FF5C68] text-[#F6F1E8] text-[10px]">
                RECOMMENDED
              </span>
            )}
          </div>

          {/* 02 — PACKAGE TITLE (MULTI-LINE STACKED EDITORIAL TYPOGRAPHY) */}
          <div className="min-w-0">
            <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-black text-[#101014] uppercase leading-[0.95] space-y-0.5">
              {titleWords.map((word, idx) => (
                <span key={idx} className="block break-words [overflow-wrap:break-word] font-black">
                  {word}
                </span>
              ))}
            </h3>

            {/* 03 — PRICE */}
            <div className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-heading font-extrabold text-[#FF5C68] mt-4 leading-none">
              {pkg.price}{" "}
              <span className="text-xs font-mono text-[#101014]/70 block sm:inline font-normal">
                {pkg.priceDetails}
              </span>
            </div>

            {/* 04 — DIVIDER & 05 — DESCRIPTION */}
            <p className="text-xs font-mono text-[#101014]/80 mt-4 border-t border-[#101014]/20 pt-3 leading-relaxed break-words">
              {pkg.forWho}
            </p>
          </div>

          {/* 06 — FEATURE LIST */}
          <div className="space-y-2 text-xs font-mono min-w-0 mt-auto pt-4 border-t border-[#101014]/20">
            <div className="text-[10px] text-[#FF5C68] font-bold uppercase tracking-wider">
              EDITORIAL ACQUISITION SCOPE:
            </div>
            <ul className="space-y-2 text-xs text-[#101014]/90 min-w-0">
              {pkg.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 min-w-0">
                  <span className="text-[#FF5C68] font-bold shrink-0">•</span>
                  <span className="break-words font-sans text-xs">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 07 — CTA */}
        <div className="pt-6 border-t border-[#101014]/20 mt-6">
          <Link href={`/marketing/order?package=${pkg.id}`} onClick={playClick} className="block">
            <button className="w-full py-3 bg-[#101014] text-[#F6F1E8] font-mono font-bold text-xs uppercase hover:bg-[#FF5C68] transition-all cursor-pointer flex items-center justify-center gap-2">
              <span>{pkg.ctaText}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

// --- 03 — AI: SystemSpecificationPanel ---
interface SystemSpecificationPanelProps {
  pkg?: PackageItem;
  spec?: { title: string; type: string; flow: string[]; latency: string };
}

export const SystemSpecificationPanel: React.FC<SystemSpecificationPanelProps> = ({ pkg, spec }) => {
  const { playHover, playClick } = useSound();

  if (spec) {
    return (
      <div className="bg-[#161B22] text-[#F9F9F8] border border-[#1B4D3E] p-6 space-y-4 font-mono rounded-none h-full flex flex-col justify-between min-w-0">
        <div className="space-y-3 min-w-0">
          <div className="flex items-center justify-between text-xs text-[#C86D51]">
            <span>SPECIFICATION MAP</span>
            <span className="text-[10px]">LATENCY: {spec.latency}</span>
          </div>
          <h3 className="text-lg font-heading font-bold text-[#F9F9F8] break-words">{spec.title}</h3>
          <div className="text-xs text-[#1B4D3E] font-bold uppercase">{spec.type}</div>
          <div className="p-3 bg-[#0D1117] border border-[#1B4D3E]/40 text-[11px] text-[#F9F9F8]/80 space-y-1.5 min-w-0">
            {spec.flow.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 min-w-0">
                <span className="text-[#C86D51] font-bold shrink-0">&gt;</span>
                <span className="break-words text-[11px]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (pkg) {
    const titleWords = pkg.name.split(" ");

    return (
      <div
        onMouseEnter={playHover}
        className="group relative bg-[#161B22] text-[#F9F9F8] border border-[#1B4D3E]/60 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 rounded-none shadow-xl hover:border-[#C86D51] h-full min-w-0 overflow-hidden"
      >
        <div className="space-y-6 font-mono min-w-0 flex-1 flex flex-col">
          {/* 01 — METADATA */}
          <div className="flex items-center justify-between text-xs text-[#C86D51] pb-2 border-b border-[#1B4D3E]/30">
            <span>AI / SPEC_{pkg.id.toUpperCase()}</span>
            <span className="w-2 h-2 rounded-full bg-[#1B4D3E]" />
          </div>

          {/* 02 — PACKAGE TITLE (MULTI-LINE STACKED EDITORIAL TYPOGRAPHY) */}
          <div className="min-w-0">
            <h3 className="text-[clamp(1.5rem,3.8vw,2.25rem)] font-heading font-bold text-[#F9F9F8] uppercase leading-[0.95] space-y-0.5">
              {titleWords.map((word, idx) => (
                <span key={idx} className="block break-words [overflow-wrap:break-word]">
                  {word}
                </span>
              ))}
            </h3>

            {/* 03 — PRICE */}
            <div className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-heading font-extrabold text-[#C86D51] mt-4 leading-none">
              {pkg.price}
            </div>

            {/* 04 — DIVIDER & 05 — DESCRIPTION */}
            <p className="text-xs text-[#F9F9F8]/70 mt-4 border-t border-[#1B4D3E]/30 pt-3 font-sans break-words leading-relaxed">
              {pkg.forWho}
            </p>
          </div>

          {/* 06 — FEATURE LIST */}
          <div className="space-y-2 text-xs min-w-0 mt-auto pt-4 border-t border-[#1B4D3E]/30">
            <div className="text-[10px] text-[#1B4D3E] font-bold uppercase tracking-wider">
              ENGINEERING SPECIFICATIONS:
            </div>
            <ul className="space-y-2 text-xs text-[#F9F9F8]/85 font-sans min-w-0">
              {pkg.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 min-w-0">
                  <span className="text-[#C86D51] font-mono shrink-0">&gt;</span>
                  <span className="break-words text-xs">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 07 — CTA */}
        <div className="pt-6 border-t border-[#1B4D3E]/40 mt-6">
          <Link href={`/ai/order?package=${pkg.id}`} onClick={playClick} className="block">
            <button className="w-full py-3 bg-[#1B4D3E] text-[#F9F9F8] font-mono font-bold text-xs uppercase hover:bg-[#C86D51] transition-all cursor-pointer flex items-center justify-center gap-2">
              <span>{pkg.ctaText}</span>
              <FileCode className="w-4 h-4 shrink-0" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

// --- 04 — APPS: ProductInterfacePanel ---
interface ProductInterfacePanelProps {
  pkg?: PackageItem;
}

export const ProductInterfacePanel: React.FC<ProductInterfacePanelProps> = ({ pkg }) => {
  const { playHover, playClick } = useSound();

  if (!pkg) return null;

  const titleWords = pkg.name.split(" ");

  return (
    <div
      onMouseEnter={playHover}
      className="group relative bg-[#FFFFFF] text-[#191C21] border-2 border-[#191C21] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 rounded-none shadow-[8px_8px_0px_#2563EB] hover:shadow-[12px_12px_0px_#EF4444] h-full min-w-0 overflow-hidden"
    >
      {/* 01 — METADATA TITLEBAR */}
      <div className="flex items-center justify-between border-b border-[#191C21]/20 pb-4 font-mono text-xs min-w-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span className="w-3 h-3 rounded-full bg-[#2563EB]" />
          <span className="w-3 h-3 rounded-full bg-[#191C21]" />
        </div>
        <span className="font-bold text-[#2563EB] text-[10px]">SOFTWARE OS SHELL</span>
      </div>

      <div className="space-y-6 pt-4 min-w-0 flex-1 flex flex-col">
        {/* 02 — PACKAGE TITLE (MULTI-LINE STACKED EDITORIAL TYPOGRAPHY) */}
        <div className="min-w-0">
          <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-heading font-black text-[#191C21] uppercase leading-[0.95] space-y-0.5">
            {titleWords.map((word, idx) => (
              <span key={idx} className="block break-words [overflow-wrap:break-word] font-black">
                {word}
              </span>
            ))}
          </h3>

          {/* 03 — PRICE */}
          <div className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-heading font-extrabold text-[#2563EB] mt-4 leading-none">
            {pkg.price}
          </div>

          {/* 04 — DIVIDER & 05 — DESCRIPTION */}
          <p className="text-xs font-mono text-[#191C21]/70 mt-4 border-t border-[#191C21]/20 pt-3 break-words leading-relaxed">
            {pkg.forWho}
          </p>
        </div>

        {/* COMPONENT MODULES */}
        <div className="space-y-2 min-w-0 pt-2">
          <div className="text-[10px] font-mono text-[#EF4444] font-bold uppercase tracking-wider">
            INTERFACE COMPONENT MODULES:
          </div>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
            {["AUTH & RBAC", "DATABASE SCHEMAS", "ADMIN DASHBOARD", "PAYMENTS & APIS"].map((mod) => (
              <div key={mod} className="p-2 bg-[#F3F4F6] border border-[#191C21]/30 text-[#191C21] font-bold flex items-center gap-1 min-w-0">
                <Terminal className="w-3 h-3 text-[#2563EB] shrink-0" />
                <span className="truncate text-[9px]">{mod}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 06 — FEATURE LIST */}
        <div className="space-y-2 text-xs min-w-0 mt-auto pt-4 border-t border-[#191C21]/20">
          <div className="text-[10px] font-mono text-[#2563EB] font-bold uppercase tracking-wider">
            SOFTWARE DELIVERABLES:
          </div>
          <ul className="space-y-1.5 text-xs text-[#191C21]/90 min-w-0">
            {pkg.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 min-w-0">
                <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                <span className="break-words font-sans text-xs">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 07 — CTA */}
      <div className="pt-6 border-t border-[#191C21]/20 mt-6">
        <Link href={`/apps/order?package=${pkg.id}`} onClick={playClick} className="block">
          <button className="w-full py-3.5 bg-[#2563EB] text-[#FFFFFF] font-mono font-bold text-xs uppercase hover:bg-[#EF4444] transition-all cursor-pointer flex items-center justify-center gap-2">
            <span>{pkg.ctaText}</span>
            <Layers className="w-4 h-4 shrink-0" />
          </button>
        </Link>
      </div>
    </div>
  );
};
