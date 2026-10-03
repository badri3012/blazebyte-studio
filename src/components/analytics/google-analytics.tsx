import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js) — single global installation.
 *
 * - Rendered once from the root layout (src/app/layout.tsx), so it covers every route.
 * - Loaded with next/script `afterInteractive`: asynchronous, non-blocking.
 * - The root layout never remounts on App Router client navigation, and next/script
 *   de-duplicates by `id`, so gtag is initialised exactly once per page load.
 * - Client-side route changes are counted by GA4 Enhanced Measurement
 *   ("Page changes based on browser history events"). No manual page_view is sent
 *   here, to avoid double counting.
 */

const DEFAULT_GA_MEASUREMENT_ID = "G-YSR7LGHB14";

// Public identifier (not a secret). Env var allows override without a code change.
const GA_MEASUREMENT_ID = (
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID
).trim();

// Guard: the ID is interpolated into an inline script, so only accept a valid GA4 ID.
const IS_VALID_ID = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);

// Only load in production builds (excludes `next dev`). On Vercel, also skip
// Preview/Development deployments when NEXT_PUBLIC_VERCEL_ENV is exposed.
const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
const IS_ENABLED =
  process.env.NODE_ENV === "production" && (!VERCEL_ENV || VERCEL_ENV === "production");

export function GoogleAnalytics() {
  if (!IS_ENABLED || !IS_VALID_ID) return null;

  return (
    <>
      <Script
        id="ga4-gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
