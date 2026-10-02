import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Information on how BlazeByte Studio uses cookies to improve your digital experience.",
  alternates: {
    canonical: "https://www.blazebyte.shop/cookie-policy"
  },
  openGraph: {
    title: "Cookie Policy | BlazeByte Studio",
    description: "Information on how BlazeByte Studio uses cookies to improve your digital experience.",
    url: "https://www.blazebyte.shop/cookie-policy",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
