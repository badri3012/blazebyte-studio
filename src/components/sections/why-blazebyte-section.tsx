export function WhyBlazeByteSection() {
  const pillars = [
    {
      title: "Strategy",
      description: "Understand the business before building the solution."
    },
    {
      title: "Design",
      description: "Create digital experiences that are clear, modern, and usable."
    },
    {
      title: "Technology",
      description: "Build scalable and maintainable solutions."
    },
    {
      title: "Growth",
      description: "Focus on business outcomes, not vanity metrics."
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-card border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground leading-[1.1]">
              More Than Just Another Digital Agency.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              BlazeByte combines strategy, design, technology, and growth into one digital workflow. We don&apos;t just deliver a service; we build an engine.
            </p>
          </div>
          
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
              {pillars.map((pillar, index) => (
                <div key={index} className="relative pl-6 border-l border-border/50 hover:border-primary/50 transition-colors duration-300">
                  <div className="absolute top-0 left-0 -translate-x-1/2 w-3 h-3 bg-card border-2 border-primary rounded-full" />
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
