import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlazeByte Studio | Premium Digital Marketing Agency",
  description: "Don't Just Get Seen. Get Results. We build comprehensive digital marketing ecosystems designed to generate qualified leads and drive revenue.",
  openGraph: {
    title: "BlazeByte Studio | Premium Digital Marketing Agency",
    description: "Don't Just Get Seen. Get Results. We build comprehensive digital marketing ecosystems designed to generate qualified leads and drive revenue.",
    url: 'https://https://www.blazebyte.shop',
    siteName: 'BlazeByte Studio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
