import React from "react";
import { SITE_CONFIG } from "@/config/studio-data";



export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2 border-b border-graphite-border pb-6">
        <div className="text-xs font-mono text-indigo-light">LEGAL DOCUMENTATION</div>
        <h1 className="text-4xl font-heading font-extrabold text-ivory">TERMS OF SERVICE</h1>
        <p className="text-xs font-mono text-muted-grey">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-6 text-sm text-ivory-muted leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="text-lg font-heading font-bold text-ivory">01. Acceptance of Terms</h2>
          <p>
            By accessing or using the website <span className="text-ivory font-mono font-semibold">{SITE_CONFIG.domain}</span> or commissioning services from BlazeByte Studio, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-heading font-bold text-ivory">02. Services & Project Scope</h2>
          <p>
            All digital builds, web development, marketing campaigns, and AI automation projects are governed by individual project statements of work (SOW) or project configurator agreements executed between BlazeByte Studio and the client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-heading font-bold text-ivory">03. Intellectual Property</h2>
          <p>
            Upon full settlement of agreed project fees, all bespoke source code, visual designs, and deliverables created specifically for the client transfer to client ownership, excluding open-source core libraries and BlazeByte proprietary framework modules.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-heading font-bold text-ivory">04. Contact Information</h2>
          <p>Direct inquiries regarding terms to <span className="text-ivory font-mono">{SITE_CONFIG.contact.email}</span>.</p>
        </section>
      </div>
    </div>
  );
}

