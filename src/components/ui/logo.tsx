import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", showTagline = false }) => {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 transition-opacity ${className}`}>
      {/* Architectural Monogram Icon */}
      <div className="relative w-8 h-8 rounded bg-graphite-card border border-graphite-border flex items-center justify-center overflow-hidden group-hover:border-ivory/40 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-accent/20 via-teal-accent/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
        <span className="relative font-heading font-extrabold text-sm tracking-tighter text-ivory">
          B<span className="text-indigo-accent group-hover:text-teal-accent transition-colors">B</span>
        </span>
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-indigo-accent rounded-tl-sm group-hover:bg-teal-accent transition-colors" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-heading font-bold text-base tracking-tight text-ivory group-hover:text-ivory-muted transition-colors">
            BLAZEBYTE
          </span>
          <span className="text-[10px] uppercase font-mono font-medium px-1.5 py-0.5 rounded bg-graphite-card border border-graphite-border text-muted-grey">
            STUDIO
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] text-muted-grey font-mono tracking-wider">
            blazebyte.shop
          </span>
        )}
      </div>
    </Link>
  );
};
