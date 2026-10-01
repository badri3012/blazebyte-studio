"use client";

import React from "react";
import Link from "next/link";
import { SITE_CONFIG, PORTALS } from "@/config/studio-data";
import { Button } from "@/components/ui/button";
import { useSound } from "@/context/sound-context";
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2, Globe } from "lucide-react";

export default function AboutPage() {
  const { playHover, playClick } = useSound();

  return (
    <div className="space-y-20 pb-20">
      {/* HEADER */}
      <section className="relative py-16 overflow-hidden border-b border-graphite-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-graphite-card border border-graphite-border text-xs font-mono text-indigo-light">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-accent" />
            <span>STUDIO POSITIONING & MANIFESTO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-ivory uppercase tracking-tight">
            ABOUT BLAZEBYTE STUDIO
          </h1>

          <p className="text-base sm:text-lg text-muted-grey max-w-2xl leading-relaxed">
            {SITE_CONFIG.positioning}
          </p>
        </div>
      </section>

      {/* CORE MANIFESTO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-ivory">
              We Don't Build Fluff. <br />
              <span className="text-indigo-light">We Engineer Systems.</span>
            </h2>

            <p className="text-sm text-muted-grey leading-relaxed">
              Most digital agencies sell temporary visual trends or bloatware templates that fall apart under concurrency. BlazeByte Studio was founded to treat web platforms, acquisition engines, and AI automation as interconnected digital infrastructure.
            </p>

            <div className="space-y-3 font-mono text-sm text-ivory border-l-2 border-indigo-accent pl-4">
              <p>• {SITE_CONFIG.coreConcept.line1}</p>
              <p>• {SITE_CONFIG.coreConcept.line2}</p>
              <p>• {SITE_CONFIG.coreConcept.line3}</p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-graphite-card border border-graphite-border space-y-6">
            <h3 className="text-xl font-heading font-bold text-ivory">BlazeByte Standards</h3>
            <div className="space-y-4 text-xs">
              {[
                { title: "Zero Superficial Patches", detail: "Every error or bug is resolved at the root contract layer, never swallowed silently." },
                { title: "Empirical Performance Targets", detail: "Sub-second load metrics and 90+ Lighthouse targets verified before launch." },
                { title: "Security as a Priority", detail: "Strict API route validation, HTTPS encryption, CSP security headers, and rate limiting." },
                { title: "No Invented Metrics", detail: "We publish verified client outcomes only. Zero fake reviews or inflated client numbers." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-graphite border border-graphite-border/70 space-y-1">
                  <div className="font-heading font-bold text-ivory text-sm">{item.title}</div>
                  <div className="text-muted-grey leading-relaxed">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE PORTAL SYSTEM OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono text-indigo-light">FOUR OPERATIONAL ENGINES</div>
          <h2 className="text-3xl font-heading font-bold text-ivory">Our Core Systems</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTALS.map((portal) => (
            <div key={portal.id} className="p-6 rounded-2xl bg-graphite-card border border-graphite-border space-y-4">
              <div className="text-xs font-mono text-indigo-light font-bold">{portal.code}</div>
              <h3 className="text-xl font-heading font-bold text-ivory">{portal.title}</h3>
              <p className="text-xs text-muted-grey leading-relaxed">{portal.tagline}</p>
              <Link href={portal.route} onMouseEnter={playHover} onClick={playClick}>
                <Button size="sm" variant="ghost" className="text-xs p-0 mt-2 hover:bg-transparent text-ivory">
                  <span>Explore Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-graphite-card border border-graphite-border p-10 text-center space-y-4">
          <h2 className="text-2xl font-heading font-bold text-ivory">Ready to Work with BlazeByte Studio?</h2>
          <p className="text-sm text-muted-grey max-w-md mx-auto">
            Build your web, marketing, or AI system with dedicated engineers.
          </p>
          <div className="pt-2 flex justify-center">
            <Link href="/contact" onMouseEnter={playHover} onClick={playClick}>
              <Button size="md" variant="primary">
                Start a Project Build
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
