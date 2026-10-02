import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://blazebyte.shop";
  const now = new Date();

  return [
    // Homepage â€” highest priority
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },

    // Core Service Pages
    { url: `${baseUrl}/web`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/marketing`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/ai`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/apps`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },

    // Service Order Pages
    { url: `${baseUrl}/web/order`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/marketing/order`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/ai/order`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/apps/order`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },

    // Content & Trust Pages
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/packages`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },

    // SEO Service Pages
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services/seo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Legal & Policy Pages
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
