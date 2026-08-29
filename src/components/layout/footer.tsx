import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-900 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Logo className="text-white mb-6" />
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {siteConfig.businessType}. We build comprehensive digital marketing ecosystems designed to generate qualified leads and drive revenue.
            </p>
            <div className="flex gap-4">
              {/* Social links can be added here based on siteConfig if available */}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/packages" className="hover:text-primary transition-colors">Packages</Link></li>
              <li><Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-primary transition-colors">Refund & Cancellation Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>{siteConfig.location}</li>
              <li><a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">{siteConfig.email}</a></li>
              {siteConfig.phone && <li>{siteConfig.phone}</li>}
            </ul>
            <div className="mt-6">
              <Button variant="primary" size="sm" asChild className="w-full sm:w-auto">
                <Link href="/order-project">Order a Project</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-900 text-sm text-neutral-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <p>Designed for Growth.</p>
        </div>
      </div>
    </footer>
  );
}
