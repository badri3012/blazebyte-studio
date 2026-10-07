import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile & Custom App Development Company in Coimbatore | BlazeByte Studio",
  description: "Build custom mobile, web and business applications with BlazeByte Studio. Scalable app development for startups, SMEs and growing businesses.",
  alternates: {
    canonical: "https://www.blazebyte.shop/apps"
  },
  openGraph: {
    title: "Mobile & Custom App Development Company in Coimbatore | BlazeByte Studio",
    description: "Build custom mobile, web and business applications with BlazeByte Studio. Scalable app development for startups, SMEs and growing businesses.",
    url: "https://www.blazebyte.shop/apps",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

