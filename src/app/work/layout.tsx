import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website & Software Portfolio",
  description: "Explore our selected case studies, web builds, and digital transformation projects delivered by BlazeByte Studio.",
  alternates: {
    canonical: "https://www.blazebyte.shop/work"
  },
  openGraph: {
    title: "Website & Software Portfolio | BlazeByte Studio",
    description: "Explore our selected case studies, web builds, and digital transformation projects delivered by BlazeByte Studio.",
    url: "https://www.blazebyte.shop/work",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
