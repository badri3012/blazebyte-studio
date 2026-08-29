import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact BlazeByte Studio | Let's Grow Your Business",
  description: "Contact BlazeByte Studio for Digital Marketing. Tell us what you're trying to achieve, and we'll help you figure out the right marketing approach.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const { package: selectedPackage } = await searchParams;

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Context & Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Let&apos;s Grow Your <span className="text-primary">Business</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-12">
                  Tell us what you&apos;re trying to achieve, and we&apos;ll help you figure out the right marketing approach.
                </p>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-xl">{siteConfig.brandName}</h3>
                    <p className="text-primary mb-4">{siteConfig.businessType}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <a href={`mailto:${siteConfig.email}`} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{siteConfig.email}</a>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Location</h3>
                    <p className="text-muted-foreground">{siteConfig.location}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Founder</h3>
                    <p className="text-muted-foreground">{siteConfig.founderName}</p>
                  </div>
                  
                  {siteConfig.phone && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Phone / WhatsApp</h3>
                      <p className="text-muted-foreground">{siteConfig.phone}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-12 flex flex-col gap-4">
                  <Button size="lg" asChild className="w-full sm:w-auto h-12 text-base shadow-lg shadow-primary/20">
                    <Link href="/order-project">Order a Project Instead</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-xl shadow-black/5">
                <h2 className="font-heading text-2xl font-bold mb-8">Send an Enquiry</h2>
                <LeadForm defaultPackage={selectedPackage} source="contact" />
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
