import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact BlazeByte Studio | Discuss Your Project",
  description: "Get in touch with our Coimbatore-based team to discuss your next web, marketing, AI, or app development project.",
  alternates: {
    canonical: "https://www.blazebyte.shop/contact"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
