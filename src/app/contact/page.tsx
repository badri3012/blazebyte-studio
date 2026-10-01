"use client";

import React, { Suspense } from "react";
import { ProjectConfigurator } from "@/components/forms/project-configurator";
import { SITE_CONFIG } from "@/config/studio-data";
import { Mail, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

function ContactContent() {
  return (
    <div className="space-y-16 pb-20">
      {/* HEADER */}
      <section className="relative py-14 overflow-hidden border-b border-graphite-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-graphite-card border border-graphite-border text-xs font-mono text-indigo-light">
            <Sparkles className="w-3.5 h-3.5 text-indigo-accent" />
            <span>INTERACTIVE PROJECT CONFIGURATOR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-ivory uppercase tracking-tight">
            START A PROJECT BUILD
          </h1>

          <p className="text-base sm:text-lg text-muted-grey max-w-2xl">
            Configure your project scope, select budget parameters, and receive an architectural proposal or direct WhatsApp fast-track response.
          </p>
        </div>
      </section>

      {/* CONFIGURATOR & DIRECT DETAILS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ProjectConfigurator />
          </div>

          {/* Direct Studio Channels Box */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-graphite-card border border-graphite-border space-y-6">
              <h3 className="text-lg font-heading font-bold text-ivory border-b border-graphite-border pb-3">
                Direct Communication
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <div className="text-muted-grey mb-1">Email Channel</div>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-ivory font-semibold hover:text-indigo-light transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-indigo-accent" />
                    <span>{SITE_CONFIG.contact.email}</span>
                  </a>
                </div>

                <div>
                  <div className="text-muted-grey mb-1">WhatsApp Fast-Track</div>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory font-semibold hover:text-teal-light transition-colors flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-teal-accent" />
                    <span>{SITE_CONFIG.contact.whatsapp}</span>
                  </a>
                </div>

                <div>
                  <div className="text-muted-grey mb-1">Official Domain</div>
                  <div className="text-ivory font-semibold">{SITE_CONFIG.domain}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-graphite-border text-[11px] text-muted-grey space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Response SLA: &lt; 12 Hours</span>
                </div>
                <p>We review every proposal to evaluate scope, timeline feasibility, and technical stack fit.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-graphite-card border border-graphite-border text-xs text-muted-grey space-y-2">
              <div className="font-heading font-bold text-ivory text-sm">Security & Confidentiality</div>
              <p className="leading-relaxed">
                All client specifications, project concepts, and submitted business details remain strictly confidential under non-disclosure standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-ivory font-mono">Loading Configurator...</div>}>
      <ContactContent />
    </Suspense>
  );
}
