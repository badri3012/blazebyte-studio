"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSound } from "@/context/sound-context";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, PORTALS } from "@/config/studio-data";
import { CheckCircle2, MessageSquare, Mail, Send, ArrowRight, ArrowLeft, Sparkles, AlertCircle } from "lucide-react";

export const ProjectConfigurator = () => {
  const searchParams = useSearchParams();
  const { playHover, playClick, playSuccess } = useSound();

  const [step, setStep] = useState<number>(1);
  const [service, setService] = useState<string>("web");
  const [budget, setBudget] = useState<string>("â‚¹15kâ€“â‚¹30k");
  const [goal, setGoal] = useState<string>("Conversion & Growth");
  const [details, setDetails] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const initialService = searchParams.get("service");
    if (initialService && ["web", "marketing", "ai", "apps"].includes(initialService)) {
      setService(initialService);
    }
    const appType = searchParams.get("appType");
    const features = searchParams.get("features");
    if (appType || features) {
      setService("apps");
      setDetails(`App Type: ${appType || "Custom"}\nSelected Modules: ${features || "Custom"}`);
    }
  }, [searchParams]);

  const budgetOptions = [
    "â‚¹5kâ€“â‚¹15k",
    "â‚¹15kâ€“â‚¹30k",
    "â‚¹30kâ€“â‚¹50k",
    "â‚¹50kâ€“â‚¹1L",
    "â‚¹1L+",
  ];

  const goalOptions = [
    "High-Converting Web Presence",
    "Customer Acquisition & Growth",
    "AI Workflow Automation",
    "Custom Software Product",
    "Brand Elevation & Redesign",
    "Other Commercial Goal",
  ];

  const handleNext = () => {
    playClick();
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    playClick();
    if (step > 1) setStep(step - 1);
  };

  const generateWhatsAppMessage = () => {
    return `*BLAZEBYTE STUDIO PROJECT ENQUIRY*\n` +
      `-----------------------------------\n` +
      `*Client:* ${clientName || "N/A"}\n` +
      `*Email:* ${clientEmail || "N/A"}\n` +
      `*Phone:* ${clientPhone || "N/A"}\n` +
      `-----------------------------------\n` +
      `*Service Required:* ${service.toUpperCase()}\n` +
      `*Budget Range:* ${budget}\n` +
      `*Primary Goal:* ${goal}\n` +
      `-----------------------------------\n` +
      `*Project Overview:*\n${details || "No details provided."}\n` +
      `-----------------------------------\n` +
      `Sent via blazebyte.shop`;
  };

  const handleWhatsAppDispatch = () => {
    playSuccess();
    const msg = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace("+", "")}?text=${msg}`, "_blank");
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      setErrorMsg("Please provide your name and email address.");
      return;
    }

    playClick();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          service,
          budget,
          goal,
          details,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        playSuccess();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit enquiry. Please try WhatsApp direct dispatch.");
      }
    } catch {
      setErrorMsg("Network error occurred. Please use WhatsApp dispatch.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-graphite-card border border-teal-accent/40 p-8 lg:p-12 text-center space-y-6 glow-teal">
        <div className="w-16 h-16 rounded-full bg-teal-accent/20 border border-teal-accent text-teal-accent flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 animate-bounce" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-heading font-extrabold text-ivory">Enquiry Received</h3>
          <p className="text-sm text-muted-grey max-w-md mx-auto">
            Thank you, <span className="text-ivory font-semibold">{clientName}</span>. Your project specification has been logged. Our engineering lead will review your requirements and reach out within 12 hours.
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="secondary" onClick={() => setSubmitted(false)}>
            Submit Another Project
          </Button>
          <Button variant="teal" onClick={handleWhatsAppDispatch}>
            <MessageSquare className="w-4 h-4" />
            <span>Open Fast-Track WhatsApp Chat</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-graphite-card border border-graphite-border p-6 lg:p-10 relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Top Wizard Progress Indicator */}
        <div className="flex items-center justify-between border-b border-graphite-border pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-ivory">
            <Sparkles className="w-4 h-4 text-indigo-accent" />
            <span>PROJECT CONFIGURATION ENGINE</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-grey">
            <span>Step {step} of 5</span>
            <div className="w-24 h-1.5 rounded-full bg-graphite border border-graphite-border overflow-hidden">
              <div
                className="h-full bg-indigo-accent transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-sm font-mono font-semibold uppercase tracking-wider text-ivory">
              01 â€” What service system do you need?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {PORTALS.map((p) => (
                <div
                  key={p.id}
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setService(p.id);
                  }}
                  className={`p-5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    service === p.id
                      ? "bg-graphite border-indigo-accent text-ivory glow-indigo"
                      : "bg-graphite/40 border-graphite-border text-muted-grey hover:text-ivory"
                  }`}
                >
                  <div className="font-mono text-xs text-indigo-light">{p.code}</div>
                  <div className="font-heading font-bold text-lg text-ivory">{p.title}</div>
                  <div className="text-xs text-muted-grey leading-tight">{p.tagline}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-sm font-mono font-semibold uppercase tracking-wider text-ivory">
              02 â€” What is your target budget allocation?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {budgetOptions.map((b) => (
                <div
                  key={b}
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setBudget(b);
                  }}
                  className={`p-4 rounded-xl border text-center font-mono text-sm transition-all cursor-pointer ${
                    budget === b
                      ? "bg-ivory text-graphite font-bold border-ivory"
                      : "bg-graphite border-graphite-border text-muted-grey hover:text-ivory"
                  }`}
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <label className="block text-sm font-mono font-semibold uppercase tracking-wider text-ivory">
              03 â€” What is the primary commercial goal?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {goalOptions.map((g) => (
                <div
                  key={g}
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setGoal(g);
                  }}
                  className={`p-4 rounded-xl border text-sm font-sans transition-all cursor-pointer ${
                    goal === g
                      ? "bg-graphite border-teal-accent text-ivory font-semibold glow-teal"
                      : "bg-graphite/40 border-graphite-border text-muted-grey hover:text-ivory"
                  }`}
                >
                  {g}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <label className="block text-sm font-mono font-semibold uppercase tracking-wider text-ivory">
              04 â€” Tell us about the project requirements & timeline
            </label>
            <textarea
              rows={5}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe your project, current website/system, desired features, or launch deadline..."
              className="w-full p-4 rounded-xl bg-graphite border border-graphite-border text-ivory placeholder-muted-grey text-sm focus:outline-none focus:border-indigo-accent font-sans"
            />
          </div>
        )}

        {step === 5 && (
          <form onSubmit={handleSubmitForm} className="space-y-6">
            <label className="block text-sm font-mono font-semibold uppercase tracking-wider text-ivory">
              05 â€” Provide contact details to dispatch enquiry
            </label>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-red-200 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-muted-grey mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full p-3 rounded-lg bg-graphite border border-graphite-border text-ivory text-sm focus:border-indigo-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-muted-grey mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full p-3 rounded-lg bg-graphite border border-graphite-border text-ivory text-sm focus:border-indigo-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-muted-grey mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-3 rounded-lg bg-graphite border border-graphite-border text-ivory text-sm focus:border-indigo-accent focus:outline-none"
                />
              </div>
            </div>

            {/* Config Summary Card */}
            <div className="p-4 rounded-xl bg-graphite border border-graphite-border/80 text-xs font-mono space-y-2 text-muted-grey">
              <div className="text-ivory font-bold border-b border-graphite-border pb-1">
                SUMMARY: {service.toUpperCase()} ENGINE BUILD
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>Budget: <span className="text-ivory">{budget}</span></div>
                <div>Goal: <span className="text-ivory">{goal}</span></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <Button type="submit" size="lg" variant="indigo" disabled={submitting} className="w-full sm:w-auto">
                <Send className="w-4 h-4" />
                <span>{submitting ? "Submitting..." : "Send Formal Enquiry"}</span>
              </Button>
              <Button type="button" size="lg" variant="teal" onClick={handleWhatsAppDispatch} className="w-full sm:w-auto">
                <MessageSquare className="w-4 h-4" />
                <span>Send via Direct WhatsApp</span>
              </Button>
            </div>
          </form>
        )}

        {/* Wizard Navigation Footer */}
        <div className="pt-6 border-t border-graphite-border flex items-center justify-between">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            className="text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </Button>

          {step < 5 && (
            <Button size="sm" variant="primary" onClick={handleNext} className="text-xs">
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
