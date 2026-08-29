"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "meta-ads",
    title: "Meta Ads",
    shortDesc: "Data-driven advertising campaigns focused purely on ROI and qualified lead generation.",
    why: [
      "Highly targeted audiences based on behavior and interests",
      "Better campaign efficiency through machine learning",
      "Lower customer acquisition cost over time"
    ],
    what: [
      "Audience segmentation & testing",
      "Pixel & Conversion API setup",
      "Dynamic creative testing",
      "Retargeting funnels",
      "Continuous bid optimization"
    ],
    cta: "Launch Meta Campaign"
  },
  {
    id: "google-ads",
    title: "Google Ads",
    shortDesc: "Capture high-intent search traffic precisely when they search for your services.",
    why: [
      "Capture high-intent buyers actively searching",
      "Immediate visibility on page one",
      "Measurable ROI and detailed tracking"
    ],
    what: [
      "Keyword research & negative keyword mapping",
      "Search, Display, and Performance Max campaigns",
      "Ad copy testing & optimization",
      "Landing page conversion alignment",
      "Bid management & CPA scaling"
    ],
    cta: "Capture Search Traffic"
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    shortDesc: "Holistic budget allocation across platforms to maximize Return on Ad Spend (ROAS).",
    why: [
      "Data-backed decisions over guesswork",
      "Omnichannel strategy reduces dependency on one platform",
      "Scalable customer acquisition models"
    ],
    what: [
      "Cross-platform attribution tracking",
      "Holistic funnel optimization",
      "A/B testing across all touchpoints",
      "Budget reallocation based on CPA",
      "Growth scaling strategy"
    ],
    cta: "Scale Your Revenue"
  }
];

export function ServiceExplorer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleSelect = (idx: number) => {
    if (idx === activeIdx) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setIsFading(false);
    }, 200); // 200ms fade transition
  };

  const activeService = services[activeIdx];

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start relative">
      {/* Left: Navigation List */}
      <div className="lg:col-span-4 flex flex-col gap-2 relative z-10" role="tablist" aria-label="Paid Acquisition Services">
        {/* Subtle vertical connecting line for desktop */}
        <div className="hidden lg:block absolute left-0 top-4 bottom-4 w-px bg-neutral-800" />
        
        {services.map((svc, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={svc.id}
              onClick={() => handleSelect(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(idx);
                }
              }}
              className={cn(
                "group relative text-left py-6 pl-6 pr-4 rounded-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive ? "bg-neutral-900 shadow-xl" : "hover:bg-neutral-900/50"
              )}
              aria-selected={isActive}
              role="tab"
              id={`tab-${svc.id}`}
              aria-controls={`panel-${svc.id}`}
            >
              {/* Active Indicator Line */}
              <div 
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r transition-all duration-300",
                  isActive ? "h-3/4 opacity-100 bg-primary shadow-[0_0_10px_rgba(249,115,22,0.4)]" : "h-0 opacity-0 bg-neutral-600 group-hover:h-1/2 group-hover:opacity-40"
                )}
              />
              
              <div className="flex items-center justify-between">
                <h3 className={cn(
                  "font-heading text-xl font-bold transition-colors duration-300",
                  isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
                )}>
                  {svc.title}
                </h3>
                <span className={cn(
                  "transition-all duration-300 font-mono",
                  isActive ? "text-primary translate-x-1 opacity-100" : "text-neutral-600 opacity-0 group-hover:opacity-50 group-hover:translate-x-0 -translate-x-2"
                )}>
                  →
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Right: Content Area */}
      <div 
        className={cn(
          "lg:col-span-8 min-h-[400px] transition-all duration-300 ease-out transform",
          isFading ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
        )}
        id={`panel-${activeService.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeService.id}`}
      >
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-xs uppercase tracking-wider rounded-full mb-6">
          Paid Acquisition Ecosystem
        </div>
        
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
          {activeService.title}
        </h2>
        
        <p className="text-xl text-neutral-400 mb-12 leading-relaxed max-w-2xl">
          {activeService.shortDesc}
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h4 className="font-mono text-sm tracking-wider uppercase text-neutral-500 mb-6 flex items-center">
              <span className="w-6 h-px bg-neutral-800 mr-4"></span>
              Why It Matters
            </h4>
            <ul className="space-y-4">
              {activeService.why.map((item, i) => (
                <li key={i} className="flex items-start text-neutral-300 text-sm">
                  <span className="text-primary mr-3 font-bold">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-sm tracking-wider uppercase text-neutral-500 mb-6 flex items-center">
              <span className="w-6 h-px bg-neutral-800 mr-4"></span>
              What We Do
            </h4>
            <ul className="space-y-4">
              {activeService.what.map((item, i) => (
                <li key={i} className="flex items-start text-neutral-300 text-sm">
                  <span className="text-primary mr-3 font-bold">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800">
          <Button variant="primary" size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5" asChild>
            <Link href="/order-project">{activeService.cta}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
