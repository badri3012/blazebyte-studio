"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CASE_STUDIES } from "@/config/studio-data";
import { Button } from "@/components/ui/button";
import { useSound } from "@/context/sound-context";
import { ArrowRight, CheckCircle2, Filter } from "lucide-react";

export default function WorkPage() {
  const { playHover, playClick } = useSound();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Web", "Growth", "AI", "App"];

  const filteredStudies =
    activeCategory === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-16 pb-20">
      {/* HEADER */}
      <section className="relative py-16 overflow-hidden border-b border-graphite-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-graphite-card border border-graphite-border text-xs font-mono text-ivory-muted">
            <Filter className="w-3.5 h-3.5 text-indigo-accent" />
            <span>VERIFIED PORTFOLIO & CASE STUDIES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-ivory uppercase tracking-tight">
            SELECTED CLIENT BUILDS
          </h1>

          <p className="text-base sm:text-lg text-muted-grey max-w-2xl">
            Real BlazeByte projects evaluated through structured technical methodology: Challenge → Approach → Build → Result. No fabricated stats.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-ivory text-graphite font-bold border-ivory"
                    : "bg-graphite-card border-graphite-border text-muted-grey hover:text-ivory"
                }`}
              >
                {cat === "All" ? "All Projects" : `${cat} Systems`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-2xl bg-graphite-card border border-graphite-border hover:border-ivory/40 transition-all p-8 space-y-6 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-graphite-border/60 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-light px-2.5 py-1 rounded bg-graphite border border-graphite-border">
                      {study.category}
                    </span>
                    <span className="text-xs font-mono text-muted-grey ml-3">{study.location}</span>
                  </div>
                  <span className="text-xs font-mono text-ivory font-semibold">{study.client}</span>
                </div>

                <h2 className="text-2xl font-heading font-bold text-ivory group-hover:text-indigo-light transition-colors">
                  {study.title}
                </h2>

                <div className="space-y-4 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-lg bg-graphite/60 border border-graphite-border/60 space-y-1">
                    <div className="font-mono text-indigo-light font-bold">01 — CHALLENGE</div>
                    <p className="text-ivory-muted">{study.challenge}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-graphite/60 border border-graphite-border/60 space-y-1">
                    <div className="font-mono text-teal-light font-bold">02 — APPROACH</div>
                    <p className="text-ivory-muted">{study.approach}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-graphite/60 border border-graphite-border/60 space-y-1">
                    <div className="font-mono text-blue-light font-bold">03 — BUILD</div>
                    <p className="text-ivory-muted">{study.build}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-graphite/60 border border-teal-accent/30 space-y-1">
                    <div className="font-mono text-teal-accent font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 04 — RESULT
                    </div>
                    <p className="text-ivory font-medium">{study.result}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-graphite-border/60 flex items-center justify-between relative z-10">
                <div className="flex flex-wrap gap-1.5">
                  {study.techStack.map((tech) => (
                    <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-graphite text-muted-grey">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link href="/contact" onMouseEnter={playHover} onClick={playClick}>
                  <Button size="sm" variant="ghost" className="text-xs">
                    <span>Discuss Similar Build</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-graphite-card border border-graphite-border p-10 text-center space-y-4">
          <h2 className="text-2xl font-heading font-bold text-ivory">Need a Similar Result for Your Business?</h2>
          <p className="text-sm text-muted-grey max-w-md mx-auto">
            Configure your project or schedule a technical system briefing.
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
