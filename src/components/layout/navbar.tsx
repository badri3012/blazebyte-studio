"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link href="/packages" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Packages</Link>
          <Link href="/case-studies" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link>
          <div className="flex items-center gap-4 ml-4">
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            <Button variant="primary" size="sm" asChild>
              <Link href="/order-project">Order a Project</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link href="/services" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link href="/about" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="/packages" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>Packages</Link>
          <Link href="/case-studies" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>Case Studies</Link>
          <Link href="/contact" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <div className="pt-4 mt-2 border-t border-border px-4">
            <Button variant="primary" className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/order-project">Order a Project</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
