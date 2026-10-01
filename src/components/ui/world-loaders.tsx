"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  world: "web" | "marketing" | "ai" | "apps";
  onComplete?: () => void;
}

export const WorldLoader: React.FC<LoaderProps> = ({ world, onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    // Quick, performance-conscious load sequence (<1.2s total)
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 650);
    const t3 = setTimeout(() => setStage(3), 950);
    const t4 = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 1250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 font-mono ${
          world === "web"
            ? "bg-[#F4F1EA] text-[#17191C]"
            : world === "marketing"
            ? "bg-[#071522] text-[#F2F7F7]"
            : world === "ai"
            ? "bg-[#090B0F] text-[#EDEFF5]"
            : "bg-[#202631] text-[#F5F6F8]"
        }`}
      >
        {/* WORLD 01 — WEB: Architectural Grid Frame Assembly */}
        {world === "web" && (
          <div className="w-full max-w-sm border border-[#17191C]/30 p-8 space-y-6 relative bg-web-grid">
            <div className="absolute top-2 left-2 text-[10px] uppercase font-mono tracking-widest text-[#3457FF]">
              BLAZEBYTE / WEB SYSTEM
            </div>
            <div className="text-center space-y-2 pt-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-heading font-extrabold tracking-tight text-[#17191C]"
              >
                WEB
              </motion.div>
              <div className="text-xs font-mono text-[#7257FF]">
                {stage === 0 && "INITIALISING ARCHITECTURAL FRAME..."}
                {stage === 1 && "RESOLVING TYPOGRAPHY GRID..."}
                {stage === 2 && "SYSTEM READY."}
                {stage === 3 && "ENTER ENVIRONMENT."}
              </div>
            </div>
            <div className="h-1 bg-[#D8D2C7] w-full overflow-hidden rounded-full">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${(stage + 1) * 25}%` }}
                className="h-full bg-[#3457FF]"
              />
            </div>
          </div>
        )}

        {/* WORLD 02 — MARKETING: Growth Signal Calibration */}
        {world === "marketing" && (
          <div className="w-full max-w-sm border border-[#24D6C5]/30 p-8 space-y-6 relative bg-marketing-grid">
            <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[#24D6C5]">
              <span>MARKETING COMMAND</span>
              <span>CALIBRATION</span>
            </div>
            <div className="space-y-3 pt-2">
              <div className="text-sm font-bold text-[#F2F7F7] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#24D6C5] animate-ping" />
                <span>
                  {stage === 0 && "CALIBRATING MARKET SIGNAL..."}
                  {stage === 1 && "ANALYSING AUDIENCE PATTERNS..."}
                  {stage === 2 && "BUILDING ACQUISITION SYSTEM..."}
                  {stage === 3 && "GROWTH SYSTEM READY."}
                </span>
              </div>
              <div className="w-full h-12 border border-[#0C2238] rounded bg-[#071522] flex items-center px-3 overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="w-1/3 h-0.5 bg-gradient-to-r from-transparent via-[#24D6C5] to-transparent shadow-[0_0_10px_#24D6C5]"
                />
              </div>
            </div>
          </div>
        )}

        {/* WORLD 03 — AI: Autonomous Node Activation */}
        {world === "ai" && (
          <div className="w-full max-w-sm border border-[#7C5CFF]/40 p-8 space-y-6 relative bg-ai-topology">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#6FFFD2]">
              AI CORE INITIALISING
            </div>
            <div className="flex items-center justify-center gap-4 py-4">
              {[0, 1, 2].map((idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: stage >= idx ? [1, 1.3, 1] : 1,
                    backgroundColor: stage >= idx ? "#7C5CFF" : "#11151B",
                  }}
                  className="w-4 h-4 rounded-full border border-[#7C5CFF]"
                />
              ))}
            </div>
            <div className="text-xs text-center font-mono text-[#C5B8FF]">
              {stage === 0 && "LOADING KNOWLEDGE LAYER..."}
              {stage === 1 && "CONNECTING WORKFLOW NODES..."}
              {stage === 2 && "AUTOMATION ENGINE READY."}
              {stage === 3 && "AI SYSTEM ONLINE."}
            </div>
          </div>
        )}

        {/* WORLD 04 — APPS: Software Window Boot */}
        {world === "apps" && (
          <div className="w-full max-w-sm border border-[#6246EA]/40 rounded-lg p-6 space-y-4 bg-[#202631] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DDE2E8]/20 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B5E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2D479]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#6246EA]" />
              </div>
              <span className="text-[10px] font-mono text-[#DDE2E8]">BLAZEBYTE APP ENGINE</span>
            </div>
            <div className="space-y-2 text-xs font-mono text-[#DDE2E8] pt-2">
              <div>&gt; {stage >= 0 ? "LOADING MODULE COMPONENTS..." : ""}</div>
              <div>&gt; {stage >= 1 ? "CONNECTING DATABASE & RBAC..." : ""}</div>
              <div>&gt; {stage >= 2 ? "INITIALISING UI WINDOW SHELL..." : ""}</div>
              <div className="text-[#F2D479] font-bold">&gt; {stage >= 3 ? "SYSTEM READY." : ""}</div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
