import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our 5-Stage Delivery Process",
  description: "Learn how BlazeByte Studio builds scalable digital systems through our proven 5-stage architecture and engineering process.",
  alternates: {
    canonical: "https://www.blazebyte.shop/process"
  },
  openGraph: {
    title: "Our 5-Stage Delivery Process | BlazeByte Studio",
    description: "Learn how BlazeByte Studio builds scalable digital systems through our proven 5-stage architecture and engineering process.",
    url: "https://www.blazebyte.shop/process",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
