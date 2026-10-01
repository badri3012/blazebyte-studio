import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="py-32 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
          Have a Business Idea?<br />Let&apos;s Build It.
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Tell us what you&apos;re trying to achieve. We&apos;ll help turn the requirement into a practical digital solution.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="h-14 px-8 text-base bg-primary text-primary-foreground hover:bg-primary-hover shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all w-full sm:w-auto" asChild>
            <Link href="/contact">Start a Project</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-base w-full sm:w-auto border-border hover:bg-muted" asChild>
            <Link href="/contact">Talk to BlazeByte</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
