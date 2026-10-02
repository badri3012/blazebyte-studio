import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Our official refund and cancellation policy for digital services and software development.",
  alternates: {
    canonical: "https://www.blazebyte.shop/refund-policy"
  },
  openGraph: {
    title: "Refund Policy | BlazeByte Studio",
    description: "Our official refund and cancellation policy for digital services and software development.",
    url: "https://www.blazebyte.shop/refund-policy",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
