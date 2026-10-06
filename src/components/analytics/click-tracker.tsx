"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export function AnalyticsClickTracker() {
  useEffect(() => {
    // 1. Click Listener
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;

      const isAnchor = target.tagName === "A";
      const href = target.getAttribute("href") || "";
      const text = (target.textContent || "").trim().substring(0, 50);
      const classes = target.getAttribute("className") || target.getAttribute("class") || "";

      if (isAnchor && (href.includes("wa.me") || href.includes("api.whatsapp.com") || href.startsWith("whatsapp:"))) {
        trackEvent("whatsapp_click", { page_path: window.location.pathname, link_url: href });
        return;
      }
      if (isAnchor && href.startsWith("tel:")) {
        trackEvent("phone_click", { page_path: window.location.pathname, link_url: href });
        return;
      }
      if (isAnchor && href.startsWith("mailto:")) {
        trackEvent("email_click", { page_path: window.location.pathname, link_url: href });
        return;
      }

      const isCtaHref = isAnchor && (href.includes("/contact") || href.includes("/order"));
      const isCtaText = /^(start|enquire|book|discuss|get started|order|contact|let's talk|request)/i.test(text);
      const isSubmitBtn = target.tagName === "BUTTON" && (target.getAttribute("type") === "submit" || !!target.closest("form"));

      if (!isSubmitBtn && (isCtaHref || isCtaText || classes.includes("btn-primary") || classes.includes("bg-primary"))) {
        trackEvent("cta_click", { cta_name: text || href, cta_location: window.location.pathname });
      }
    };

    // 2. Form Start Listener
    const trackedForms = new Set<string>();

    const handleInput = (e: Event) => {
      const target = e.target as HTMLElement;
      const form = target.closest("form");
      if (!form) return;

      // Use an ID or fallback to action/path
      const formId = form.getAttribute("id") || form.getAttribute("action") || window.location.pathname;
      
      if (!trackedForms.has(formId)) {
        trackedForms.add(formId);
        trackEvent("form_start", { form_id: formId, page_path: window.location.pathname });
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("focusin", handleInput, { capture: true }); // Catch focus instead of input to trigger early
    
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("focusin", handleInput, { capture: true });
    };
  }, []);

  return null;
}
