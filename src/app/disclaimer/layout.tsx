import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description: "Legal disclaimer regarding the use of BlazeByte Studio resources and information.",
  alternates: {
    canonical: "https://www.blazebyte.shop/disclaimer"
  },
  openGraph: {
    title: "Legal Disclaimer | BlazeByte Studio",
    description: "Legal disclaimer regarding the use of BlazeByte Studio resources and information.",
    url: "https://www.blazebyte.shop/disclaimer",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
