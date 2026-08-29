import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About BlazeByte Studio | Digital Marketing Agency",
  description: "Learn about BlazeByte Studio, our philosophy, and why we are the premium choice for data-driven growth.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* HEADER SECTION */}
      <section className="py-20 lg:py-32 bg-neutral-950 text-white border-b border-neutral-900">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Built for <span className="text-primary">Growth.</span></h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            We are {siteConfig.brandName}—a premium {siteConfig.businessType.toLowerCase()} dedicated to turning your digital presence into your strongest asset.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Editorial Studio Snapshot Panel */}
            <div className="relative aspect-[4/5] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-900 shadow-2xl flex flex-col justify-between p-8 lg:p-10">
              {/* Subtle architectural grid background */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />
              
              {/* Top Header */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h3 className="text-white font-heading text-2xl font-bold tracking-tight">BlazeByte</h3>
                  <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-1">Studio</p>
                </div>
                <div className="text-right">
                  <span className="text-primary font-mono text-[10px] font-bold bg-primary/10 border border-primary/20 px-2 py-1 rounded">EST. 2025</span>
                </div>
              </div>

              {/* Middle Abstract Geometric Core */}
              <div className="relative z-10 flex-1 flex items-center justify-center my-8">
                <div className="w-full max-w-[220px] aspect-square border border-neutral-800 rounded-full relative flex items-center justify-center">
                  {/* Intersecting axis line */}
                  <div className="absolute w-[1px] h-[130%] bg-neutral-800/80 -rotate-45" />
                  
                  {/* Central focus point */}
                  <div className="w-24 h-24 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.15)] relative">
                    <div className="absolute inset-2 border border-primary/20 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
                    <span className="text-primary font-mono text-[9px] tracking-widest font-bold">GROWTH</span>
                  </div>
                </div>
              </div>

              {/* Bottom Editorial Details */}
              <div className="relative z-10 grid grid-cols-2 gap-6 border-t border-neutral-800/60 pt-6">
                <div>
                  <p className="text-neutral-600 font-mono text-[9px] uppercase tracking-widest mb-1.5">Location</p>
                  <p className="text-neutral-300 text-sm font-medium leading-tight">Coimbatore,<br/>Tamil Nadu</p>
                </div>
                <div>
                  <p className="text-neutral-600 font-mono text-[9px] uppercase tracking-widest mb-1.5">Focus</p>
                  <ul className="text-neutral-300 text-sm font-medium space-y-1">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-neutral-600 rounded-full" /> Strategy</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-neutral-600 rounded-full" /> Content</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full" /> Performance</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-sm uppercase tracking-wider rounded-full">Our Story</div>
              <h2 className="font-heading text-4xl font-bold leading-tight">Founded on the belief that marketing should make you money.</h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Most agencies focus on vanity metrics—likes, followers, and aesthetic grids. While those things matter, they don&apos;t keep the lights on.
                </p>
                <p>
                  Founded by {siteConfig.founderName} in {siteConfig.location}, {siteConfig.brandName} was built to bridge the gap between creative storytelling and hard data.
                </p>
                <p>
                  We don&apos;t just post on your behalf. We architect entire digital ecosystems designed to attract attention, build trust, and ultimately convert strangers into paying customers.
                </p>
              </div>

              <div className="pt-8 border-t border-border flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center font-bold text-xl text-muted-foreground">
                  BN
                </div>
                <div>
                  <p className="font-bold text-foreground">{siteConfig.founderName}</p>
                  <p className="text-sm text-muted-foreground">Founder & Lead Strategist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-muted-foreground">The core principles that drive every campaign we build.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-8 rounded-2xl">
              <span className="text-primary font-mono font-bold mb-4 block">01</span>
              <h3 className="text-xl font-bold mb-3">No Vanity Metrics</h3>
              <p className="text-muted-foreground">We measure success by qualified leads, customer acquisition cost, and revenue generated—not just how many people clicked &quot;like&quot;.</p>
            </div>
            
            <div className="bg-card border border-border p-8 rounded-2xl">
              <span className="text-primary font-mono font-bold mb-4 block">02</span>
              <h3 className="text-xl font-bold mb-3">Creative + Data</h3>
              <p className="text-muted-foreground">Beautiful creative alone fails. Data without creative is boring. We combine high-end visuals with ruthless performance testing.</p>
            </div>

            <div className="bg-card border border-border p-8 rounded-2xl">
              <span className="text-primary font-mono font-bold mb-4 block">03</span>
              <h3 className="text-xl font-bold mb-3">Radical Transparency</h3>
              <p className="text-muted-foreground">You will always know where your ad spend is going, what we are testing, and what the actual return on investment is.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-heading text-4xl font-bold mb-6">Ready to scale your business?</h2>
          <Button size="lg" variant="primary" className="h-14 px-8 text-lg w-full sm:w-auto shadow-lg shadow-primary/20" asChild>
            <Link href="/order-project">Get a Growth Plan</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
