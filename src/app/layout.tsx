import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SoundProvider } from "@/context/sound-context";
import { ServiceTransitionProvider } from "@/context/service-transition-context";
import { SITE_CONFIG } from "@/config/studio-data";
import Script from "next/script";

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
    "BlazeByte Studio is a premium software development company in Coimbatore, Tamil Nadu. We build high-performance websites, digital marketing systems, AI automation, and custom apps for Indian businesses and international clients.",
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

// LocalBusiness + Organization structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "BlazeByte Studio",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.contact.whatsapp,
        contactType: "customer service",
        email: SITE_CONFIG.contact.email,
        availableLanguage: ["English", "Tamil"]
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      description:
        "BlazeByte Studio is a premium software development company in Coimbatore, Tamil Nadu, specialising in web development, digital marketing, AI automation, and custom application development.",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#localbusiness`,
      name: "BlazeByte Studio",
      image: `${baseUrl}/og-image.jpg`,
      url: baseUrl,
      telephone: SITE_CONFIG.contact.whatsapp,
      email: SITE_CONFIG.contact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      }
    }
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
          </Script>
        )}
      </head>
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background selection:bg-indigo-accent/30 selection:text-ivory">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <SoundProvider>
          <ServiceTransitionProvider>
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
            {/* Dedicated Viewport Transition Portal Target */}
            <div id="blazebyte-transition-root" />
          </ServiceTransitionProvider>
        </SoundProvider>
      </body>
    </html>
  );
}



