import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy to understand how we collect, use, and protect your data.",
  alternates: {
    canonical: "https://www.blazebyte.shop/privacy-policy"
  },
  openGraph: {
    title: "Privacy Policy | BlazeByte Studio",
    description: "Read our privacy policy to understand how we collect, use, and protect your data.",
    url: "https://www.blazebyte.shop/privacy-policy",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
