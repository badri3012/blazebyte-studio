"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { SITE_CONFIG, PORTALS } from "@/config/studio-data";
import { useSound } from "@/context/sound-context";
import { ArrowUpRight, Mail, MessageSquare, ShieldCheck, FileText } from "lucide-react";

export const Footer = () => {
  const { playHover, playClick, soundEnabled, toggleSound } = useSound();

  return (
    <footer className="bg-graphite border-t border-graphite-border pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Background Architectural Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-graphite-border">
          {/* Brand & Positioning Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo showTagline={true} />
            <p className="text-sm text-muted-grey max-w-sm leading-relaxed">
              {SITE_CONFIG.positioning}
            </p>
            <div className="pt-2 flex flex-col space-y-2">
              <div className="text-xs font-mono text-ivory-muted flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Available for New Projects & Strategy Calls</span>
              </div>
              <p className="text-xs text-muted-grey font-mono">
                Official Domain: <span className="text-ivory font-semibold">{SITE_CONFIG.domain}</span>
              </p>
            </div>
          </div>

          {/* Service Portals */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-ivory">
              Service Systems
            </h3>
            <ul className="space-y-2 text-sm">
              {PORTALS.map((portal) => (
                <li key={portal.id}>
                  <Link
                    href={portal.route}
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="text-muted-grey hover:text-ivory transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{portal.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-ivory" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-ivory">
              Studio
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/work"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="text-muted-grey hover:text-ivory transition-colors"
                >
                  Work / Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/process"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="text-muted-grey hover:text-ivory transition-colors"
                >
                  5-Stage Process
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="text-muted-grey hover:text-ivory transition-colors"
                >
                  About Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="text-muted-grey hover:text-ivory transition-colors"
                >
                  Project Configurator
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Communication & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-ivory">
              Direct Contact
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-muted-grey hover:text-ivory transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-indigo-accent" />
                  <span>{SITE_CONFIG.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-grey hover:text-ivory transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-teal-accent" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={toggleSound}
                  className="text-xs text-muted-grey hover:text-ivory font-mono underline cursor-pointer"
                >
                  Sound Design Mode: {soundEnabled ? "Enabled" : "Disabled"}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-grey font-mono">
          <div className="space-y-1 text-center md:text-left">
            <div>
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved. Domain: {SITE_CONFIG.domain}
            </div>
            <div className="text-[10px] opacity-70">
              {SITE_CONFIG.location.display} — Udyam: UDYAM-TN-03-0334061
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <Link
              href="/privacy-policy"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:text-ivory transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy</span>
            </Link>
            <Link
              href="/terms-and-conditions"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:text-ivory transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms</span>
            </Link>
            <Link
              href="/refund-policy"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:text-ivory transition-colors flex items-center gap-1"
            >
              <span>Refund Policy</span>
            </Link>
            <Link
              href="/faq"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:text-ivory transition-colors"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
