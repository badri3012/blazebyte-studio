"use client";

import React from "react";
import Link from "next/link";
import { WEB_SERVICE_CONFIG, CASE_STUDIES, PROCESS_STAGES } from "@/config/studio-data";
import Image from "next/image";
import { WebArchitectureDiagram } from "@/components/visualizers/web-architecture-diagram";
import { EditorialProjectCard } from "@/components/ui/human-cards";
import { WorldLoader } from "@/components/ui/world-loaders";
import { useSound } from "@/context/sound-context";
import { Globe, ArrowRight } from "lucide-react";

export default function WebServicePage() {
  const { playHover, playClick } = useSound();

  return (
    <div className="bg-[#F4F1EA] text-[#17191C] min-h-screen space-y-24 pb-20 font-sans selection:bg-[#3457FF] selection:text-[#F4F1EA]">
      {/* 01 — SERVICE LOADING EXPERIENCE */}
      <WorldLoader world="web" />

      {/* 02 — HERO SECTION (Editorial Digital Architecture Studio) */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-b border-[#17191C]/20 bg-web-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F1EA] border border-[#17191C]/30 font-mono text-xs text-[#3457FF]">
                <Globe className="w-3.5 h-3.5 text-[#3457FF]" />
                <span>01 — WEB DEVELOPMENT STUDIO</span>
              </div>

              <h1 className="text-display-huge font-heading font-black tracking-tight text-[#17191C] uppercase leading-[0.92]">
                WE BUILD <br />
                <span className="text-[#3457FF]">DIGITAL EXPERIENCES.</span>
              </h1>

              <div className="border-l-4 border-[#3457FF] pl-6 space-y-2 font-serif italic text-lg sm:text-2xl text-[#17191C]/80">
                <p>Websites designed around your business, your customers and the way your brand should be experienced online.</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
                <Link href="/web/order" onClick={playClick}>
                  <button
                    onMouseEnter={playHover}
                    className="px-8 py-4 bg-[#17191C] text-[#F4F1EA] font-heading font-bold text-sm uppercase hover:bg-[#3457FF] transition-all cursor-pointer flex items-center gap-2 shadow-xl"
                  >
                    <span>START A WEB PROJECT →</span>
                  </button>
                </Link>
                <Link href="/work" onClick={playClick}>
                  <button
                    onMouseEnter={playHover}
                    className="px-6 py-4 bg-transparent border border-[#17191C]/40 text-[#17191C] font-heading font-semibold text-xs hover:border-[#3457FF] hover:text-[#3457FF] transition-all cursor-pointer"
                  >
                    VIEW OUR WORK
                  </button>
                </Link>
              </div>
            </div>

            {/* ART-DIRECTED ARCHITECTURAL IMAGE COMPOSITION */}
            <div className="border-2 border-[#17191C] bg-[#F4F1EA] p-4 shadow-[12px_12px_0px_#17191C]">
              <Image src="/images/web-hero.jpg" alt="Web Development Architectural Composition" width={800} height={600} priority className="w-full h-auto object-cover border border-[#17191C]/30" />
              <div className="pt-3 font-mono text-[10px] text-[#17191C]/60 flex items-center justify-between">
                <span>ART DIRECTION: ARCHITECTURAL DIGITAL CRAFT</span>
                <span className="text-[#3457FF] font-bold">BLAZEBYTE / WEB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — SELECTED WORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#17191C]/20 pb-6">
          <div>
            <div className="font-mono text-xs text-[#3457FF] uppercase">EDITORIAL ARCHITECTURE PORTFOLIO</div>
            <h2 className="text-3xl font-heading font-bold text-[#17191C]">Selected Web Builds</h2>
          </div>
          <Link href="/work" onClick={playClick}>
            <button className="px-4 py-2 border border-[#17191C]/30 font-mono text-xs hover:border-[#3457FF] hover:text-[#3457FF] transition-all">
              VIEW ALL CASE STUDIES →
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.filter((s) => s.category === "Web").map((study) => (
            <EditorialProjectCard key={study.id} study={study} />
          ))}
        </div>
      </section>

      {/* 04 — CAPABILITIES MATRIX & ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WebArchitectureDiagram />
      </section>

      {/* 05 — PACKAGES (Specification Sheets) */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="font-mono text-xs text-[#3457FF] uppercase">ARCHITECTURAL SPECIFICATION SHEETS</div>
          <h2 className="text-4xl font-heading font-extrabold text-[#17191C]">Web Package Architecture</h2>
          <p className="text-xs font-mono text-[#17191C]/70">Defined scopes with real technical deliverables.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WEB_SERVICE_CONFIG.packages.map((pkg) => (
            <EditorialProjectCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* 06 — PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="font-mono text-xs text-[#3457FF]">5-STAGE SYSTEM DELIVERY</div>
          <h2 className="text-3xl font-heading font-bold text-[#17191C]">How Web Systems Are Built</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 font-mono text-xs">
          {PROCESS_STAGES.map((s) => (
            <div key={s.code} className="p-4 border border-[#17191C]/30 bg-[#F4F1EA] space-y-2">
              <div className="text-xl font-bold text-[#3457FF]">{s.code}</div>
              <div className="font-bold text-[#17191C]">{s.name}</div>
              <p className="text-[11px] text-[#17191C]/70 font-sans">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 07 — CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-[#17191C] bg-[#17191C] text-[#F4F1EA] p-10 lg:p-14 text-center space-y-6 shadow-[10px_10px_0px_#3457FF]">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold">Ready to Build Your Web System?</h2>
          <div className="flex justify-center pt-2">
            <Link href="/web/order" onClick={playClick}>
              <button className="px-8 py-4 bg-[#3457FF] text-[#F4F1EA] font-heading font-bold text-sm uppercase hover:bg-[#F4F1EA] hover:text-[#17191C] transition-all cursor-pointer flex items-center gap-2">
                <span>START A WEB PROJECT →</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

