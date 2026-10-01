"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSound } from "@/context/sound-context";
import { useServiceTransition, ServiceType } from "@/context/service-transition-context";
import { Volume2, VolumeX, ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { PORTALS } from "@/config/studio-data";

export const Navbar = () => {
  const pathname = usePathname();
  const { soundEnabled, toggleSound, playHover, playClick } = useSound();
  const { triggerTransition } = useServiceTransition();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServiceNavigation = (serviceId: string, route: string) => {
    playClick();
    setServicesOpen(false);
    setMobileMenuOpen(false);
    const serviceType = (serviceId === "marketing" ? "growth" : serviceId) as ServiceType;
    triggerTransition(serviceType, route);
  };

  const activeOrderRoute = pathname.startsWith("/marketing")
    ? "/marketing/order"
    : pathname.startsWith("/ai")
    ? "/ai/order"
    : pathname.startsWith("/apps")
    ? "/apps/order"
    : "/web/order";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0D10]/95 backdrop-blur-md border-b border-[#242832] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo: BLAZEBYTE Minimal Brand Lockup with Paper Rocket Signature */}
          <Link
            href="/"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group inline-flex items-center gap-2 font-heading font-black text-lg sm:text-xl tracking-tight text-[#F4F3EE] uppercase select-none cursor-pointer"
          >
            <span className="tracking-tight text-[#F4F3EE] group-hover:text-white transition-colors">
              BLAZEBYTE
            </span>

            {/* Paper Rocket Icon Container with Ink Trail */}
            <div className="relative inline-flex items-center justify-center shrink-0">
              {/* Subtle Ink/Paper Trail on Hover */}
              <svg
                viewBox="0 0 20 20"
                className="absolute -bottom-1 -left-1 w-3.5 h-3.5 pointer-events-none text-[#3457FF] opacity-0 group-hover:opacity-70 transition-all duration-300 ease-out group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="1.5 1.5"
              >
                <line x1="3" y1="17" x2="10" y2="10" />
                <circle cx="2" cy="18" r="0.6" fill="currentColor" />
              </svg>

              {/* Minimal Hand-Drawn Paper Rocket SVG */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3457FF] transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:translate-x-1.5 group-active:translate-x-2 group-active:-translate-y-2 group-active:scale-95 shrink-0"
              >
                <path d="M12 2.5L19.5 21.5L12 17.5L4.5 21.5L12 2.5Z" />
                <path d="M12 2.5V17.5" />
                <path d="M12 12L19.5 21.5" strokeOpacity="0.35" />
              </svg>
            </div>

            {/* Editorial Metadata STUDIO Label */}
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 border border-[#242832] bg-[#171A20]/90 text-[#B8BDC7] group-hover:border-[#3457FF]/60 group-hover:text-[#F4F3EE] transition-all rounded-[2px] leading-none shrink-0">
              STUDIO
            </span>
          </Link>

          {/* Desktop Minimal Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider uppercase">
            <Link
              href="/work"
              onMouseEnter={playHover}
              onClick={playClick}
              className={`transition-colors hover:text-[#3457FF] ${
                pathname === "/work" ? "text-[#F4F3EE] font-bold underline underline-offset-4 decoration-[#3457FF]" : "text-[#B8BDC7]"
              }`}
            >
              WORK
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                setServicesOpen(true);
                playHover();
              }}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 transition-colors hover:text-[#3457FF] cursor-pointer ${
                  pathname.startsWith("/web") ||
                  pathname.startsWith("/marketing") ||
                  pathname.startsWith("/ai") ||
                  pathname.startsWith("/apps") ||
                  pathname === "/services"
                    ? "text-[#F4F3EE] font-bold underline underline-offset-4 decoration-[#3457FF]"
                    : "text-[#B8BDC7]"
                }`}
              >
                <span>SERVICES</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Flyout Panel */}
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#171A20] border-2 border-[#242832] p-2 z-50 shadow-2xl animate-in fade-in duration-150">
                  <div className="text-[10px] font-mono text-[#B8BDC7] px-3 py-1 border-b border-[#242832] mb-1">
                    SERVICE WORLDS
                  </div>
                  {PORTALS.map((portal) => (
                    <button
                      key={portal.id}
                      onClick={() => handleServiceNavigation(portal.id, portal.route)}
                      onMouseEnter={playHover}
                      className="w-full flex items-center justify-between p-2.5 hover:bg-[#242832] transition-colors text-[#F4F3EE] group text-left cursor-pointer"
                    >
                      <span className="font-heading font-bold text-xs">{portal.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#3457FF]" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              onMouseEnter={playHover}
              onClick={playClick}
              className={`transition-colors hover:text-[#3457FF] ${
                pathname === "/about" ? "text-[#F4F3EE] font-bold underline underline-offset-4 decoration-[#3457FF]" : "text-[#B8BDC7]"
              }`}
            >
              STUDIO
            </Link>

            <Link
              href="/process"
              onMouseEnter={playHover}
              onClick={playClick}
              className={`transition-colors hover:text-[#3457FF] ${
                pathname === "/process" ? "text-[#F4F3EE] font-bold underline underline-offset-4 decoration-[#3457FF]" : "text-[#B8BDC7]"
              }`}
            >
              PROCESS
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4 font-mono text-xs">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={playHover}
              title={soundEnabled ? "Mute UI Sound Design" : "Enable UI Sound Design"}
              className={`p-2 border transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-[#3457FF]/20 border-[#3457FF] text-[#F4F3EE]"
                  : "bg-[#171A20] border-[#242832] text-[#B8BDC7] hover:text-[#F4F3EE]"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#3457FF]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Primary Action Button: START A PROJECT */}
            <Link href={activeOrderRoute} onClick={playClick} className="hidden sm:inline-block">
              <button
                onMouseEnter={playHover}
                className="px-4 py-2.5 bg-[#F4F3EE] text-[#0B0D10] font-heading font-bold text-xs uppercase hover:bg-[#3457FF] hover:text-[#F4F3EE] border border-[#F4F3EE] transition-all cursor-pointer"
              >
                START A PROJECT
              </button>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 border border-[#242832] bg-[#171A20] text-[#F4F3EE]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0D10] border-b border-[#242832] px-6 py-6 space-y-4 font-mono text-xs animate-in fade-in duration-200">
          <div className="text-[#B8BDC7] border-b border-[#242832] pb-2">SERVICE WORLDS</div>
          <div className="grid grid-cols-2 gap-2">
            {PORTALS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleServiceNavigation(p.id, p.route)}
                className="p-3 bg-[#171A20] border border-[#242832] text-[#F4F3EE] font-bold text-center cursor-pointer"
              >
                {p.title}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col space-y-2 border-t border-[#242832]">
            <Link
              href="/work"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#F4F3EE] font-bold"
            >
              WORK / CASE STUDIES
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#F4F3EE] font-bold"
            >
              STUDIO PHILOSOPHY
            </Link>
            <Link
              href={activeOrderRoute}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 bg-[#3457FF] text-[#F4F3EE] text-center font-bold font-heading uppercase"
            >
              START A PROJECT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
