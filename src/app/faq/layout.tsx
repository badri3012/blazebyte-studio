import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about our web development, marketing, AI, and custom software services.",
  alternates: {
    canonical: "https://www.blazebyte.shop/faq"
  },
  openGraph: {
    title: "Frequently Asked Questions | BlazeByte Studio",
    description: "Answers to common questions about our web development, marketing, AI, and custom software services.",
    url: "https://www.blazebyte.shop/faq",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
