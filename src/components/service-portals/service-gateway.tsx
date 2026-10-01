"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/context/sound-context";
import { useServiceTransition, ServiceType } from "@/context/service-transition-context";
import { Sparkles } from "lucide-react";
import {
  EditorialWebPortal,
  CampaignGrowthPortal,
  SystemAIPortal,
  ProductAppPortal,
} from "./portal-components";

export const ServiceGateway = () => {
  const { playHover } = useSound();
  const { triggerTransition, isTransitioning, activeService } = useServiceTransition();
  const [hoveredPortal, setHoveredPortal] = useState<string>("web");

  const portalMeta = {
    web: {
      id: "web",
      tag: "DIGITAL EXPERIENCES",
      bgClass: "bg-[#0B0D10] text-[#F4F3EE]",
      previewImage: "/images/web-portal-hdr.jpg",
    },
    marketing: {
      id: "marketing",
      tag: "GROWTH ENGINE",
      bgClass: "bg-[#0B0D10] text-[#F6F1E8]",
      previewImage: "/images/indigo-anime-marketing-hero.jpg",
    },
    ai: {
      id: "ai",
      tag: "INTELLIGENT SYSTEMS",
      bgClass: "bg-[#0B0D10] text-[#F9F9F8]",
      previewImage: "/images/ai-portal-hdr.jpg",
    },
    apps: {
      id: "apps",
      tag: "CUSTOM SOFTWARE",
      bgClass: "bg-[#0B0D10] text-[#FFFFFF]",
      previewImage: "/images/apps-portal-hdr.jpg",
    },
  };

  const currentMeta = portalMeta[hoveredPortal as keyof typeof portalMeta] || portalMeta.web;

  const handlePortalClick = (id: string, route: string) => {
    if (isTransitioning) return;
    const serviceType = (id === "marketing" ? "growth" : id) as ServiceType;
    triggerTransition(serviceType, route);
  };

  return (
    <div
      className={`min-h-[95vh] flex flex-col justify-between transition-colors duration-700 relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8 font-sans ${currentMeta.bgClass}`}
    >
      {/* DEEP GRAPHITE AMBIENT ATMOSPHERE BACKGROUND WITH REDUCED VISUAL NOISE */}
      <div className="absolute inset-0 bg-radial-gradient from-[#171A20] via-[#0B0D10] to-[#0B0D10] pointer-events-none z-0" />

      <AnimatePresence mode="wait">
        <motion.div
          key={hoveredPortal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <img
            src={currentMeta.previewImage}
            alt={hoveredPortal}
            className="w-full h-full object-cover filter grayscale contrast-125 blur-sm"
          />
        </motion.div>
      </AnimatePresence>

      {/* TOP MINIMAL EDITORIAL BRANDING */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#F4F3EE]/15 pb-4 font-mono text-xs max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="font-heading font-black text-xl uppercase tracking-tight text-[#FFFFFF]">
            BLAZEBYTE STUDIO
          </span>
          <span className="hidden sm:inline-block text-[10px] px-2.5 py-0.5 border border-[#F4F3EE]/30 text-[#B8BDC7] font-bold">
            DIGITAL EXPERIENCES / GROWTH / INTELLIGENT SYSTEMS
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#B8BDC7] font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#3457FF]" />
          <span>SERVICE SELECTOR GATEWAY</span>
        </div>
      </div>

      {/* CENTRAL GATEWAY QUESTION & 4 ART-DIRECTED PORTALS */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-10 space-y-12">
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 border border-[#F4F3EE]/20 rounded-full inline-block text-[#B8BDC7]">
            SERVICE DISCOVERY // CHOOSE YOUR WORLD
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight leading-none text-[#FFFFFF]">
            WHAT ARE YOU HERE TO BUILD?
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#B8BDC7] max-w-xl mx-auto">
            Select a service portal below to explore custom-engineered systems, visual portfolios and package specifications.
          </p>
        </div>

        {/* 4 ART-DIRECTED SERVICE PORTALS WITH DISTINCT GEOMETRIES & IMAGE PLACEMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EditorialWebPortal
            isHovered={hoveredPortal === "web"}
            isExpanding={activeService === "web"}
            onHover={() => {
              if (!isTransitioning) {
                setHoveredPortal("web");
                playHover();
              }
            }}
            onClick={() => handlePortalClick("web", "/web")}
          />

          <CampaignGrowthPortal
            isHovered={hoveredPortal === "marketing"}
            isExpanding={activeService === "growth"}
            onHover={() => {
              if (!isTransitioning) {
                setHoveredPortal("marketing");
                playHover();
              }
            }}
            onClick={() => handlePortalClick("marketing", "/marketing")}
          />

          <SystemAIPortal
            isHovered={hoveredPortal === "ai"}
            isExpanding={activeService === "ai"}
            onHover={() => {
              if (!isTransitioning) {
                setHoveredPortal("ai");
                playHover();
              }
            }}
            onClick={() => handlePortalClick("ai", "/ai")}
          />

          <ProductAppPortal
            isHovered={hoveredPortal === "apps"}
            isExpanding={activeService === "apps"}
            onHover={() => {
              if (!isTransitioning) {
                setHoveredPortal("apps");
                playHover();
              }
            }}
            onClick={() => handlePortalClick("apps", "/apps")}
          />
        </div>
      </div>

      {/* FOOTER METADATA */}
      <div className="relative z-10 border-t border-[#F4F3EE]/15 pt-4 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-[#B8BDC7] gap-2 max-w-7xl mx-auto w-full">
        <div>blazebyte.store • High-Performance Technology & Design Studio</div>
        <div className="font-bold text-[#FFFFFF]">
          Selected Environment: {currentMeta.tag} ({hoveredPortal.toUpperCase()})
        </div>
      </div>
    </div>
  );
};
