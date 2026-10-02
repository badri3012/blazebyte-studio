"use client";

import React, { useState } from "react";
import { ArrowRight, Globe, TrendingUp, Cpu, Smartphone, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PortalProps {
  isHovered: boolean;
  isExpanding: boolean;
  onHover: () => void;
  onClick: () => void;
}

// --------------------------------------------------------------------------
// HAND-DRAWN / EDITORIAL SVG ILLUSTRATIONS & EASTER EGG COMPONENTS
// --------------------------------------------------------------------------

const PaperRocketSvg: React.FC<{ isLaunching: boolean }> = ({ isLaunching }) => (
  <div className="relative inline-flex items-center">
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={
        isLaunching
          ? {
              x: [0, 40, 300],
              y: [0, -40, -300],
              scale: [1, 1.2, 0.5],
              opacity: [1, 1, 0],
            }
          : { y: [0, -2, 0] }
      }
      transition={
        isLaunching
          ? { duration: 0.7, ease: "easeOut" }
          : { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }
      className="text-[#D9531E] drop-shadow-md cursor-pointer"
    >
      {/* Hand-drawn paper rocket path */}
      <path d="M4.5 16.5L21.5 3L13.5 21L10.5 13.5L3 10.5L4.5 16.5Z" />
      <path d="M10.5 13.5L21.5 3" />
      <path d="M16 11.5L8.5 19" strokeDasharray="2 2" />
    </motion.svg>
    {isLaunching && (
      <motion.svg
        className="absolute top-0 left-0 w-48 h-48 pointer-events-none -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.6 }}
      >
        <path
          d="M 12 12 Q 50 -20, 180 -140"
          fill="none"
          stroke="#D9531E"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </motion.svg>
    )}
  </div>
);

// --------------------------------------------------------------------------
// 01 — WEB PORTAL (BONE + CHARCOAL + COBALT)
// --------------------------------------------------------------------------
export const EditorialWebPortal: React.FC<PortalProps> = ({
  isHovered,
  isExpanding,
  onHover,
  onClick,
}) => {
  return (
    <motion.div
      onMouseEnter={onHover}
      onClick={onClick}
      animate={isExpanding ? { scale: 1.05, zIndex: 50 } : { scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-none border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[480px] overflow-hidden bg-[#F4F1EA] text-[#17191C] ${
        isHovered || isExpanding
          ? "border-[#3457FF] shadow-[0_20px_50px_rgba(52,87,255,0.25)]"
          : "border-[#17191C]/25 hover:border-[#17191C]"
      }`}
    >
      {/* Dynamic Animated Blueprint Line (Triggers on Click) */}
      <AnimatePresence>
        {isExpanding && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-1 bg-[#3457FF] origin-left z-40"
          />
        )}
      </AnimatePresence>

      {/* 45-55% TOP IMAGE WITH SLIGHT TYPOGRAPHY OVERLAP */}
      <div className="relative h-60 w-full overflow-hidden bg-[#17191C]">
        <motion.img
          src="/images/web-portal-hdr.jpg"
          alt="Contemporary Digital Design Studio"
          animate={
            isHovered
              ? { scale: 1.06, y: -4 }
              : isExpanding
              ? { scale: 1.12 }
              : { scale: 1, y: 0 }
          }
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover filter contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1EA] via-transparent to-black/30" />

        {/* Custom Subtle Architectural Line Drawings & Grid Marks */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#3457FF]/40 opacity-70">
          <line x1="20" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="10" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="30" r="3" fill="currentColor" />
          <text x="28" y="26" fill="#FFFFFF" fontSize="9" fontFamily="monospace">GRID 16:9 // SPEC</text>
        </svg>

        {/* Floating Architectural Badge */}
        <div className="absolute top-3 right-3 font-mono text-[10px] bg-[#17191C]/90 text-[#F4F1EA] px-2 py-1 border border-[#3457FF]/40 flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3457FF] animate-pulse" />
          <span>BONE / COBALT</span>
        </div>
      </div>

      {/* BOTTOM SECTION WITH TYPOGRAPHY OVERLAP & HIERARCHY */}
      <div className="relative z-10 p-6 sm:p-7 -mt-6 bg-[#F4F1EA] space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Service Number & Tag */}
          <div className="flex items-center justify-between font-mono text-xs border-b border-[#17191C]/15 pb-2">
            <span className="font-extrabold text-[#3457FF] tracking-wider">01 // WEB</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#17191C]/70">
              DIGITAL EXPERIENCES
            </span>
          </div>

          {/* Large Title */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3457FF] font-bold block mb-1">
              ARCHITECTURAL ENGINEERING
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-[#17191C] leading-none">
              WEB DEVELOPMENT
            </h3>
          </div>

          {/* Short Description */}
          <p className="text-xs font-sans text-[#17191C]/80 leading-relaxed">
            Websites built around your business, brand and customers. High-performance, bespoke architecture.
          </p>
        </div>

        {/* Capabilities & CTA */}
        <div className="space-y-4 pt-2 border-t border-[#17191C]/15 font-mono">
          <div className="flex justify-between items-center text-[10px] text-[#17191C]/70">
            <span>STARTING TIER: ₹5,000+</span>
            <span className="text-[#3457FF] font-bold">NEXT.JS 16 // TAILWIND</span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-[#3457FF] group-hover:translate-x-1 transition-transform">
            <span className="uppercase tracking-wider">ENTER WEB →</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --------------------------------------------------------------------------
// 02 — GROWTH PORTAL (DEEP BURGUNDY + CREAM + BURNT ORANGE)
// --------------------------------------------------------------------------
export const CampaignGrowthPortal: React.FC<PortalProps> = ({
  isHovered,
  isExpanding,
  onHover,
  onClick,
}) => {
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);

  const handleClick = () => {
    setIsRocketLaunching(true);
    onClick();
  };

  return (
    <motion.div
      onMouseEnter={onHover}
      onClick={handleClick}
      animate={isExpanding ? { scale: 1.05, zIndex: 50 } : { scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-none border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[480px] overflow-hidden bg-[#3B0A11] text-[#FAF6F0] ${
        isHovered || isExpanding
          ? "border-[#D9531E] shadow-[0_20px_50px_rgba(217,83,30,0.3)]"
          : "border-[#D9531E]/30 hover:border-[#D9531E]"
      }`}
    >
      {/* ASYMMETRIC MAGAZINE PANEL COMPOSITION: IMAGE ON LEFT/TOP */}
      <div className="relative h-60 w-full overflow-hidden bg-[#28050B]">
        <motion.img
          src="/images/growth-portal-hdr.jpg"
          alt="Creative Advertising Studio Campaign Desk"
          animate={
            isHovered
              ? { scale: 1.06, y: -4 }
              : isExpanding
              ? { scale: 1.12 }
              : { scale: 1, y: 0 }
          }
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover filter contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B0A11] via-transparent to-black/40" />

        {/* Editorial Hand-Drawn Arrow & Campaign Circle Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#D9531E]/60">
          <ellipse cx="80%" cy="35%" rx="35" ry="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M 40 120 Q 80 80, 140 110" fill="none" stroke="#FAF6F0" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="142,108 145,115 138,114" fill="#FAF6F0" />
        </svg>

        <div className="absolute top-3 right-3 font-mono text-[10px] bg-[#3B0A11]/90 text-[#FAF6F0] px-2 py-1 border border-[#D9531E] shadow-md">
          <span>MAGAZINE ENGINE</span>
        </div>
      </div>

      {/* CONTENT AREA WITH LARGE TYPOGRAPHY & EASTER EGG ROCKET */}
      <div className="relative z-10 p-6 sm:p-7 -mt-6 bg-[#3B0A11] space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs border-b border-[#FAF6F0]/20 pb-2">
            <span className="font-extrabold text-[#D9531E] tracking-wider">02 // GROWTH</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/70">
              DIGITAL MARKETING
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D9531E] font-bold block mb-1">
              CAMPAIGN ACQUISITION ENGINE
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-[#FAF6F0] leading-none">
              DIGITAL MARKETING
            </h3>
          </div>

          <p className="text-xs font-sans text-[#FAF6F0]/85 leading-relaxed">
            Turn attention into enquiries, high-intent leads, and revenue growth.
          </p>
        </div>

        {/* Bottom CTA with Easter Egg Paper Rocket Interaction */}
        <div className="space-y-4 pt-2 border-t border-[#FAF6F0]/20 font-mono">
          <div className="flex justify-between items-center text-[10px] text-[#FAF6F0]/70">
            <span>MONTHLY ENGINE: ₹10,000+</span>
            <span className="text-[#D9531E] font-bold">SEO // ADS // CRO</span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-[#D9531E] group-hover:translate-x-1 transition-transform">
            <div className="flex items-center gap-2">
              <span className="uppercase tracking-wider">ENTER GROWTH</span>
              <PaperRocketSvg isLaunching={isRocketLaunching} />
            </div>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --------------------------------------------------------------------------
// 03 — AI PORTAL (SLATE + WARM WHITE + FOREST GREEN + MUTED COPPER)
// --------------------------------------------------------------------------
export const SystemAIPortal: React.FC<PortalProps> = ({
  isHovered,
  isExpanding,
  onHover,
  onClick,
}) => {
  return (
    <motion.div
      onMouseEnter={onHover}
      onClick={onClick}
      animate={isExpanding ? { scale: 1.05, zIndex: 50 } : { scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-none border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[480px] overflow-hidden bg-[#161B22] text-[#F9F9F8] ${
        isHovered || isExpanding
          ? "border-[#1B4D3E] shadow-[0_20px_50px_rgba(27,77,62,0.4)]"
          : "border-[#1B4D3E]/40 hover:border-[#1B4D3E]"
      }`}
    >
      {/* TECHNICAL IMAGE WITH INTEGRATED BLUEPRINT DIAGRAM OVERLAY */}
      <div className="relative h-60 w-full overflow-hidden bg-[#0D1117]">
        <motion.img
          src="/images/ai-portal-hdr.jpg"
          alt="Systems Engineering Blueprint Workstation"
          animate={
            isHovered
              ? { scale: 1.06, y: -4 }
              : isExpanding
              ? { scale: 1.12 }
              : { scale: 1, y: 0 }
          }
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover filter contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-black/40" />

        {/* Technical Workflow Node Connection Animation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#C86D51]/70">
          <path d="M 30 140 H 120 V 60 H 220" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="30" cy="140" r="3" fill="#C86D51" />
          <circle cx="120" cy="60" r="3" fill="#1B4D3E" />
          <circle cx="220" cy="60" r="3" fill="#C86D51" />
          <text x="35" y="135" fill="#F9F9F8" fontSize="8" fontFamily="monospace">INPUT</text>
          <text x="125" y="55" fill="#F9F9F8" fontSize="8" fontFamily="monospace">PROCESS</text>
          <text x="225" y="55" fill="#C86D51" fontSize="8" fontFamily="monospace">ACTION</text>
        </svg>

        <div className="absolute top-3 right-3 font-mono text-[10px] bg-[#161B22]/90 text-[#F9F9F8] px-2 py-1 border border-[#1B4D3E] shadow-md">
          <span>SYS-AI // 03</span>
        </div>
      </div>

      {/* CONTENT AREA WITH TECHNICAL WORKFLOW SPECIFICATIONS */}
      <div className="relative z-10 p-6 sm:p-7 -mt-6 bg-[#161B22] space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs border-b border-[#F9F9F8]/15 pb-2">
            <span className="font-extrabold text-[#C86D51] tracking-wider">03 // AI</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F9F9F8]/70">
              INTELLIGENT SYSTEMS
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86D51] font-bold block mb-1">
              WORKFLOW AUTOMATION
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-[#F9F9F8] leading-none">
              AI SOLUTIONS
            </h3>
          </div>

          <p className="text-xs font-sans text-[#F9F9F8]/85 leading-relaxed">
            Automate repetitive operations, connect API infrastructure, and deploy smart agentic workflows.
          </p>
        </div>

        {/* Bottom Capabilities & CTA */}
        <div className="space-y-4 pt-2 border-t border-[#F9F9F8]/15 font-mono">
          <div className="flex justify-between items-center text-[10px] text-[#F9F9F8]/70">
            <span>SYSTEM TIER: ₹25,000+</span>
            <span className="text-[#C86D51] font-bold">RAG // APIs // WORKFLOW</span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-[#C86D51] group-hover:translate-x-1 transition-transform">
            <span className="uppercase tracking-wider">ENTER AI →</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --------------------------------------------------------------------------
// 04 — APPS PORTAL (WHITE + GRAPHITE + ROYAL BLUE + MUTED CORAL)
// --------------------------------------------------------------------------
export const ProductAppPortal: React.FC<PortalProps> = ({
  isHovered,
  isExpanding,
  onHover,
  onClick,
}) => {
  return (
    <motion.div
      onMouseEnter={onHover}
      onClick={onClick}
      animate={isExpanding ? { scale: 1.05, zIndex: 50 } : { scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-none border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[480px] overflow-hidden bg-[#191C21] text-[#FFFFFF] ${
        isHovered || isExpanding
          ? "border-[#2563EB] shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
          : "border-[#2563EB]/30 hover:border-[#2563EB]"
      }`}
    >
      {/* SOFTWARE WINDOW COMPOSITION: TITLEBAR CONTROLS & PRODUCTION DISPLAY */}
      <div className="relative h-60 w-full overflow-hidden bg-[#0F1115]">
        {/* Titlebar Overlay */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-[#0B0D10]/90 z-20 border-b border-[#2563EB]/20 flex items-center justify-between px-3 text-[9px] font-mono text-white/60">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <span>app.blazebyte.v4</span>
          <span>SYSTEM MODULE</span>
        </div>

        <motion.img
          src="/images/apps-portal-hdr.jpg"
          alt="Product Software Studio Displays"
          animate={
            isHovered
              ? { scale: 1.06, y: -4 }
              : isExpanding
              ? { scale: 1.12 }
              : { scale: 1, y: 0 }
          }
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover filter contrast-[1.05] pt-6"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191C21] via-transparent to-black/30 pt-6" />

        {/* Component Tags Pills Overlay */}
        <div className="absolute bottom-3 left-3 z-10 flex gap-1 font-mono text-[9px]">
          <span className="px-2 py-0.5 bg-[#2563EB]/80 text-white font-bold border border-white/20">
            AUTH
          </span>
          <span className="px-2 py-0.5 bg-[#191C21]/90 text-white font-bold border border-white/20">
            DATABASE
          </span>
          <span className="px-2 py-0.5 bg-[#EF4444]/80 text-white font-bold border border-white/20">
            API
          </span>
        </div>
      </div>

      {/* CONTENT AREA WITH SOFTWARE PRODUCT SPECIFICATIONS */}
      <div className="relative z-10 p-6 sm:p-7 -mt-4 bg-[#191C21] space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs border-b border-white/15 pb-2">
            <span className="font-extrabold text-[#2563EB] tracking-wider">04 // APPS</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">
              SOFTWARE PRODUCTS
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#2563EB] font-bold block mb-1">
              PRODUCT ENGINEERING
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-white leading-none">
              APP DEVELOPMENT
            </h3>
          </div>

          <p className="text-xs font-sans text-white/85 leading-relaxed">
            Custom web applications, dashboards, SaaS platforms, and internal business tools.
          </p>
        </div>

        {/* Bottom Capabilities & CTA */}
        <div className="space-y-4 pt-2 border-t border-white/15 font-mono">
          <div className="flex justify-between items-center text-[10px] text-white/70">
            <span>CUSTOM SCOPE: ₹50,000+</span>
            <span className="text-[#2563EB] font-bold">FULL-STACK // REACT</span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-[#2563EB] group-hover:translate-x-1 transition-transform">
            <span className="uppercase tracking-wider">ENTER APPS →</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

