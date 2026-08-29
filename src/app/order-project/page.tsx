import { OrderProjectForm } from "@/components/forms/order-project-form";


export const metadata = {
  title: "Order a Project | BlazeByte Studio",
  description: "Tell us about your business, your goals and what you need help with. We'll review your requirements and get back to you.",
};

export default function OrderProjectPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-muted/20">
      <section className="py-20 lg:py-24 relative overflow-hidden border-b border-border bg-background">
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-sm uppercase tracking-wider rounded-full mb-6">Client Onboarding</div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Let&apos;s Build Your <span className="text-primary">Growth Plan</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tell us about your business, your goals and what you need help with. We&apos;ll review your requirements and get back to you.
          </p>
        </div>
      </section>

      <section className="py-16 pb-32">
        <div className="container mx-auto max-w-3xl px-4">
          <OrderProjectForm />
        </div>
      </section>
    </div>
  );
}
