"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { useSound } from "@/context/sound-context";

export interface FAQItem {
  q: string;
  a: string;
}

interface ServiceFaqProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  theme?: "light" | "dark" | "teal" | "stone";
  ctaRoute?: string;
  ctaText?: string;
}

export function ServiceFaqSection({
  title = "Frequently Asked Questions",
  subtitle = "Clear answers about deliverables, timelines, pricing, and technology.",
  faqs,
  theme = "light",
  ctaRoute = "/contact",
  ctaText = "Have More Questions? Speak to Our Engineers",
}: ServiceFaqProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { playHover, playClick } = useSound();

  const themeStyles = {
    light: {
      bg: "bg-transparent",
      container: "border-[#17191C]/20 bg-[#F4F1EA]",
      text: "text-[#17191C]",
      subtext: "text-[#17191C]/70",
      accent: "text-[#3457FF]",
      border: "border-[#17191C]/15",
      card: "bg-white/80 border-[#17191C]/15 hover:border-[#3457FF]/60",
      cardActive: "bg-white border-[#3457FF]",
      cta: "text-[#3457FF] hover:text-[#17191C]",
    },
    dark: {
      bg: "bg-transparent",
      container: "border-[#242044] bg-[#101014]/60",
      text: "text-[#F6F1E8]",
      subtext: "text-[#F6F1E8]/70",
      accent: "text-[#FF5C68]",
      border: "border-[#242044]",
      card: "bg-[#17172B]/70 border-[#242044] hover:border-[#FF5C68]/60",
      cardActive: "bg-[#17172B] border-[#FF5C68]",
      cta: "text-[#FF5C68] hover:text-[#F6F1E8]",
    },
    teal: {
      bg: "bg-transparent",
      container: "border-[#1B4D3E]/40 bg-[#0D1117]/80",
      text: "text-[#F9F9F8]",
      subtext: "text-[#F9F9F8]/70",
      accent: "text-[#C86D51]",
      border: "border-[#1B4D3E]/30",
      card: "bg-[#141B24]/70 border-[#1B4D3E]/40 hover:border-[#C86D51]/60",
      cardActive: "bg-[#141B24] border-[#C86D51]",
      cta: "text-[#C86D51] hover:text-[#F9F9F8]",
    },
    stone: {
      bg: "bg-transparent",
      container: "border-[#191C21]/20 bg-[#F7F7F2]",
      text: "text-[#191C21]",
      subtext: "text-[#191C21]/70",
      accent: "text-[#2563EB]",
      border: "border-[#191C21]/15",
      card: "bg-white/90 border-[#191C21]/15 hover:border-[#2563EB]/60",
      cardActive: "bg-white border-[#2563EB]",
      cta: "text-[#2563EB] hover:text-[#191C21]",
    },
  }[theme];

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 ${themeStyles.bg}`}>
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className={`font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${themeStyles.accent}`}>
          <HelpCircle className="w-3.5 h-3.5" />
          <span>BUYER KNOWLEDGE BASE</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight ${themeStyles.text}`}>
          {title}
        </h2>
        <p className={`text-xs sm:text-sm font-sans ${themeStyles.subtext}`}>
          {subtitle}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`border transition-all duration-200 rounded-none overflow-hidden ${
                isOpen ? themeStyles.cardActive : themeStyles.card
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setOpenIdx(isOpen ? null : idx);
                }}
                onMouseEnter={playHover}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className={`font-heading font-bold text-sm sm:text-base ${themeStyles.text}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${themeStyles.accent} ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className={`px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed border-t pt-4 ${themeStyles.border} ${themeStyles.subtext}`}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <Link
          href={ctaRoute}
          onClick={playClick}
          onMouseEnter={playHover}
          className={`inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${themeStyles.cta}`}
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
