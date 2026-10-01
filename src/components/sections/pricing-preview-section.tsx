import Link from "next/link";
import { pricingConfig } from "@/config/pricing";
import { Button } from "@/components/ui/button";

export function PricingPreviewSection() {
  return (
    <section className="py-24 lg:py-32 bg-background border-b border-border">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Solutions for Different Stages of Growth
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {pricingConfig.map((tier) => (
            <div 
              key={tier.id} 
              className="bg-card border border-border rounded-2xl p-8 flex flex-col hover:border-primary/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.05)] transition-all duration-300"
            >
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                {tier.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                {tier.description}
              </p>
              
              <div className="pt-6 border-t border-border mt-auto">
                <p className="font-medium text-foreground text-sm">
                  {tier.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs text-muted-foreground mb-8 uppercase tracking-widest leading-relaxed">
            Final pricing depends on project scope, integrations, content, design complexity, and technical requirements.
          </p>
          <Button size="lg" className="bg-foreground text-background hover:bg-muted-foreground" asChild>
            <Link href="/contact">Get a Quote →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
