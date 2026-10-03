/**
 * Minimal GA4 event helper (gtag.js).
 *
 * GA4 itself is loaded once from src/components/analytics/google-analytics.tsx.
 * This helper is browser-safe: it is a no-op during SSR, in development builds,
 * or when gtag has not loaded (e.g. blocked by an ad blocker).
 *
 * Page views are NOT sent from here — GA4 config + Enhanced Measurement handle them.
 *
 * Planned (not yet wired) business events: whatsapp_click, phone_click, email_click,
 * cta_click, form_start, form_submit, service_view.
 * Never pass names, emails, phone numbers or free-text messages as parameters.
 */

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: GtagEventParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
