import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Company in Coimbatore",
  description: "Get a high-performance, mobile-optimized website for your business. We are a premium web development company based in Coimbatore serving global clients.",
  alternates: {
    canonical: "https://www.blazebyte.shop/web"
  },
  openGraph: {
    title: "Web Development Company in Coimbatore | BlazeByte Studio",
    description: "Get a high-performance, mobile-optimized website for your business. We are a premium web development company based in Coimbatore serving global clients.",
    url: "https://www.blazebyte.shop/web",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
