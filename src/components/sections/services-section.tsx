import Link from "next/link";
import { servicesConfig } from "@/config/services";
import { Laptop, TrendingUp, Cpu, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ReactNode> = {
  "laptop": <Laptop className="w-6 h-6" />,
  "trending-up": <TrendingUp className="w-6 h-6" />,
  "cpu": <Cpu className="w-6 h-6" />,
  "pen-tool": <PenTool className="w-6 h-6" />
};

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-background border-b border-border">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
              What We Do
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Digital solutions designed around your business goals.
            </p>
          </div>
          <Button variant="outline" className="border-border hover:bg-muted" asChild>
            <Link href="/services">
              Explore Services <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {servicesConfig.map((service, index) => (
            <div 
              key={service.id} 
              className="group bg-card border border-border rounded-2xl p-8 lg:p-10 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-primary/40 hover:bg-muted/30 hover:shadow-2xl hover:shadow-primary/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/20">
                    {iconMap[service.icon]}
                  </div>
                  <span className="text-muted-foreground/50 font-mono text-sm tracking-wider uppercase">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-10">
                  {service.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center text-sm font-medium text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-3"></span>
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
