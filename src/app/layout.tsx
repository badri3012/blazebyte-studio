import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SoundProvider } from "@/context/sound-context";
import { ServiceTransitionProvider } from "@/context/service-transition-context";
import { SITE_CONFIG } from "@/config/studio-data";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AnalyticsClickTracker } from "@/components/analytics/click-tracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = `https://${SITE_CONFIG.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Web, Marketing, AI & Apps | BlazeByte Studio",
    template: "%s | BlazeByte Studio",
  },
  description:
    "BlazeByte Studio offers web development, digital marketing, AI automation and custom apps for businesses in Coimbatore, Tamil Nadu and beyond.",
  keywords: [
    // Primary geo-targeted
    "software development company in coimbatore",
    "web development company in coimbatore",
    "digital marketing agency coimbatore",
    "website design coimbatore",
    "app development coimbatore",
    "AI solutions coimbatore",
    "IT company coimbatore",
    // Tamil Nadu
    "web development tamil nadu",
    "software company tamil nadu",
    "digital marketing tamil nadu",
    // India
    "website development india",
    "custom software development india",
    "digital agency india",
    // Services
    "web development",
    "digital marketing",
    "AI automation",
    "custom software development",
    "mobile app development",
    // Brand
    "BlazeByte Studio",
    "blazebyte.shop",
  ],
  authors: [{ name: SITE_CONFIG.name, url: baseUrl }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "Software Development",
  openGraph: {
    title: "Web, Marketing, AI & Apps | BlazeByte Studio",
    description: "Premium web development, digital marketing, AI automation & custom software for Indian businesses. Based in Coimbatore, Tamil Nadu.",
    url: baseUrl,
    siteName: "BlazeByte Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web, Marketing, AI & Apps | BlazeByte Studio",
    description: "Web development, digital marketing, AI & custom apps. Premium studio based in Coimbatore, Tamil Nadu.",
    images: [`${baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${baseUrl}/#localbusiness`,
  name: "BlazeByte Studio",
  url: baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/logo.png`,
  },
  image: `${baseUrl}/og-image.jpg`,
  description:
    "BlazeByte Studio is a premium software development company in Coimbatore, Tamil Nadu, specialising in web development, digital marketing, AI automation, and custom application development.",
  telephone: SITE_CONFIG.contact.whatsapp || undefined,
  email: SITE_CONFIG.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [
    SITE_CONFIG.socials.twitter,
    SITE_CONFIG.socials.linkedin,
    SITE_CONFIG.socials.github,
  ].filter(Boolean),
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background selection:bg-indigo-accent/30 selection:text-ivory">
        <SoundProvider>
          <ServiceTransitionProvider>
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
            {/* Dedicated Viewport Transition Portal Target */}
            <div id="blazebyte-transition-root" />
          </ServiceTransitionProvider>
        </SoundProvider>
        <GoogleAnalytics />
        <AnalyticsClickTracker />
      </body>
    </html>
  );
}





