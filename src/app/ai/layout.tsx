import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Services for SMEs",
  description: "Automate your workflows, customer service, and data triage with custom AI agents and enterprise automation systems by BlazeByte Studio.",
  alternates: {
    canonical: "https://www.blazebyte.shop/ai"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
