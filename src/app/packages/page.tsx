import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Digital Marketing Packages | BlazeByte Studio",
  description: "Transparent pricing for premium digital marketing services.",
};

export default function PackagesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* HEADER SECTION */}
      <section className="py-20 lg:py-28 bg-background border-b border-border">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Transparent Pricing.<br/><span className="text-primary">Real Growth.</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Invest in a marketing engine that actually generates revenue.
          </p>
          <div className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-900 px-4 py-2 text-sm font-medium mt-4">
            <span className="text-amber-600 dark:text-amber-500 font-bold mr-2">Note:</span>
            Advertising spend is separate from management fees.
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            
            {/* STARTER */}
            <div className="group bg-card border border-border rounded-2xl p-8 flex flex-col h-full shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/40 md:hover:shadow-lg relative">
              <div className="absolute inset-0 rounded-2xl bg-white/0 md:group-hover:bg-foreground/[0.02] transition-colors duration-300 pointer-events-none" />
              <div className="relative z-10 mb-8">
                <h3 className="font-heading text-2xl font-bold mb-2 transition-colors duration-300 md:group-hover:text-primary">Starter</h3>
                <p className="text-sm text-muted-foreground mb-6">Best for businesses starting their digital presence.</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">₹9,999</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Social media strategy</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> 8 static posts</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> 4 reels</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> 12 stories</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Captions & Hashtags</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Instagram & Facebook mgt</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Monthly content calendar</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Monthly report</li>
              </ul>
              <Button variant="outline" className="w-full relative z-10 transition-all duration-300 md:group-hover:bg-primary md:group-hover:text-primary-foreground md:group-hover:border-primary md:group-hover:-translate-y-0.5 md:group-hover:shadow-md" asChild>
                <Link href="/order-project?package=starter">Start With Starter</Link>
              </Button>
            </div>

            {/* GROWTH (Recommended) */}
            <div className="group bg-neutral-950 text-white rounded-2xl p-8 flex flex-col h-full shadow-xl relative scale-100 lg:scale-105 z-10 border border-primary/30 transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/60 md:hover:shadow-2xl md:hover:shadow-primary/10">
              <div className="absolute inset-0 rounded-2xl bg-white/0 md:group-hover:bg-white/[0.03] transition-colors duration-300 pointer-events-none" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full z-20">
                Recommended
              </div>
              <div className="relative z-10 mb-8 mt-2">
                <h3 className="font-heading text-2xl font-bold mb-2 transition-colors duration-300 md:group-hover:text-primary-foreground md:group-hover:brightness-110">Growth</h3>
                <p className="text-sm text-neutral-400 mb-6">Best for businesses seeking consistent growth & leads.</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">₹19,999</span>
                  <span className="text-neutral-400">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                <li className="flex gap-3 text-sm font-medium border-b border-neutral-800 pb-2 mb-2 transition-colors duration-300 md:group-hover:border-neutral-700">Everything in Starter, plus:</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> 12 static posts</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> 8 reels</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> 20 stories</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Advanced content calendar</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Community management</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Meta Ads management</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Lead generation strategy</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Monthly strategy call</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Detailed reporting</li>
              </ul>
              <Button variant="primary" className="w-full relative z-10 transition-all duration-300 md:group-hover:brightness-110 md:group-hover:-translate-y-0.5 md:group-hover:shadow-lg" asChild>
                <Link href="/order-project?package=growth">Choose Growth</Link>
              </Button>
            </div>

            {/* PRO */}
            <div className="group bg-card border border-border rounded-2xl p-8 flex flex-col h-full shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/40 md:hover:shadow-lg relative">
              <div className="absolute inset-0 rounded-2xl bg-white/0 md:group-hover:bg-foreground/[0.02] transition-colors duration-300 pointer-events-none" />
              <div className="relative z-10 mb-8">
                <h3 className="font-heading text-2xl font-bold mb-2 transition-colors duration-300 md:group-hover:text-primary">Pro</h3>
                <p className="text-sm text-muted-foreground mb-6">Best for businesses serious about performance marketing.</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">₹34,999</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                <li className="flex gap-3 text-sm font-medium border-b border-border pb-2 mb-2 transition-colors duration-300 md:group-hover:border-border/80">Everything in Growth, plus:</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> 16 static posts</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> 12 reels</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> 30 stories</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Google Ads management</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Landing page optimization</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Conversion tracking</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Advanced analytics</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Competitor research</li>
                <li className="flex gap-3 text-sm"><span className="text-primary/80 transition-transform duration-300 md:group-hover:text-primary md:group-hover:scale-110 inline-block">✓</span> Weekly optimization</li>
              </ul>
              <Button variant="outline" className="w-full relative z-10 transition-all duration-300 md:group-hover:bg-primary md:group-hover:text-primary-foreground md:group-hover:border-primary md:group-hover:-translate-y-0.5 md:group-hover:shadow-md" asChild>
                <Link href="/order-project?package=pro">Go Pro</Link>
              </Button>
            </div>

            {/* CUSTOM */}
            <div className="group bg-card border border-border rounded-2xl p-8 flex flex-col h-full shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/40 md:hover:shadow-lg relative">
              <div className="absolute inset-0 rounded-2xl bg-white/0 md:group-hover:bg-foreground/[0.02] transition-colors duration-300 pointer-events-none" />
              <div className="relative z-10 mb-8">
                <h3 className="font-heading text-2xl font-bold mb-2 transition-colors duration-300 md:group-hover:text-primary">Custom</h3>
                <p className="text-sm text-muted-foreground mb-6">For businesses requiring a larger marketing ecosystem.</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-muted-foreground relative z-10">
                <li className="transition-all duration-300 md:group-hover:translate-x-1 md:group-hover:text-foreground">Full-funnel strategy</li>
                <li className="transition-all duration-300 md:group-hover:translate-x-1 md:group-hover:text-foreground">Multi-platform marketing</li>
                <li className="transition-all duration-300 md:group-hover:translate-x-1 md:group-hover:text-foreground">Advanced lead generation</li>
                <li className="transition-all duration-300 md:group-hover:translate-x-1 md:group-hover:text-foreground">Large-scale content</li>
                <li className="transition-all duration-300 md:group-hover:translate-x-1 md:group-hover:text-foreground">Paid advertising</li>
                <li className="transition-all duration-300 md:group-hover:translate-x-1 md:group-hover:text-foreground">Retargeting</li>
                <li className="transition-all duration-300 md:group-hover:translate-x-1 md:group-hover:text-foreground">CRM integration</li>
                <li className="transition-all duration-300 md:group-hover:translate-x-1 md:group-hover:text-foreground">WhatsApp automation</li>
                <li className="transition-all duration-300 md:group-hover:translate-x-1 md:group-hover:text-foreground">AI marketing automation</li>
                <li className="transition-all duration-300 md:group-hover:translate-x-1 md:group-hover:text-foreground">Custom analytics</li>
              </ul>
              <Button variant="outline" className="w-full relative z-10 transition-all duration-300 md:group-hover:bg-primary md:group-hover:text-primary-foreground md:group-hover:border-primary md:group-hover:-translate-y-0.5 md:group-hover:shadow-md" asChild>
                <Link href="/order-project?package=custom">Build My Strategy</Link>
              </Button>
            </div>
            
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold mb-4">Compare Features</h2>
            <p className="text-muted-foreground">Detailed breakdown of what&apos;s included.</p>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-foreground font-heading">
                <tr>
                  <th className="px-6 py-4 font-semibold">Features</th>
                  <th className="px-6 py-4 font-semibold text-center">Starter</th>
                  <th className="px-6 py-4 font-semibold text-center text-primary">Growth</th>
                  <th className="px-6 py-4 font-semibold text-center">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td colSpan={4} className="bg-muted/20 px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Content Creation</td></tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium">Static Posts</td>
                  <td className="px-6 py-4 text-center">8</td>
                  <td className="px-6 py-4 text-center font-bold text-primary">12</td>
                  <td className="px-6 py-4 text-center">16</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium">Reels</td>
                  <td className="px-6 py-4 text-center">4</td>
                  <td className="px-6 py-4 text-center font-bold text-primary">8</td>
                  <td className="px-6 py-4 text-center">12</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium">Stories</td>
                  <td className="px-6 py-4 text-center">12</td>
                  <td className="px-6 py-4 text-center font-bold text-primary">20</td>
                  <td className="px-6 py-4 text-center">30</td>
                </tr>
                
                <tr><td colSpan={4} className="bg-muted/20 px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Advertising & Lead Gen</td></tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium">Meta Ads</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">—</td>
                  <td className="px-6 py-4 text-center font-bold text-primary">Included</td>
                  <td className="px-6 py-4 text-center">Included</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium">Google Ads</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">—</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">—</td>
                  <td className="px-6 py-4 text-center">Included</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium">Lead Generation Strategy</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">—</td>
                  <td className="px-6 py-4 text-center font-bold text-primary">Included</td>
                  <td className="px-6 py-4 text-center">Advanced</td>
                </tr>

                <tr><td colSpan={4} className="bg-muted/20 px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Management & Analytics</td></tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium">Strategy Call</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">—</td>
                  <td className="px-6 py-4 text-center font-bold text-primary">Monthly</td>
                  <td className="px-6 py-4 text-center">Weekly</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium">Reporting</td>
                  <td className="px-6 py-4 text-center">Basic Monthly</td>
                  <td className="px-6 py-4 text-center font-bold text-primary">Detailed Monthly</td>
                  <td className="px-6 py-4 text-center">Advanced + Competitor</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-heading text-4xl font-bold mb-6">Need a custom approach?</h2>
          <p className="text-xl opacity-90 mb-8">Let&apos;s discuss a tailored marketing strategy designed specifically for your revenue goals.</p>
          <Button size="lg" variant="default" className="bg-white text-primary hover:bg-neutral-100 h-14 px-8 text-lg" asChild>
            <Link href="/order-project">Talk to a Marketing Expert</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
