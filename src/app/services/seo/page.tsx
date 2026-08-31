import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "SEO Services | Technical, Local & Content SEO | BlazeByte Studio",
  description:
    "BlazeByte Studio provides technical SEO, on-page SEO, local SEO, content SEO and e-commerce SEO to help businesses increase organic visibility, qualified traffic and leads.",
};

export default function SEOPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* HERO */}
      <section className="py-20 lg:py-32 bg-background relative overflow-hidden border-b border-border">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground mb-8">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-2" />
              Organic Growth & Search Visibility
            </div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              SEO That Turns Search
              <br />
              <span className="text-primary">Into Business Growth.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
              We build search strategies that improve organic visibility,
              attract high-intent visitors, and create a stronger pipeline of
              qualified customers.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="primary" asChild>
                <Link href="/order-project">Get an SEO Growth Plan</Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="text-primary font-mono text-sm uppercase tracking-widest mb-5">
                Why SEO
              </p>

              <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
                More Visibility.
                <br />
                Better Intent.
                <br />
                Stronger Growth.
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Search visibility matters when your customers are actively
                looking for what you sell. Our SEO approach combines technical
                foundations, useful content, search intent and conversion
                strategy to build sustainable organic growth.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  title: "Technical Foundation",
                  desc: "Improve crawlability, indexation, site structure and technical search performance.",
                },
                {
                  title: "Search Intent",
                  desc: "Target keywords and topics aligned with what your potential customers actually search for.",
                },
                {
                  title: "Content Strategy",
                  desc: "Create useful, relevant pages designed to attract qualified organic traffic.",
                },
                {
                  title: "Conversion Focus",
                  desc: "Turn search traffic into enquiries with clear pages, stronger CTAs and better user journeys.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border border-border bg-card rounded-2xl p-7"
                >
                  <h3 className="font-heading text-xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE SEO SERVICES */}
      <section className="py-24 lg:py-32 bg-neutral-950 text-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-3xl mb-16">
            <p className="text-primary font-mono text-sm uppercase tracking-widest mb-5">
              SEO Services
            </p>

            <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">
              A Complete SEO System,
              <br />
              Not a Single Tactic.
            </h2>

            <p className="text-lg text-neutral-400 leading-relaxed">
              We combine multiple SEO disciplines so your website can build
              stronger visibility across the search journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                number: "01",
                title: "Technical SEO",
                desc: "Site architecture, crawlability, indexation, canonicalisation, sitemaps, robots directives and technical health.",
              },
              {
                number: "02",
                title: "On-Page SEO",
                desc: "Page titles, headings, content structure, internal links, keyword targeting and search-intent alignment.",
              },
              {
                number: "03",
                title: "Local SEO",
                desc: "Location-focused optimisation designed to improve visibility for businesses serving specific cities and areas.",
              },
              {
                number: "04",
                title: "Content SEO",
                desc: "Topic clusters, service pages, informational content and commercially relevant search opportunities.",
              },
              {
                number: "05",
                title: "E-commerce SEO",
                desc: "Category, product and collection optimisation to improve organic discovery across online stores.",
              },
              {
                number: "06",
                title: "SEO Audits & Reporting",
                desc: "Structured audits and performance tracking to identify technical issues, content gaps and growth opportunities.",
              },
            ].map((service) => (
              <div
                key={service.number}
                className="border border-neutral-800 bg-neutral-900 rounded-2xl p-8 hover:border-primary/50 transition-colors"
              >
                <div className="flex justify-between items-start gap-6 mb-8">
                  <h3 className="font-heading text-2xl font-bold">
                    {service.title}
                  </h3>

                  <span className="text-primary font-mono text-sm">
                    {service.number}
                  </span>
                </div>

                <p className="text-neutral-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL + INDIA */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-muted/30 border border-border rounded-2xl p-8 lg:p-10">
              <p className="text-primary font-mono text-sm uppercase tracking-widest mb-5">
                Local SEO
              </p>

              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
                SEO for Businesses in Coimbatore
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-8">
                Build stronger local visibility for searches related to your
                services, products and business location. Useful for local
                businesses that depend on calls, enquiries, visits and nearby
                customers.
              </p>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div>• Local search intent targeting</div>
                <div>• Location-focused service pages</div>
                <div>• Google Business Profile alignment</div>
                <div>• Local content opportunities</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 lg:p-10">
              <p className="text-primary font-mono text-sm uppercase tracking-widest mb-5">
                Wider Reach
              </p>

              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5">
                Scale SEO Beyond One City
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-8">
                For businesses targeting customers across India or broader
                markets, we structure SEO around national search demand,
                competitive topics and scalable content opportunities.
              </p>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div>• National keyword targeting</div>
                <div>• Competitive SERP analysis</div>
                <div>• Content cluster development</div>
                <div>• Scalable landing-page architecture</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 lg:py-32 bg-muted/20 border-y border-border">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-mono text-sm uppercase tracking-widest mb-5">
              Our Process
            </p>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-5">
              How We Build Organic Growth
            </h2>

            <p className="text-lg text-muted-foreground">
              A structured SEO process built around technical quality, search
              intent and measurable business outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              ["01", "Audit", "Find technical issues, content gaps and search opportunities."],
              ["02", "Research", "Map keywords, topics and intent to valuable pages."],
              ["03", "Optimise", "Improve technical, on-page and internal-link signals."],
              ["04", "Build", "Create pages and content around strategic opportunities."],
              ["05", "Measure", "Track visibility, traffic and qualified conversions."],
            ].map(([number, title, desc]) => (
              <div
                key={number}
                className="border border-border bg-background rounded-2xl p-6"
              >
                <span className="text-primary font-mono font-bold text-lg">
                  {number}
                </span>

                <h3 className="font-heading text-xl font-bold mt-5 mb-3">
                  {title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <p className="text-primary font-mono text-sm uppercase tracking-widest mb-5">
                Industries
              </p>

              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Built Around Your Market
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                SEO works best when the strategy reflects the audience, buying
                journey and competitive environment of the business.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-8">
              {[
                "Restaurants",
                "Cafes",
                "Salons",
                "Clinics",
                "Gyms",
                "Fashion",
                "E-commerce",
                "Startups",
                "Local Businesses",
                "Personal Brands",
                "Service Businesses",
                "Professional Services",
              ].map((industry) => (
                <div
                  key={industry}
                  className="py-5 border-b border-border flex items-center"
                >
                  <span className="w-2 h-2 rounded-full bg-primary mr-4" />
                  <span className="font-medium">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-muted/20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-14">
            <p className="text-primary font-mono text-sm uppercase tracking-widest mb-5">
              FAQ
            </p>

            <h2 className="font-heading text-4xl md:text-5xl font-bold">
              Common SEO Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How long does SEO take to show results?",
                a: "SEO is a compounding channel. The timeline depends on competition, website condition, search demand, content quality and the amount of work implemented.",
              },
              {
                q: "Do you provide local SEO?",
                a: "Yes. Local SEO can be structured around city-level search intent, location-specific pages and other local visibility signals.",
              },
              {
                q: "Can SEO generate leads?",
                a: "Yes. SEO can contribute qualified organic traffic, but lead generation depends on search intent, landing-page quality, offer strength and conversion experience as well.",
              },
              {
                q: "Do you work with e-commerce websites?",
                a: "Yes. E-commerce SEO can focus on product, category and collection discovery, technical structure and commercially relevant search demand.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="border border-border bg-background rounded-2xl p-7"
              >
                <h3 className="font-heading text-xl font-bold mb-3">
                  {faq.q}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-neutral-950 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Ready to Build Your
            <br />
            Organic Growth Engine?
          </h2>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Get a practical SEO strategy built around your market, search
            opportunities and business goals.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="primary" asChild>
              <Link href="/order-project">Get Your SEO Growth Plan</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-neutral-700 text-white hover:bg-neutral-900"
              asChild
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
