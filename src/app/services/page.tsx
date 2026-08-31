import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServiceExplorer } from "@/components/ServiceExplorer";

export const metadata = {
  title: "Digital Marketing Services | BlazeByte Studio",
  description: "End-to-end digital marketing ecosystem designed for scale and revenue growth.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* HEADER */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden border-b border-border">
        <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 tracking-tight">Stop Posting.<br/><span className="text-primary">Start Growing.</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We don&apos;t just run ads or make pretty posts. We build a comprehensive digital marketing ecosystem designed to generate qualified leads and drive revenue.
          </p>
          <Button size="lg" variant="primary" asChild>
            <Link href="/order-project">Get a Growth Plan</Link>
          </Button>
        </div>
      </section>

      {/* CORE ECOSYSTEM: Editorial Split Layout */}
      <section className="py-24 lg:py-32" id="social-media">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="relative lg:sticky lg:top-32 z-10 bg-background/80 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent pb-4 lg:pb-0">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-sm uppercase tracking-wider rounded-full mb-6 mt-2 lg:mt-0">Organic Growth</div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Social Media & Content</h2>
              <p className="text-lg text-muted-foreground mb-4 lg:mb-8">
                Your social media profile is your modern storefront. We transform it into an authoritative brand asset with strategic content calendars, high-end visual design, and engaging video production.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Service Items formatted editorially */}
              <div className="p-6 md:p-8 border border-border bg-card rounded-2xl group hover:border-primary/50 transition-colors">
                <h3 className="font-heading text-xl md:text-2xl font-bold mb-3 md:mb-4 flex justify-between items-start gap-4">
                  <span className="leading-tight">Social Media Strategy</span>
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5 md:mt-1">→</span>
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">Architecting your brand voice, aesthetic, and overarching roadmap to capture attention in a saturated market.</p>
              </div>

              <div className="p-6 md:p-8 border border-border bg-card rounded-2xl group hover:border-primary/50 transition-colors">
                <h3 className="font-heading text-xl md:text-2xl font-bold mb-3 md:mb-4 flex justify-between items-start gap-4">
                  <span className="leading-tight">Social Media Management</span>
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5 md:mt-1">→</span>
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">End-to-end execution. We handle posting, community engagement, and channel growth while you run your business.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mt-2 md:mt-0">
                <div className="p-5 md:p-6 bg-muted/30 rounded-xl">
                  <h4 className="font-bold text-base md:text-lg mb-2">Content Creation</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">High-converting statics, carousels, and engaging copywriting.</p>
                </div>
                <div className="p-5 md:p-6 bg-muted/30 rounded-xl">
                  <h4 className="font-bold text-base md:text-lg mb-2">Reels / Short-form Video</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">Scripting, directing, and editing native video content.</p>
                </div>
                <div className="p-5 md:p-6 bg-muted/30 rounded-xl">
                  <h4 className="font-bold text-base md:text-lg mb-2">Graphic Design</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">Premium, brand-aligned visual assets.</p>
                </div>
                <div className="p-5 md:p-6 bg-muted/30 rounded-xl">
                  <h4 className="font-bold text-base md:text-lg mb-2">Brand Strategy</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">Positioning and messaging frameworks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAID ACQUISITION: Interactive Explorer */}
      <section className="py-24 lg:py-32 bg-neutral-950 text-white border-y border-neutral-900" id="ads">
        <div className="container mx-auto max-w-7xl px-4">
          <ServiceExplorer />
        </div>
      </section>

      {/* EXTENDED ECOSYSTEM: Grid variation */}
      <section className="py-24 bg-muted/20" id="ecosystem">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">The Complete Ecosystem</h2>
            <p className="text-muted-foreground text-lg">Everything you need to dominate your market, all under one roof.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-background border border-border p-8 rounded-2xl shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/50 md:hover:shadow-xl relative overflow-hidden flex flex-col justify-between">
              {/* Subtle orange indicator line */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary">Lead Generation</h3>
                <p className="text-muted-foreground">Automated funnels designed to capture and qualify prospects before they reach your sales team.</p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="text-primary font-bold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
              </div>
            </div>
            
            <div className="group bg-background border border-border p-8 rounded-2xl shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/50 md:hover:shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary">Local Business Marketing</h3>
                <p className="text-muted-foreground">Hyper-local strategies to dominate your geographic radius and drive foot traffic.</p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="text-primary font-bold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
              </div>
            </div>

            <div className="group bg-background border border-border p-8 rounded-2xl shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/50 md:hover:shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary">SEO</h3>
                <p className="text-muted-foreground">Technical and content-driven search engine optimization for long-term organic discovery.</p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="text-primary font-bold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
              </div>
            </div>

            <div className="group bg-background border border-border p-8 rounded-2xl shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/50 md:hover:shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary">Influencer Marketing</h3>
                <p className="text-muted-foreground">Strategic partnerships to leverage borrowed trust and reach new targeted demographics.</p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="text-primary font-bold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
              </div>
            </div>

            <div className="group bg-background border border-border p-8 rounded-2xl shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/50 md:hover:shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary">AI-Powered Marketing</h3>
                <p className="text-muted-foreground">Integrating the latest AI tools to automate workflows, personalize outreach, and scale efficiently.</p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="text-primary font-bold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
              </div>
            </div>

            <div className="group bg-primary text-primary-foreground p-8 rounded-2xl shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:shadow-xl md:hover:shadow-primary/20 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-3">Complete Digital Marketing</h3>
                <p className="opacity-90 text-sm mb-6">The ultimate growth package.</p>
                <Button variant="default" size="sm" className="bg-white text-primary hover:bg-neutral-100 transition-transform duration-300 group-hover:scale-105" asChild>
                  <Link href="/order-project">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
