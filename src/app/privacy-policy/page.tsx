import React from "react";
import { SITE_CONFIG } from "@/config/studio-data";

export const metadata = {
  title: "Privacy Policy | BlazeByte Studio",
  description: "Privacy policy and data protection policies for blazebyte.shop",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2 border-b border-graphite-border pb-6">
        <div className="text-xs font-mono text-indigo-light">LEGAL DOCUMENTATION</div>
        <h1 className="text-4xl font-heading font-extrabold text-ivory">PRIVACY POLICY</h1>
        <p className="text-xs font-mono text-muted-grey">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-6 text-sm text-ivory-muted leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="text-lg font-heading font-bold text-ivory">01. Overview</h2>
          <p>
            BlazeByte Studio ("{SITE_CONFIG.name}", "we", "us", or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website at <span className="text-ivory font-mono font-semibold">{SITE_CONFIG.domain}</span> or interact with our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-heading font-bold text-ivory">02. Information We Collect</h2>
          <p>We only collect personal information that you voluntarily provide to us when submitting an inquiry or project configuration form. This includes:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Contact details: Name, email address, phone number</li>
            <li>Project information: Service requirements, budget estimates, project details</li>
            <li>Technical usage data: Anonymous IP addresses, browser types, and referral paths for analytics</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-heading font-bold text-ivory">03. Use of Information</h2>
          <p>We use your information strictly to:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Respond to project proposals and service inquiries</li>
            <li>Communicate project milestones, proposals, and invoices</li>
            <li>Improve performance and security on {SITE_CONFIG.domain}</li>
          </ul>
          <p className="text-xs text-muted-grey mt-2">We never sell, rent, or trade client data to third-party advertising brokers.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-heading font-bold text-ivory">04. Contact Us</h2>
          <p>If you have any questions regarding this Privacy Policy, please contact us at <span className="text-ivory font-mono">{SITE_CONFIG.contact.email}</span>.</p>
        </section>
      </div>
    </div>
  );
}
