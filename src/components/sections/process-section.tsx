export function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      description: "Understand the business, audience, and requirements."
    },
    {
      num: "02",
      title: "Strategize",
      description: "Define the right digital solution and execution plan."
    },
    {
      num: "03",
      title: "Build",
      description: "Design, develop, test, and refine."
    },
    {
      num: "04",
      title: "Launch & Grow",
      description: "Deploy, optimize, and continuously improve."
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-card border-b border-border">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            How We Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Desktop timeline line */}
          <div className="hidden md:block absolute top-[44px] left-0 w-full h-px bg-border -z-10" />
          
          {/* Mobile timeline line */}
          <div className="md:hidden absolute top-0 left-[22px] w-px h-full bg-border -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-row md:flex-col items-start gap-6 md:gap-0 group">
              <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center shrink-0 md:mb-8 group-hover:border-primary transition-colors duration-300">
                <span className="font-mono font-bold text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {step.num}
                </span>
              </div>
              
              <div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pr-4">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
