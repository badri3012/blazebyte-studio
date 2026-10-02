import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Discuss Your Project",
  description: "Get in touch with our Coimbatore-based team to discuss your next web, marketing, AI, or app development project.",
  alternates: {
    canonical: "https://www.blazebyte.shop/contact"
  },
  openGraph: {
    title: "Contact Us - Discuss Your Project | BlazeByte Studio",
    description: "Get in touch with our Coimbatore-based team to discuss your next web, marketing, AI, or app development project.",
    url: "https://www.blazebyte.shop/contact",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
