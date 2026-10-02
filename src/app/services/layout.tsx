import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Comprehensive digital services including Web Development, Marketing, AI Automation, and App Development.",
  alternates: {
    canonical: "https://www.blazebyte.shop/services"
  },
  openGraph: {
    title: "Our Services | BlazeByte Studio",
    description: "Comprehensive digital services including Web Development, Marketing, AI Automation, and App Development.",
    url: "https://www.blazebyte.shop/services",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
