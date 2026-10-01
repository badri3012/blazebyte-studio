"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSound } from "@/context/sound-context";
import { Globe, TrendingUp, Cpu, Smartphone, ArrowUpRight, Sparkles } from "lucide-react";
import { PORTALS } from "@/config/studio-data";

export const PortalGrid = () => {
  const router = useRouter();
  const { playHover, playPortalWeb, playPortalMarketing, playPortalAI, playPortalApps } = useSound();
  const [activePortal, setActivePortal] = useState<string | null>(null);

  const portalIcons = {
    web: Globe,
    marketing: TrendingUp,
    ai: Cpu,
    apps: Smartphone,
  };

  const handlePortalClick = (id: string, route: string) => {
    setActivePortal(id);
    if (id === "web") playPortalWeb();
    else if (id === "marketing") playPortalMarketing();
    else if (id === "ai") playPortalAI();
    else if (id === "apps") playPortalApps();

    setTimeout(() => {
      router.push(route);
    }, 250);
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Lighting & Architectural Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-indigo-accent/10 via-teal-accent/5 to-blue-accent/10 blur-[120px] rounded-full pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Central Entry Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-graphite-card border border-graphite-border text-xs font-mono text-ivory-muted"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-accent" />
            <span>BlazeByte Service Selection Environment</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-ivory uppercase"
          >
            WHAT DO YOU WANT TO BUILD?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-grey font-sans max-w-2xl mx-auto"
          >
            Choose the system that moves your business forward.
          </motion.p>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTALS.map((portal, idx) => {
            const Icon = portalIcons[portal.id as keyof typeof portalIcons] || Globe;
            const isHovered = activePortal === portal.id;

            return (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                onMouseEnter={() => {
                  setActivePortal(portal.id);
                  playHover();
                }}
                onMouseLeave={() => setActivePortal(null)}
                onClick={() => handlePortalClick(portal.id, portal.route)}
                className={`group relative rounded-xl bg-graphite-card border transition-all duration-300 p-8 flex flex-col justify-between cursor-pointer min-h-[360px] overflow-hidden ${
                  portal.id === "web"
                    ? "hover:border-indigo-accent/60 hover:shadow-2xl hover:shadow-indigo-accent/20"
                    : portal.id === "marketing"
                    ? "hover:border-teal-accent/60 hover:shadow-2xl hover:shadow-teal-accent/20"
                    : portal.id === "ai"
                    ? "hover:border-blue-accent/60 hover:shadow-2xl hover:shadow-blue-accent/20"
                    : "hover:border-ivory/60 hover:shadow-2xl hover:shadow-ivory/10"
                } ${
                  isHovered ? "border-graphite-border/90 scale-[1.02]" : "border-graphite-border"
                }`}
              >
                {/* Glow Background Overlay */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b ${
                    portal.id === "web"
                      ? "from-indigo-accent/10 via-transparent to-transparent"
                      : portal.id === "marketing"
                      ? "from-teal-accent/10 via-transparent to-transparent"
                      : portal.id === "ai"
                      ? "from-blue-accent/10 via-transparent to-transparent"
                      : "from-ivory/10 via-transparent to-transparent"
                  }`}
                />

                {/* Top Portal Badge & Code */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-semibold text-muted-grey group-hover:text-ivory transition-colors">
                      {portal.code}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-graphite border border-graphite-border flex items-center justify-center group-hover:bg-graphite-card group-hover:border-ivory/30 transition-all">
                      <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-ivory group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-3 mb-6">
                    <div
                      className={`inline-flex p-3 rounded-lg border transition-colors ${
                        portal.id === "web"
                          ? "bg-indigo-accent/10 border-indigo-accent/30 text-indigo-light"
                          : portal.id === "marketing"
                          ? "bg-teal-accent/10 border-teal-accent/30 text-teal-light"
                          : portal.id === "ai"
                          ? "bg-blue-accent/10 border-blue-accent/30 text-blue-light"
                          : "bg-ivory/10 border-ivory/30 text-ivory"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h2 className="text-2xl font-heading font-bold text-ivory group-hover:text-white transition-colors">
                      {portal.title}
                    </h2>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm text-muted-grey leading-relaxed group-hover:text-ivory-muted transition-colors">
                    {portal.tagline}
                  </p>
                </div>

                {/* Bottom Custom Tag / Portal Footer */}
                <div className="pt-6 border-t border-graphite-border/60 flex items-center justify-between">
                  {portal.badge ? (
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-ivory/10 text-ivory font-semibold border border-ivory/20">
                      {portal.badge}
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-muted-grey group-hover:text-ivory transition-colors flex items-center gap-1">
                      Enter Portal →
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-mono text-muted-grey/70 tracking-widest">
                    {portal.id}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
