import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Frequently Asked Questions | BlazeByte Studio",
  description: "Answers to common questions about our digital marketing services.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "What does Digital Marketing include?",
      a: "Our digital marketing ecosystem includes strategic social media management, high-converting content creation, targeted Meta and Google Ads, automated lead generation funnels, and comprehensive performance analytics. We don't just manage channels; we manage your entire customer acquisition strategy."
    },
    {
      q: "Which package should I choose?",
      a: "The Starter package is ideal if you need a professional presence but have a limited budget. The Growth package is our most popular because it includes Meta Ads and active lead generation. Choose Pro if you are aggressively scaling and want to dominate both search (Google) and social (Meta) channels."
    },
    {
      q: "Is ad spend included in the package price?",
      a: "No. Advertising spend is paid directly to the platforms (Meta, Google). Our package fees cover the strategy, creative production, campaign setup, continuous optimization, and reporting."
    },
    {
      q: "Do you create reels and video content?",
      a: "Yes. Short-form video is critical for modern growth. Both our Growth and Pro packages include dedicated Reel production, from scripting concepts to editing."
    },
    {
      q: "How do you report results?",
      a: "We provide detailed monthly reports that focus on business metrics, not just vanity metrics. You'll see exactly how much we spent, how many qualified leads were generated, your Cost Per Acquisition (CPA), and actionable recommendations for the next month."
    },
    {
      q: "Can packages be customized?",
      a: "Absolutely. While our standard packages fit most businesses, we frequently build Custom Strategies for enterprises, e-commerce brands, or businesses requiring complex full-funnel automation."
    },
    {
      q: "How long does onboarding take?",
      a: "Our typical onboarding process takes 7-10 days. This includes a deep-dive discovery call, asset collection, strategy development, and getting the first month's content and campaigns approved for launch."
    },
    {
      q: "Do you work with local businesses?",
      a: "Yes. We have specialized strategies for local businesses (like restaurants, salons, and clinics) focused on hyper-local targeting and driving foot traffic."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="py-20 lg:py-28 bg-neutral-950 text-white border-b border-neutral-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-neutral-400">Everything you need to know about partnering with BlazeByte Studio.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-border bg-card rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-shadow hover:shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-heading font-semibold text-lg text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
                  {faq.q}
                  <span className="transition group-open:rotate-180 ml-6 shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
                </summary>
                <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-border mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-heading text-3xl font-bold mb-6">Still have questions?</h2>
          <p className="text-muted-foreground mb-8 text-lg">We&apos;re here to help. Contact us directly and we&apos;ll get back to you within 24 hours.</p>
          <Button size="lg" variant="primary" className="h-14 px-8 text-lg" asChild>
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
