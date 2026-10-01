"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle radial light for depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-70 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-50 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10 grid lg:grid-cols-12 gap-16 items-center">
        {/* Left Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center rounded-full border border-border bg-muted/30 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-3 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
            Web Development · Digital Marketing · AI Solutions
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
            Build. <span className="text-primary/90">Market.</span><br />
            Grow.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed font-light">
            BlazeByte Studio helps businesses build stronger digital experiences through websites, digital marketing, and modern technology solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="h-14 px-8 text-base bg-primary text-primary-foreground hover:bg-primary-hover shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all w-full sm:w-auto" asChild>
              <Link href="/contact">Start a Project</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base w-full sm:w-auto group border-border hover:bg-muted" asChild>
              <Link href="/portfolio">
                View Our Work
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Right Content - Abstract Tech Visual */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            {/* Base geometric structure */}
            <div className="absolute inset-0 border border-border/40 rounded-full animate-[spin_60s_linear_infinite] opacity-30" />
            <div className="absolute inset-8 border border-primary/20 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-40" />
            <div className="absolute inset-16 border border-border/40 rounded-full animate-[spin_80s_linear_infinite] opacity-20" />
            
            {/* Core Nodes Concept */}
            <div className="relative z-10 w-full flex flex-col gap-6">
              {[
                { label: "Strategy", align: "self-start", delay: "delay-100", offset: "translate-x-12" },
                { label: "Design", align: "self-center", delay: "delay-300", offset: "-translate-x-4" },
                { label: "Technology", align: "self-end", delay: "delay-500", offset: "-translate-x-16" },
                { label: "Growth", align: "self-center", delay: "delay-700", offset: "translate-x-8", highlight: true }
              ].map((node, i, arr) => (
                <div key={node.label} className={`relative flex flex-col items-center ${node.align} ${node.offset}`}>
                  {/* The connection line (except for the last item) */}
                  {i < arr.length - 1 && (
                    <div className="absolute top-1/2 left-1/2 w-[2px] h-[60px] bg-gradient-to-b from-border to-transparent -z-10 translate-y-4" />
                  )}
                  
                  {/* The Node */}
                  <div className={`px-6 py-3 rounded-lg border backdrop-blur-md flex items-center gap-3 transition-all duration-500 hover:-translate-y-1 ${node.highlight ? 'bg-primary/10 border-primary/40 shadow-[0_0_20px_rgba(249,115,22,0.15)] text-primary' : 'bg-card/40 border-border/60 text-foreground shadow-lg shadow-black/20'}`}>
                    {node.highlight && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                    <span className="font-heading font-medium tracking-wide">{node.label}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Subtle floating elements */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary/60 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse" />
            <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
