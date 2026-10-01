export function CapabilityStrip() {
  return (
    <section className="border-b border-border bg-card/30 py-8 lg:py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] shrink-0 text-center lg:text-left">
            What We Build
          </p>
          <div className="flex flex-wrap justify-center lg:justify-end gap-x-8 md:gap-x-12 gap-y-4">
            {['Websites', 'Digital Experiences', 'Marketing Systems', 'AI Solutions'].map((capability) => (
              <span key={capability} className="font-heading font-medium text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors cursor-default">
                {capability}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
