"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { WEB_TECH_STACK } from "@/config/studio-data";
import { Cpu, Layers, Box, Server, ShieldCheck, Zap } from "lucide-react";
import { useSound } from "@/context/sound-context";

export const WebArchitectureDiagram = () => {
  const { playHover, playClick } = useSound();
  const [activeCategory, setActiveCategory] = useState<string>("frontend");

  const categories = [
    { id: "frontend", label: "Frontend Engine", icon: Layers, count: WEB_TECH_STACK.frontend.length },
    { id: "motion", label: "Motion & Physics", icon: Zap, count: WEB_TECH_STACK.motion.length },
    { id: "threeD", label: "Selective 3D", icon: Box, count: WEB_TECH_STACK.threeD.length },
    { id: "backend", label: "Backend API & DB", icon: Server, count: WEB_TECH_STACK.backend.length },
    { id: "infrastructure", label: "Edge Security & CDN", icon: ShieldCheck, count: WEB_TECH_STACK.infrastructure.length },
  ];

  const getActiveStack = () => {
    switch (activeCategory) {
      case "frontend":
        return WEB_TECH_STACK.frontend;
      case "motion":
        return WEB_TECH_STACK.motion;
      case "threeD":
        return WEB_TECH_STACK.threeD;
      case "backend":
        return WEB_TECH_STACK.backend;
      case "infrastructure":
        return WEB_TECH_STACK.infrastructure;
      default:
        return WEB_TECH_STACK.frontend;
    }
  };

  return (
    <div className="rounded-2xl bg-graphite-card border border-graphite-border p-6 lg:p-8 relative overflow-hidden shadow-2xl">
      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-graphite-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-light mb-1">
              <Cpu className="w-4 h-4 text-indigo-accent" />
              <span>CAPABILITY SYSTEM ARCHITECTURE</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-ivory">
              Engineering Capability Matrix
            </h3>
          </div>
          <span className="text-xs font-mono text-muted-grey bg-graphite px-3 py-1.5 rounded border border-graphite-border self-start sm:self-auto">
            Zero Monolithic Legacy • High Performance
          </span>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 p-3 rounded-lg border text-xs font-mono transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-indigo-accent/15 border-indigo-accent/60 text-ivory glow-indigo"
                    : "bg-graphite border-graphite-border text-muted-grey hover:text-ivory hover:border-graphite-border/80"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-accent" : "text-muted-grey"}`} />
                <span className="font-semibold line-clamp-1">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Technology Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {getActiveStack().map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-4 rounded-xl bg-graphite border border-graphite-border hover:border-indigo-accent/40 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-heading font-bold text-ivory group-hover:text-indigo-light transition-colors">
                  {tech.name}
                </span>
                <span className="w-2 h-2 rounded-full bg-indigo-accent/70 group-hover:animate-ping" />
              </div>
              <p className="text-xs text-muted-grey leading-relaxed">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
