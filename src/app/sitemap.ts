import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.blazebyte.shop";
  const staticModDate = new Date("2026-10-03T00:00:00Z");

  return [
    { url: baseUrl, lastModified: staticModDate, changeFrequency: "weekly", priority: 1.0 },
    { url: "${baseUrl}/web", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.95 },
    { url: "${baseUrl}/marketing", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.95 },
    { url: "${baseUrl}/ai", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.95 },
    { url: "${baseUrl}/apps", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.95 },
    { url: "${baseUrl}/work", lastModified: staticModDate, changeFrequency: "weekly", priority: 0.8 },
    { url: "${baseUrl}/process", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.75 },
    { url: "${baseUrl}/about", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.75 },
    { url: "${baseUrl}/contact", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.85 },
    { url: "${baseUrl}/faq", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.65 },
    { url: "${baseUrl}/packages", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "${baseUrl}/services", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "${baseUrl}/services/seo", lastModified: staticModDate, changeFrequency: "monthly", priority: 0.7 },
    { url: "${baseUrl}/privacy-policy", lastModified: staticModDate, changeFrequency: "yearly", priority: 0.3 },
    { url: "${baseUrl}/terms-and-conditions", lastModified: staticModDate, changeFrequency: "yearly", priority: 0.3 },
    { url: "${baseUrl}/refund-policy", lastModified: staticModDate, changeFrequency: "yearly", priority: 0.3 },
    { url: "${baseUrl}/cookie-policy", lastModified: staticModDate, changeFrequency: "yearly", priority: 0.3 },
    { url: "${baseUrl}/disclaimer", lastModified: staticModDate, changeFrequency: "yearly", priority: 0.3 },
  ];
}
