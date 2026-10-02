"use client";

import React from "react";
import Link from "next/link";
import { AI_SERVICE_CONFIG } from "@/config/studio-data";
import Image from "next/image";
import { SystemSpecificationPanel } from "@/components/ui/human-cards";
import { WorldLoader } from "@/components/ui/world-loaders";
import { useSound } from "@/context/sound-context";
import { Cpu, FileCode, Terminal, Layers } from "lucide-react";

export default function AIServicePage() {
  const { playHover, playClick } = useSound();

  const technicalSpecs = [
    {
      title: "RAG Vector Architecture",
      type: "Knowledge System",
      flow: ["Ingest Document Payload", "Generate Embeddings", "Query Vector Database", "Verified Context Output"],
      latency: "< 350ms",
    },
    {
      title: "WhatsApp & CRM Dispatch",
      type: "Workflow Automation",
      flow: ["Trigger Webhook Event", "Parse Lead Intent", "Auto-Update CRM Record", "Dispatch Instant WhatsApp"],
      latency: "< 450ms",
    },
  ];

  return (
    <div className="bg-[#161B22] text-[#F9F9F8] min-h-screen space-y-24 pb-20 font-mono selection:bg-[#C86D51] selection:text-[#F9F9F8]">
      {/* 01 — SERVICE LOADING EXPERIENCE */}
      <WorldLoader world="ai" />

      {/* 02 — HERO SECTION (Enterprise Systems Engineering Blueprint) */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-b border-[#1B4D3E]/40 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161B22] border border-[#1B4D3E] text-xs text-[#C86D51]">
              <Cpu className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>03 — ENTERPRISE SYSTEMS & AI ENGINEERING</span>
            </div>

            <h1 className="text-display-huge font-heading font-black tracking-tight text-[#F9F9F8] uppercase leading-[0.9]">
              AUTOMATE THE WORK. <br />
              <span className="text-[#C86D51]">AMPLIFY THE TEAM.</span>
            </h1>

            <div className="border-l-4 border-[#1B4D3E] pl-6 space-y-2 font-sans text-lg sm:text-xl text-[#F9F9F8]/80">
              <p>Design AI systems that reduce repetitive work, connect your tools and turn business processes into intelligent workflows.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/ai/order" onClick={playClick}>
                <button
                  onMouseEnter={playHover}
                  className="px-8 py-4 bg-[#1B4D3E] text-[#F9F9F8] font-mono font-bold text-sm uppercase hover:bg-[#C86D51] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>ACTIVATE AI SYSTEM ⚡</span>
                  <FileCode className="w-4 h-4 text-[#C86D51]" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — SECTION 2: TECHNICAL SPECIFICATION MAPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#1B4D3E]/40 pb-4">
          <div className="text-xs text-[#C86D51]">TECHNICAL WORKFLOW BLUEPRINTS</div>
          <h2 className="text-3xl font-heading font-bold text-[#F9F9F8]">Enterprise Systems Architecture</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technicalSpecs.map((spec, idx) => (
            <SystemSpecificationPanel key={idx} spec={spec} />
          ))}
        </div>
      </section>

      {/* 04 — SECTION 3: SYSTEM PACKAGES (System Specification Panels) */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs text-[#C86D51] uppercase">SYSTEM SPECIFICATION PANELS</div>
          <h2 className="text-4xl font-heading font-black text-[#F9F9F8] uppercase">AI Automation Packages</h2>
          <p className="text-xs text-[#F9F9F8]/70">No robots or brain graphics. 100% Serious Automation Engineering.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AI_SERVICE_CONFIG.packages.map((pkg) => (
            <SystemSpecificationPanel key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* 05 — CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-[#1B4D3E] bg-[#0D1117] p-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#F9F9F8] uppercase">Ready to Automate Business Processes?</h2>
          <div className="flex justify-center pt-2">
            <Link href="/ai/order" onClick={playClick}>
              <button className="px-8 py-4 bg-[#1B4D3E] text-[#F9F9F8] font-mono font-bold text-sm uppercase hover:bg-[#C86D51] transition-all cursor-pointer">
                ACTIVATE AI SYSTEM NOW ⚡
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

