import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using BlazeByte Studio services and platforms.",
  alternates: {
    canonical: "https://www.blazebyte.shop/terms-and-conditions"
  },
  openGraph: {
    title: "Terms & Conditions | BlazeByte Studio",
    description: "Terms and conditions for using BlazeByte Studio services and platforms.",
    url: "https://www.blazebyte.shop/terms-and-conditions",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
