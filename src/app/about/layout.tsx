import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Studio",
  description: "BlazeByte Studio is a premium digital agency in Coimbatore focused on engineering, design, and conversion.",
  alternates: {
    canonical: "https://www.blazebyte.shop/about"
  },
  openGraph: {
    title: "About Our Studio | BlazeByte Studio",
    description: "BlazeByte Studio is a premium digital agency in Coimbatore focused on engineering, design, and conversion.",
    url: "https://www.blazebyte.shop/about",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
