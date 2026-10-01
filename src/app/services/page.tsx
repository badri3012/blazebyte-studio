"use client";

import React from "react";
import Link from "next/link";
import { PORTALS } from "@/config/studio-data";
import { Button } from "@/components/ui/button";
import { useSound } from "@/context/sound-context";
import { ArrowRight, Globe, TrendingUp, Cpu, Smartphone } from "lucide-react";

export default function ServicesOverviewPage() {
  const { playHover, playClick } = useSound();

  const portalIcons = {
    web: Globe,
    marketing: TrendingUp,
    ai: Cpu,
    apps: Smartphone,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-mono text-indigo-light uppercase">FOUR DEDICATED BUSINESS ENGINES</div>
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-ivory">SERVICE PORTAL ENVIRONMENTS</h1>
        <p className="text-base text-muted-grey">
          Each BlazeByte service system has its own visual identity, technical architecture, and dedicated environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PORTALS.map((portal) => {
          const Icon = portalIcons[portal.id as keyof typeof portalIcons] || Globe;

          return (
            <div
              key={portal.id}
              className="p-8 rounded-2xl bg-graphite-card border border-graphite-border hover:border-ivory/40 transition-all space-y-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-muted-grey">{portal.code}</span>
                  <div className="p-3 rounded-lg bg-graphite border border-graphite-border text-ivory">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h2 className="text-2xl font-heading font-bold text-ivory group-hover:text-indigo-light transition-colors">
                  {portal.title}
                </h2>

                <p className="text-sm text-muted-grey leading-relaxed">{portal.tagline}</p>
                <div className="text-xs font-mono text-muted-grey/80">
                  Atmosphere: <span className="text-ivory">{portal.atmosphere}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-graphite-border/60">
                <Link href={portal.route} onMouseEnter={playHover} onClick={playClick} className="block">
                  <Button variant="primary" size="md" className="w-full">
                    <span>Enter {portal.title} Environment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
