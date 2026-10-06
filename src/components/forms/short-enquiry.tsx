"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

export function ShortEnquiryForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState("web");
  const [req, setReq] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) {
      setErrorMsg("Please provide name and contact info.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: contact.includes("@") ? contact : "Not provided",
          phone: !contact.includes("@") ? contact : "Not provided",
          service,
          details: req,
          goal: "Short Enquiry",
          budget: "Not Specified",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        trackEvent("form_submit", { form_id: "short_enquiry", service });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit enquiry.");
      }
    } catch {
      setErrorMsg("Network error occurred. Please use WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-xl bg-teal-accent/10 border border-teal-accent/30 text-center space-y-3">
        <CheckCircle2 className="w-6 h-6 text-teal-accent mx-auto" />
        <p className="text-sm font-semibold text-ivory">Enquiry Received</p>
        <p className="text-xs text-muted-grey">We'll respond within 12 hours.</p>
        <Button variant="ghost" size="sm" onClick={() => setSubmitted(false)}>Reset</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-2 rounded bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /><span>{errorMsg}</span>
        </div>
      )}
      <div>
        <label className="block text-xs font-mono text-muted-grey mb-1">Your Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-[#101014] border border-graphite-border rounded px-3 py-2 text-sm text-ivory outline-none focus:border-indigo-accent transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-muted-grey mb-1">Email or Phone *</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="w-full bg-[#101014] border border-graphite-border rounded px-3 py-2 text-sm text-ivory outline-none focus:border-indigo-accent transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-mono text-muted-grey mb-1">Service Needed</label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full bg-[#101014] border border-graphite-border rounded px-3 py-2 text-sm text-ivory outline-none focus:border-indigo-accent transition-colors"
        >
          <option value="web">Web Development</option>
          <option value="marketing">Digital Marketing</option>
          <option value="ai">AI Automation</option>
          <option value="apps">Custom App</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-mono text-muted-grey mb-1">Brief Requirement (Optional)</label>
        <textarea
          value={req}
          onChange={(e) => setReq(e.target.value)}
          rows={2}
          className="w-full bg-[#101014] border border-graphite-border rounded px-3 py-2 text-sm text-ivory outline-none focus:border-indigo-accent transition-colors resize-none"
        />
      </div>
      <Button type="submit" variant="primary" className="w-full text-xs" disabled={submitting}>
        <Send className="w-3 h-3 mr-2" />
        {submitting ? "Sending..." : "Quick Submit"}
      </Button>
    </form>
  );
}

