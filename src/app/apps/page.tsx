"use client";

import React from "react";
import Link from "next/link";
import { APP_SERVICE_CONFIG } from "@/config/studio-data";
import { AppScopeBuilder } from "@/components/visualizers/app-scope-builder";
import { ProductInterfacePanel } from "@/components/ui/human-cards";
import { WorldLoader } from "@/components/ui/world-loaders";
import { useSound } from "@/context/sound-context";
import { Terminal, Layers, ArrowRight } from "lucide-react";

export default function AppsServicePage() {
  const { playHover, playClick } = useSound();

  return (
    <div className="bg-[#FFFFFF] text-[#191C21] min-h-screen space-y-24 pb-20 font-sans selection:bg-[#2563EB] selection:text-[#FFFFFF]">
      {/* 01 — SERVICE LOADING EXPERIENCE */}
      <WorldLoader world="apps" />

      {/* 02 — HERO SECTION (Product Engineering & Software OS Shell) */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-b-2 border-[#191C21] bg-[#F5F6F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-8">
            <h1 className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#191C21] font-mono text-xs text-[#2563EB] uppercase">
              <Terminal className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Custom App Development for Businesses</span>
            </h1>

            <h2 className="text-display-huge font-heading font-black tracking-tight text-[#191C21] uppercase leading-[0.9]">
              FROM IDEA TO <br />
              <span className="text-[#2563EB]">SOFTWARE PRODUCT.</span>
            </h2>

            <div className="border-l-4 border-[#2563EB] pl-6 space-y-2 font-mono text-lg sm:text-xl text-[#191C21]/80">
              <p>End-to-end custom app development for businesses that demand scalable performance.</p>
              <p className="text-sm pt-2 text-[#191C21]/70 leading-relaxed font-sans">
                We engineer powerful <strong>web applications</strong>, cross-platform <strong>mobile app development</strong>, <strong>SaaS platforms</strong>, and <strong>internal business tools</strong>. From rapid <strong>MVP development</strong> to complex <strong>business applications</strong> requiring deep integrations and automation, we build software designed around the way you actually work.
              </p>
            </div>

            <div className="inline-block px-4 py-2 bg-[#191C21] text-[#FFFFFF] font-mono text-xs font-bold">
              Custom software builds from ₹50,000+
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/apps/order" onClick={playClick}>
                <button
                  onMouseEnter={playHover}
                  className="px-8 py-4 bg-[#2563EB] text-[#FFFFFF] font-mono font-bold text-sm uppercase hover:bg-[#EF4444] transition-all cursor-pointer flex items-center gap-2 shadow-xl"
                >
                  <span>CONFIGURE MY APP →</span>
                  <Layers className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — INTERACTIVE SCOPE BUILDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppScopeBuilder />
      </section>

      {/* 04 — SOFTWARE PACKAGES (Product Interface Panels) */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="font-mono text-xs text-[#2563EB] uppercase">SOFTWARE WINDOW MODULES</div>
          <h2 className="text-4xl font-heading font-black text-[#191C21] uppercase">Custom App Engineering Tiers</h2>
          <p className="text-xs font-mono text-[#191C21]/70">No giant device mockups. 100% Type-Safe Software Systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {APP_SERVICE_CONFIG.packages.map((pkg) => (
            <ProductInterfacePanel key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* 05 — CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-[#191C21] bg-[#191C21] text-[#FFFFFF] p-12 text-center space-y-6 shadow-[10px_10px_0px_#2563EB]">
          <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase text-[#FFFFFF]">Have a Custom App Concept?</h2>
          <div className="flex justify-center pt-2">
            <Link href="/apps/order" onClick={playClick}>
              <button className="px-8 py-4 bg-[#2563EB] text-[#FFFFFF] font-mono font-bold text-sm uppercase hover:bg-[#EF4444] transition-all cursor-pointer">
                CONFIGURE MY APP NOW (₹50,000+)
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
