/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Case Studies | BlazeByte Studio",
  description: "Real results and sample campaigns from our digital marketing studio.",
};

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      id: "cafe",
      client: "Concept Project: Local Cafe",
      industry: "Restaurants & Cafes",
      challenge: "Inconsistent foot traffic during weekdays and low social media engagement despite posting daily.",
      strategy: "Shifted focus from generic food photos to behind-the-scenes video content (Reels). Implemented localized Meta Ads targeting a 5km radius with a weekday lunch offer.",
      execution: "Produced 8 high-quality Reels per month. Ran a Lead Generation campaign on Facebook & Instagram offering a 1+1 coffee voucher.",
      outcome: "Increased weekday foot traffic by 35%. Generated 450+ qualified leads via the voucher campaign in 30 days.",
    },
    {
      id: "fitness",
      client: "Sample Campaign: Fitness Studio",
      industry: "Gyms & Fitness",
      challenge: "High cost-per-acquisition (CPA) on Google Ads and poor conversion rate on the landing page.",
      strategy: "Restructured Google Ads campaigns to focus on high-intent 'gym near me' searches. Built a new, high-converting landing page with a clear '1-Week Free Trial' CTA.",
      execution: "Implemented negative keyword lists, rewrote ad copy for better click-through rates (CTR), and set up proper conversion tracking.",
      outcome: "Reduced CPA by 42%. Increased landing page conversion rate from 2.1% to 8.4%.",
    },
    {
      id: "clinic",
      client: "Concept Project: Boutique Clinic",
      industry: "Healthcare & Aesthetics",
      challenge: "Needed to build authority and trust in a highly competitive local market to attract high-ticket clients.",
      strategy: "Developed an educational content strategy focusing on the science behind treatments. Used Meta Ads to promote free consultation bookings.",
      execution: "Created a series of 'Doctor Explains' videos. Set up a WhatsApp automation funnel to nurture leads immediately after they opted in.",
      outcome: "Generated 65 qualified consultations in month one. Built a strong, engaged local following with high trust metrics.",
    }
  ];

  const renderVisual = (id: string) => {
    if (id === "cafe") {
      return (
        <div className="relative w-full h-full bg-[#fdfbf9] overflow-hidden flex items-center justify-center p-6">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Instagram Post Mockup */}
          <div className="relative z-10 w-[240px] bg-white border border-neutral-200 shadow-xl rounded-lg overflow-hidden -rotate-2 transform transition-transform hover:rotate-0 duration-500">
            <div className="flex items-center gap-2 p-3 border-b border-neutral-100">
              <div className="w-6 h-6 rounded-full bg-neutral-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=100&q=80" alt="Cafe avatar" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-semibold text-neutral-800">local_cafe_co</span>
            </div>
            <div className="aspect-square bg-neutral-100 relative">
              <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80" alt="Coffee pouring" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="p-3">
              <div className="flex gap-3 mb-2">
                <div className="w-5 h-5 rounded-full border-2 border-neutral-800" />
                <div className="w-5 h-5 rounded-full border-2 border-neutral-800" />
              </div>
              <div className="text-[10px] text-neutral-600 leading-tight">
                <span className="font-semibold text-neutral-800 mr-1">local_cafe_co</span>
                Weekday slump? We&apos;ve got you. ☕️ Show this post for our exclusive 1+1 lunch hour special.
              </div>
            </div>
          </div>

          {/* Overlapping Performance Card */}
          <div className="absolute bottom-8 right-6 z-20 bg-white p-4 rounded-lg shadow-2xl border border-neutral-200 w-[160px] rotate-3 transform transition-transform hover:rotate-1 duration-500">
            <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mb-2">Campaign Meta</div>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-neutral-900 leading-none mb-1">+450</div>
                <div className="text-[10px] text-neutral-500">Voucher Claims</div>
              </div>
              <div className="h-px w-full bg-neutral-100" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-500">CPA</span>
                <span className="text-xs font-bold text-primary">$1.12</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (id === "fitness") {
      return (
        <div className="relative w-full h-full bg-[#111111] overflow-hidden flex items-center justify-center p-6">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />
          
          {/* Mobile Landing Page Mockup */}
          <div className="relative z-10 w-[180px] h-[320px] bg-neutral-950 border-4 border-neutral-800 rounded-[2rem] shadow-2xl overflow-hidden translate-x-12 -translate-y-4">
            <div className="h-4 w-1/2 bg-neutral-800 mx-auto rounded-b-xl absolute top-0 inset-x-0 z-20" />
            <div className="relative h-1/2">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80" alt="Gym workout" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
            </div>
            <div className="p-4 flex flex-col items-center text-center -mt-8 relative z-10">
              <h4 className="text-white font-black uppercase text-lg leading-tight mb-2 italic">Transform<br/>Today</h4>
              <p className="text-[9px] text-neutral-400 mb-4">Join the most elite training facility.</p>
              <div className="w-full py-2 bg-primary text-primary-foreground text-[10px] font-bold rounded uppercase tracking-wider">Claim 1-Week Free</div>
            </div>
          </div>

          {/* Google Ad Mockup */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded shadow-2xl border border-neutral-200 w-[240px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-neutral-900 border border-neutral-300 px-1 rounded-sm">Ad</span>
              <span className="text-[10px] text-neutral-500">www.elitefitness.com/trial</span>
            </div>
            <h4 className="text-sm font-medium text-blue-700 hover:underline cursor-pointer leading-tight mb-1">
              Premium Gym Near You | Claim Your 1-Week Free Trial
            </h4>
            <p className="text-[11px] text-neutral-600 leading-snug">
              Stop guessing. Start training. Get access to elite equipment, expert coaching, and a proven system.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="text-[10px] text-blue-700 underline">Class Schedule</span>
              <span className="text-[10px] text-blue-700 underline">Our Trainers</span>
            </div>
          </div>
        </div>
      );
    }

    if (id === "clinic") {
      return (
        <div className="relative w-full h-full bg-[#f1f5f9] overflow-hidden flex items-center justify-center p-6">
          {/* Clean minimal background pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="medical-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-grid)" />
          </svg>

          {/* Video Player Mockup */}
          <div className="relative z-10 w-[280px] bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden -translate-x-4">
            <div className="aspect-[16/9] relative bg-neutral-200">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80" alt="Doctor explaining" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg cursor-pointer">
                  <svg className="w-5 h-5 text-slate-800 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-[10px] text-primary font-semibold uppercase tracking-wider mb-1">Educational Series</div>
              <h4 className="text-sm font-semibold text-slate-800 leading-tight">The Science Behind Skin Rejuvenation</h4>
              <div className="w-full bg-slate-100 h-1 mt-3 rounded-full overflow-hidden">
                <div className="bg-primary w-1/3 h-full rounded-full" />
              </div>
            </div>
          </div>

          {/* WhatsApp / Lead Notification */}
          <div className="absolute right-4 bottom-6 z-20 bg-white p-3 rounded-xl shadow-xl border border-slate-100 w-[180px] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-800">New Consultation</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Via WhatsApp Funnel</div>
              <div className="text-[9px] text-slate-400 mt-2">Just now</div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="py-20 lg:py-28 bg-neutral-950 text-white">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Real Strategies.<br/><span className="text-primary">Real Results.</span></h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            See how our data-driven approach to content and advertising translates into actual business growth.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 space-y-24 lg:space-y-32">
          {caseStudies.map((study, index) => (
            <div key={index} className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                  {study.industry}
                </div>
                <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">{study.client}</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">The Challenge</h3>
                    <p className="text-foreground text-base leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">The Strategy</h3>
                    <p className="text-foreground text-base leading-relaxed">{study.strategy}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">The Execution</h3>
                    <p className="text-foreground text-base leading-relaxed">{study.execution}</p>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl mt-8">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-primary mb-2">The Outcome</h3>
                    <p className="text-foreground font-medium text-lg leading-relaxed">{study.outcome}</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-7 order-1 lg:order-2 h-full">
                <div className="aspect-square sm:aspect-[4/3] lg:aspect-[4/5] xl:aspect-[4/3] bg-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center shadow-lg relative group">
                  {renderVisual(study.id)}
                  
                  {/* Subtle presentation frame overlay */}
                  <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-2xl pointer-events-none z-30" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">Ready to be our next success story?</h2>
          <Button size="lg" variant="default" className="bg-white text-primary hover:bg-neutral-100 h-14 px-8 text-lg font-bold shadow-xl" asChild>
            <Link href="/order-project">Get a Free Growth Audit</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
