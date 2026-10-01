"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "./sound-context";
import { Globe, TrendingUp, Cpu, Smartphone, Sparkles } from "lucide-react";

export type ServiceType = "web" | "growth" | "ai" | "apps";

interface ServiceTransitionContextType {
  activeService: ServiceType | null;
  isTransitioning: boolean;
  triggerTransition: (service: ServiceType, targetRoute: string) => void;
}

const ServiceTransitionContext = createContext<ServiceTransitionContextType>({
  activeService: null,
  isTransitioning: false,
  triggerTransition: () => {},
});

export const useServiceTransition = () => useContext(ServiceTransitionContext);

export const ServiceTransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { playPortalWeb, playPortalMarketing, playPortalAI, playPortalApps } = useSound();
  const [activeService, setActiveService] = useState<ServiceType | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Find or create dedicated transition root directly under <body>
    let root = document.getElementById("blazebyte-transition-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "blazebyte-transition-root";
      document.body.appendChild(root);
    }
    setPortalTarget(root);
  }, []);

  const triggerTransition = (service: ServiceType, targetRoute: string) => {
    if (isTransitioning) return; // Prevent double clicks / duplicate triggers

    setIsTransitioning(true);
    setActiveService(service);

    // Save selected world in session storage & apply strict viewport scroll locks
    if (typeof window !== "undefined") {
      sessionStorage.setItem("blazebyte_selected_world", service);
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    // Trigger service sound
    if (service === "web") playPortalWeb();
    else if (service === "growth") playPortalMarketing();
    else if (service === "ai") playPortalAI();
    else if (service === "apps") playPortalApps();

    // Execute route transition after 650ms animation sequence
    setTimeout(() => {
      router.push(targetRoute);
    }, 650);

    // Clean up document lock & transition state after route enters cleanly
    setTimeout(() => {
      if (typeof window !== "undefined") {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
      setIsTransitioning(false);
      setActiveService(null);
    }, 1100);
  };

  const getServiceConfig = (service: ServiceType) => {
    switch (service) {
      case "web":
        return {
          bg: "bg-[#F4F1EA]",
          text: "text-[#17191C]",
          accentText: "text-[#3457FF]",
          accentBg: "bg-[#3457FF]",
          border: "border-[#3457FF]",
          code: "01 // WEB",
          name: "WEB",
          tagline: "DIGITAL EXPERIENCES",
          icon: Globe,
        };
      case "growth":
        return {
          bg: "bg-[#17172B]",
          text: "text-[#F6F1E8]",
          accentText: "text-[#FF5C68]",
          accentBg: "bg-[#FF5C68]",
          border: "border-[#FF5C68]",
          code: "02 // GROWTH",
          name: "GROWTH",
          tagline: "DIGITAL MARKETING",
          icon: TrendingUp,
        };
      case "ai":
        return {
          bg: "bg-[#161B22]",
          text: "text-[#F9F9F8]",
          accentText: "text-[#C86D51]",
          accentBg: "bg-[#1B4D3E]",
          border: "border-[#1B4D3E]",
          code: "03 // AI",
          name: "AI",
          tagline: "INTELLIGENT SYSTEMS",
          icon: Cpu,
        };
      case "apps":
        return {
          bg: "bg-[#FFFFFF]",
          text: "text-[#191C21]",
          accentText: "text-[#2563EB]",
          accentBg: "bg-[#2563EB]",
          border: "border-[#2563EB]",
          code: "04 // APPS",
          name: "APPS",
          tagline: "SOFTWARE PRODUCTS",
          icon: Smartphone,
        };
    }
  };

  return (
    <ServiceTransitionContext.Provider
      value={{ activeService, isTransitioning, triggerTransition }}
    >
      {children}

      {/* REACT PORTAL AT DEDICATED BODY ROOT FOR 100% FULL VIEWPORT TAKEOVER */}
      {portalTarget &&
        createPortal(
          <AnimatePresence>
            {isTransitioning && activeService && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  width: "100vw",
                  height: "100dvh",
                  minWidth: "100vw",
                  minHeight: "100dvh",
                  zIndex: 2147483647,
                  overflow: "hidden",
                  margin: 0,
                  padding: 0,
                  boxSizing: "border-box",
                  pointerEvents: "auto",
                }}
                className={`flex flex-col justify-between p-6 sm:p-12 ${
                  getServiceConfig(activeService).bg
                } ${getServiceConfig(activeService).text}`}
              >
                {/* SERVICE SPECIFIC FULL VIEWPORT ANIMATED BACKDROP VECTORS */}
                {activeService === "web" && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#3457FF]/30">
                    <motion.line
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="100%"
                      stroke="currentColor"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.line
                      x1="100%"
                      y1="0"
                      x2="0"
                      y2="100%"
                      stroke="currentColor"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </svg>
                )}

                {activeService === "growth" && (
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="w-full h-full bg-[radial-gradient(#FF5C68_1px,transparent_1px)] [background-size:24px_24px]" />
                  </div>
                )}

                {activeService === "ai" && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#C86D51]/30">
                    <motion.path
                      d="M 50 100 L 300 100 L 500 400 L 900 400 L 1200 200 H 2000"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </svg>
                )}

                {activeService === "apps" && (
                  <div className="absolute top-0 left-0 right-0 h-10 bg-[#0F1115] border-b-2 border-[#2563EB] flex items-center justify-between px-4 text-xs font-mono text-white/80">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span>app.blazebyte.v4 // FULL VIEWPORT TAKEOVER</span>
                    <span>04 // APPS</span>
                  </div>
                )}

                {/* TOP CINEMATIC METADATA HEADER */}
                <div className="relative z-10 flex items-center justify-between font-mono text-xs border-b border-current/20 pb-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-current" />
                    <span className="font-heading font-black text-base uppercase tracking-tight">
                      BLAZEBYTE STUDIO
                    </span>
                  </div>
                  <span className="font-bold uppercase tracking-widest text-xs px-3 py-1 border border-current">
                    {getServiceConfig(activeService).code}
                  </span>
                </div>

                {/* CENTRAL DRAMATIC TITLE CARD (CINEMATIC FULL-SCREEN TYPOGRAPHY) */}
                <div className="relative z-10 max-w-7xl mx-auto w-full my-auto text-center space-y-4">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="font-mono text-xs sm:text-base font-bold uppercase tracking-widest opacity-80"
                  >
                    ENTERING SERVICE WORLD
                  </motion.div>

                  <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="text-[clamp(64px,13vw,200px)] font-heading font-black uppercase tracking-tighter leading-none"
                  >
                    ENTERING
                  </motion.h1>

                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className={`text-[clamp(48px,10vw,160px)] font-heading font-black uppercase tracking-tight leading-none ${
                      getServiceConfig(activeService).accentText
                    }`}
                  >
                    {getServiceConfig(activeService).name}
                  </motion.h2>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="text-sm sm:text-xl font-mono uppercase tracking-widest opacity-90 pt-4"
                  >
                    {getServiceConfig(activeService).tagline}
                  </motion.p>
                </div>

                {/* BOTTOM STATUS BAR */}
                <div className="relative z-10 border-t border-current/20 pt-4 flex items-center justify-between font-mono text-xs opacity-80">
                  <div>blazebyte.store • Full Viewport Route Transition</div>
                  <div className="flex items-center gap-2 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-current animate-ping" />
                    <span>ENTERING {getServiceConfig(activeService).tagline}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalTarget
        )}
    </ServiceTransitionContext.Provider>
  );
};
