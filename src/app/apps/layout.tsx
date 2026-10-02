import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Web App Development",
  description: "Secure, scalable custom web applications, SaaS platforms, and internal business tools built by expert software engineers in Coimbatore.",
  alternates: {
    canonical: "https://www.blazebyte.shop/apps"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
