import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.blazebyte.shop";
  

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: baseUrl + "/web", changeFrequency: "monthly", priority: 0.95 },
    { url: baseUrl + "/marketing", changeFrequency: "monthly", priority: 0.95 },
    { url: baseUrl + "/ai", changeFrequency: "monthly", priority: 0.95 },
    { url: baseUrl + "/apps", changeFrequency: "monthly", priority: 0.95 },
    { url: baseUrl + "/work", changeFrequency: "weekly", priority: 0.8 },
    { url: baseUrl + "/process", changeFrequency: "monthly", priority: 0.75 },
    { url: baseUrl + "/about", changeFrequency: "monthly", priority: 0.75 },
    { url: baseUrl + "/contact", changeFrequency: "monthly", priority: 0.85 },
    { url: baseUrl + "/faq", changeFrequency: "monthly", priority: 0.65 },
    { url: baseUrl + "/packages", changeFrequency: "monthly", priority: 0.7 },
    { url: baseUrl + "/services", changeFrequency: "monthly", priority: 0.7 },
    { url: baseUrl + "/services/seo", changeFrequency: "monthly", priority: 0.7 },
    { url: baseUrl + "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { url: baseUrl + "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
    { url: baseUrl + "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
    { url: baseUrl + "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
    { url: baseUrl + "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
  ];
}

