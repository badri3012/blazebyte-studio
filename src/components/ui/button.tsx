"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { useSound } from "@/context/sound-context";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "indigo" | "teal" | "blue" | "default" | "link";
  size?: "sm" | "md" | "lg" | "default";
  asChild?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, onClick, onMouseEnter, ...props }, ref) => {
    const { playHover, playClick } = useSound();

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      playHover();
      if (onMouseEnter) onMouseEnter(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playClick();
      if (onClick) onClick(e);
    };

    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory/50 disabled:opacity-50 disabled:pointer-events-none rounded cursor-pointer select-none";

    const normalizedVariant = variant === "default" ? "primary" : variant === "link" ? "ghost" : variant;
    const normalizedSize = size === "default" ? "md" : size;

    const variants = {
      primary: "bg-ivory text-graphite hover:bg-ivory-muted shadow-sm hover:shadow-ivory/10",
      secondary: "bg-graphite-card text-ivory border border-graphite-border hover:border-ivory/30 hover:bg-soft-grey/30",
      outline: "border border-graphite-border text-ivory-muted hover:text-ivory hover:border-ivory/40 hover:bg-graphite-card",
      ghost: "text-ivory-muted hover:text-ivory hover:bg-graphite-card/60",
      indigo: "bg-indigo-accent text-ivory hover:bg-indigo-light shadow-sm glow-indigo",
      teal: "bg-teal-accent text-graphite font-semibold hover:bg-teal-light shadow-sm glow-teal",
      blue: "bg-blue-accent text-graphite font-semibold hover:bg-blue-light shadow-sm glow-blue",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-6 py-3 gap-2.5 font-semibold",
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(baseStyles, variants[normalizedVariant], sizes[normalizedSize], className)}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
