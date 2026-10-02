import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Coimbatore",
  description: "Data-driven digital marketing, SEO, and lead generation services in Coimbatore to scale your business and dominate search and social channels.",
  alternates: {
    canonical: "https://www.blazebyte.shop/marketing"
  },
  openGraph: {
    title: "Digital Marketing Agency in Coimbatore | BlazeByte Studio",
    description: "Data-driven digital marketing, SEO, and lead generation services in Coimbatore to scale your business and dominate search and social channels.",
    url: "https://www.blazebyte.shop/marketing",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
