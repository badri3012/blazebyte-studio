import Link from "next/link";
import { projectsConfig } from "@/config/projects";
import { Button } from "@/components/ui/button";

export function FeaturedWorkSection() {
  return (
    <section className="py-24 lg:py-32 bg-background border-b border-border">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
              Selected Work
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              A look at what we&apos;re building.
            </p>
          </div>
          <Button variant="outline" className="border-border hover:bg-muted" asChild>
            <Link href="/portfolio">
              View All Work <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {projectsConfig.map((project, index) => (
            <div 
              key={project.id} 
              className={`group flex flex-col ${index === 0 ? 'md:col-span-12' : 'md:col-span-6'}`}
            >
              {/* Visual Placeholder */}
              <div className={`w-full bg-muted border border-border rounded-2xl overflow-hidden relative mb-6 ${index === 0 ? 'aspect-video md:aspect-[21/9]' : 'aspect-[4/3]'}`}>
                {/* Simulated content based on the project type to look like a real project */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-card via-muted to-background/50 flex flex-col items-center justify-center p-8 text-center transition-transform duration-700 ease-out group-hover:scale-105">
                  <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center shadow-lg mb-4">
                    <span className="font-heading font-bold text-xl text-primary">{project.title.charAt(0)}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-foreground mb-2">{project.title}</h3>
                  <div className="px-3 py-1 bg-background/50 border border-border rounded-full text-xs text-muted-foreground uppercase tracking-widest backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
              
              {/* Project Info */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="max-w-xl">
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {project.services}
                  </p>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <Button variant="link" className="text-foreground hover:text-primary p-0 h-auto font-medium md:shrink-0 justify-start" asChild>
                  <Link href={`/work`}>
                    View Project <span className="ml-2">→</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

