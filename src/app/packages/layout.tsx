import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Packages & Pricing",
  description: "Transparent pricing for web development, marketing, and software engineering packages tailored for your business.",
  alternates: {
    canonical: "https://www.blazebyte.shop/packages"
  },
  openGraph: {
    title: "Service Packages & Pricing | BlazeByte Studio",
    description: "Transparent pricing for web development, marketing, and software engineering packages tailored for your business.",
    url: "https://www.blazebyte.shop/packages",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
