import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services in Coimbatore",
  description: "Dominate search rankings with technical SEO, content strategy, and authoritative link building from Coimbatore's premier digital agency.",
  alternates: {
    canonical: "https://www.blazebyte.shop/services/seo"
  },
  openGraph: {
    title: "SEO Services in Coimbatore | BlazeByte Studio",
    description: "Dominate search rankings with technical SEO, content strategy, and authoritative link building from Coimbatore's premier digital agency.",
    url: "https://www.blazebyte.shop/services/seo",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
