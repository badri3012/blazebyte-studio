import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION - Editorial & Confident */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        {/* Subtle radial light for depth */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground mb-8">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
              Premium Digital Marketing Studio
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Don&apos;t Just Get Seen.<br />
              <span className="text-primary relative">
                Get Results.
                {/* Subtle underline decoration */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              We help businesses grow through strategic social media, high-converting content, paid advertising, and data-driven lead generation. No vanity metrics. Just ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" variant="primary" asChild className="w-full sm:w-auto font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                <Link href="/order-project">Get a Growth Plan</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto group">
                <Link href="/packages">
                  View Packages
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-6 relative">
            <div className="bg-card border border-border shadow-sm rounded-lg overflow-hidden flex flex-col">
              {/* Subtle top bar indicating a presentation or workspace */}
              <div className="h-12 border-b border-border bg-muted/20 flex items-center justify-between px-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                  Q3 Campaign Report
                </div>
                <div className="text-xs text-muted-foreground">BlazeByte Studio</div>
              </div>
              
              {/* Main content area resembling an internal marketing report */}
              <div className="p-8 flex flex-col gap-8 bg-background">
                {/* Header of the report */}
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-serif font-medium text-foreground tracking-tight mb-1">Growth Acquisition</h3>
                    <p className="text-sm text-muted-foreground">Jul 1 – Sep 30</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-light text-foreground mb-1">+148<span className="text-lg text-muted-foreground">%</span></p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Client Revenue</p>
                  </div>
                </div>

                {/* Data visualization placeholder area */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 border border-border rounded-sm p-4 flex flex-col justify-between h-32 bg-muted/10">
                    <div className="flex justify-between text-xs text-muted-foreground mb-4">
                      <span>Traffic</span>
                      <span className="text-primary font-medium">+24%</span>
                    </div>
                    {/* Abstract simple chart line */}
                    <svg className="w-full h-12 text-muted" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path d="M0 30 L10 25 L20 28 L30 15 L40 20 L50 10 L60 12 L70 5 L80 8 L90 2 L100 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <path d="M0 30 L10 25 L20 28 L30 15 L40 20 L50 10 L60 12 L70 5 L80 8 L90 2 L100 0 L100 30 L0 30 Z" fill="currentColor" className="opacity-10" />
                    </svg>
                  </div>
                  <div className="border border-border rounded-sm p-4 flex flex-col justify-between h-32 bg-muted/10">
                    <span className="text-xs text-muted-foreground">CPA</span>
                    <div>
                      <p className="text-xl text-foreground font-medium mb-1">$12.40</p>
                      <p className="text-[10px] text-green-600">-18% vs prev</p>
                    </div>
                  </div>
                </div>

                {/* Campaign breakdown list */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-foreground rounded-none"></div>
                      <span className="text-foreground">Meta Conversion Ads</span>
                    </div>
                    <span className="text-muted-foreground font-mono">42%</span>
                  </div>
                  <div className="w-full bg-border h-px"></div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-none"></div>
                      <span className="text-foreground">Organic Social</span>
                    </div>
                    <span className="text-muted-foreground font-mono">35%</span>
                  </div>
                  <div className="w-full bg-border h-px"></div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-muted-foreground rounded-none"></div>
                      <span className="text-foreground">Search Intent</span>
                    </div>
                    <span className="text-muted-foreground font-mono">23%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* A realistic "sticky note" or annotation overlapping slightly, very human */}
            <div className="absolute -right-2 md:-right-6 -top-4 bg-[#fef08a] text-[#854d0e] text-xs font-serif italic py-2 px-3 border border-[#fde047] shadow-sm rotate-3 max-w-[140px] hidden sm:block">
              Review ad copy for Q4 push!
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION - Minimal & Clean */}
      <section className="border-y border-border bg-card py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest shrink-0">Platform Expertise</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-6 opacity-60">
              {['Instagram', 'Facebook', 'Google Ads', 'YouTube', 'WhatsApp'].map((platform) => (
                <span key={platform} className="font-heading font-medium text-lg text-foreground hover:opacity-100 transition-opacity">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION - Editorial Split */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-8">
              <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                Posting More Isn&apos;t Always Growing More.
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Most businesses are trapped in the content hamster wheel. You spend hours creating posts, guessing what the algorithm wants, and boosting ads without a clear conversion strategy.
                </p>
                <p>
                  The result? Low engagement, wasted ad spend, and a follower count that doesn&apos;t translate into revenue.
                </p>
              </div>
              <ul className="space-y-4">
                {['No clear strategy', 'Inconsistent content', 'Wasted ad spend', 'No lead system'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <span className="text-red-500">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10" />
              <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-sm h-full flex flex-col justify-center">
                <h3 className="font-heading text-2xl font-bold mb-6">That&apos;s where BlazeByte comes in.</h3>
                <p className="text-muted-foreground mb-8 text-lg">
                  We replace guesswork with a data-driven marketing engine designed specifically to generate qualified leads and drive actual business growth.
                </p>
                <ul className="space-y-4">
                  {[
                    { title: 'Strategy', desc: 'Custom roadmaps for your business' },
                    { title: 'Content', desc: 'High-converting creative assets' },
                    { title: 'Targeting', desc: 'Precision audience acquisition' },
                    { title: 'Conversion', desc: 'Optimized funnels that generate leads' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 shrink-0">✓</div>
                      <div>
                        <span className="font-semibold text-foreground block">{item.title}</span>
                        <span className="text-sm text-muted-foreground">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - Visual Variety */}
      <section className="bg-neutral-950 text-neutral-100 py-32" id="services">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">Stop Posting.<br/>Start Growing.</h2>
              <p className="text-xl text-neutral-400 font-light">From organic content to paid acquisition, we build the entire marketing ecosystem.</p>
            </div>
            <Button variant="primary" asChild className="shrink-0">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>

          {/* Editorial Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured Service */}
            <div className="md:col-span-8 bg-neutral-900 border border-primary/30 rounded-2xl p-8 lg:p-12 group transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/60 md:hover:bg-[#1a1a1a] md:hover:shadow-2xl md:hover:shadow-primary/10">
              <div className="flex justify-between items-start mb-12">
                <h3 className="font-heading text-3xl font-bold text-white">Social Media &<br/>Content Creation</h3>
                <span className="text-primary font-mono text-sm tracking-wider uppercase transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-80">01</span>
              </div>
              <p className="text-neutral-400 text-lg mb-8 max-w-xl">
                We transform your digital presence with strategic content calendars, high-converting statics, engaging reels, and active community management that builds trust.
              </p>
              <Link href="/services#social-media" className="inline-flex items-center text-white font-medium hover:text-primary transition-colors">
                Explore Content Strategy <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Supporting Service */}
            <div className="md:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 group transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/40 md:hover:bg-[#1a1a1a] md:hover:shadow-xl md:hover:shadow-primary/5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <h3 className="font-heading text-xl font-bold text-white">Meta Ads</h3>
                  <span className="text-primary font-mono text-sm tracking-wider uppercase transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-80">02</span>
                </div>
                <p className="text-neutral-400">Data-driven advertising campaigns focused purely on ROI and qualified lead generation.</p>
              </div>
              <Link href="/services#ads" className="inline-flex items-center text-sm text-white font-medium hover:text-primary transition-colors mt-8">
                View Ad Services <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Supporting Service */}
            <div className="md:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 group transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/40 md:hover:bg-[#1a1a1a] md:hover:shadow-xl md:hover:shadow-primary/5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <h3 className="font-heading text-xl font-bold text-white">Google Ads</h3>
                  <span className="text-primary font-mono text-sm tracking-wider uppercase transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-80">03</span>
                </div>
                <p className="text-neutral-400">Capture high-intent search traffic with precision keyword targeting and optimized landing pages.</p>
              </div>
              <Link href="/services#ads" className="inline-flex items-center text-sm text-white font-medium hover:text-primary transition-colors mt-8">
                View Search Strategy <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Supporting Service */}
            <div className="md:col-span-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 lg:p-12 group transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:border-primary/40 md:hover:bg-[#1a1a1a] md:hover:shadow-2xl md:hover:shadow-primary/5">
              <div className="flex justify-between items-start mb-12">
                <h3 className="font-heading text-3xl font-bold text-white">Performance Marketing &<br/>Lead Generation</h3>
                <span className="text-primary font-mono text-sm tracking-wider uppercase transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-80">04</span>
              </div>
              <p className="text-neutral-400 text-lg mb-8 max-w-xl">
                End-to-end funnels designed to capture, qualify, and convert your ideal customers. We optimize every touchpoint from the first ad click to the final WhatsApp conversation.
              </p>
              <Link href="/services#lead-generation" className="inline-flex items-center text-white font-medium hover:text-primary transition-colors">
                Explore Lead Gen <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS - Visual Rhythm */}
      <section className="py-32 bg-background border-b border-border">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">How We Drive Growth</h2>
            <p className="text-lg text-muted-foreground">A proven, systematic approach to transforming your digital presence into a revenue-generating asset.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { num: '01', title: 'Discover', desc: 'Understand your audience & goals.' },
              { num: '02', title: 'Strategize', desc: 'Create the marketing roadmap.' },
              { num: '03', title: 'Create', desc: 'Develop content & campaigns.' },
              { num: '04', title: 'Launch', desc: 'Publish and run advertising.' },
              { num: '05', title: 'Optimize', desc: 'Analyze data and improve.' },
              { num: '06', title: 'Grow', desc: 'Scale strategies that work.' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col group">
                <span className="text-primary font-mono text-lg font-bold mb-4">{step.num}</span>
                <div className="h-0.5 w-full bg-border mb-6 relative">
                  <div className="absolute top-0 left-0 h-full w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
                </div>
                <h4 className="font-heading font-bold text-xl mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES - Editorial List */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Who We Help</h2>
              <p className="text-lg text-muted-foreground mb-8">We partner with ambitious businesses ready to scale their digital footprint and dominate their local or digital market.</p>
              <Button variant="outline" asChild>
                <Link href="/case-studies">View Sample Campaigns</Link>
              </Button>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {[
                  'Restaurants', 'Cafes', 'Salons', 
                  'Clinics', 'Gyms', 'Fashion', 
                  'E-commerce', 'Startups', 'Local Businesses', 'Personal Brands', 'Service Businesses'
                ].map((industry, i) => (
                  <div key={i} className="py-4 border-b border-border flex items-center group cursor-default">
                    <span className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors mr-4" />
                    <span className="font-medium group-hover:translate-x-1 transition-transform">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - Premium Audit */}
      <section className="py-32 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 tracking-tight">Want to Know What&apos;s Holding Your Marketing Back?</h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto font-light">
            Get a comprehensive analysis of your current digital presence and a customized roadmap for growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="primary" className="h-14 px-8 text-lg w-full sm:w-auto" asChild>
              <Link href="/order-project">Get a Free Growth Audit</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto border-neutral-700 text-white hover:bg-neutral-800" asChild>
              <Link href="/packages">Explore Packages</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
