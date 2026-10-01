"use client";

import React from "react";
import { useSound } from "@/context/sound-context";
import { ArrowRight, ArrowUpRight, Zap, Terminal } from "lucide-react";

interface WorldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  world: "web" | "marketing" | "ai" | "apps";
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const WorldButton: React.FC<WorldButtonProps> = ({
  world,
  children,
  size = "md",
  className = "",
  onClick,
  onMouseEnter,
  ...props
}) => {
  const { playHover, playClick } = useSound();

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHover();
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 font-bold",
  };

  // WORLD 01 — WEB BUTTON (Architectural Editorial)
  if (world === "web") {
    return (
      <button
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={`group relative inline-flex items-center justify-center font-heading font-semibold text-[#17191C] bg-[#F4F1EA] border border-[#17191C]/80 hover:bg-[#17191C] hover:text-[#F4F1EA] transition-all duration-300 rounded-none cursor-pointer overflow-hidden ${sizeClasses[size]} ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#3457FF] group-hover:text-[#F4F1EA]" />
        </span>
        {/* Cobalt Travel Line on Hover */}
        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#3457FF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      </button>
    );
  }

  // WORLD 02 — MARKETING BUTTON (Data Acquisition Signal)
  if (world === "marketing") {
    return (
      <button
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={`group relative inline-flex items-center justify-center font-mono font-bold text-[#071522] bg-[#24D6C5] hover:bg-[#8AF7EF] border border-[#24D6C5] shadow-[0_0_20px_rgba(36,214,197,0.3)] transition-all duration-200 rounded cursor-pointer ${sizeClasses[size]} ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </button>
    );
  }

  // WORLD 03 — AI BUTTON (System Activation Node)
  if (world === "ai") {
    return (
      <button
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={`group relative inline-flex items-center justify-center font-mono font-bold text-[#EDEFF5] bg-[#11151B] border border-[#7C5CFF]/60 hover:border-[#6FFFD2] hover:bg-[#7C5CFF]/20 shadow-[0_0_25px_rgba(124,92,255,0.25)] transition-all duration-300 rounded-md cursor-pointer ${sizeClasses[size]} ${className}`}
        {...props}
      >
        <span className="w-2 h-2 rounded-full bg-[#6FFFD2] animate-pulse group-hover:bg-[#7C5CFF]" />
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <Zap className="w-3.5 h-3.5 text-[#6FFFD2] group-hover:rotate-12 transition-transform" />
        </span>
      </button>
    );
  }

  // WORLD 04 — APPS BUTTON (Software Window Action)
  return (
    <button
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`group relative inline-flex items-center justify-center font-mono font-bold text-[#F5F6F8] bg-[#6246EA] hover:bg-[#6246EA]/90 border border-[#DDE2E8]/30 shadow-[0_4px_15px_rgba(98,70,234,0.4)] transition-all duration-200 rounded-lg cursor-pointer ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <Terminal className="w-4 h-4 text-[#F2D479]" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <span className="text-xs text-[#F2D479] group-hover:translate-x-1 transition-transform">→</span>
      </span>
    </button>
  );
};
