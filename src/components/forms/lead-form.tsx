"use client";

import { useState } from "react";
import { submitLead } from "@/app/actions/lead";
import { Button } from "@/components/ui/button";

export function LeadForm({ defaultPackage = "", source = "contact" }: { defaultPackage?: string, source?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function action(formData: FormData) {
    setStatus("loading");
    setMessage("");
    
    // Add source to form data
    formData.append("source", source);
    if (defaultPackage) {
      formData.append("package", defaultPackage);
    }
    
    const result = await submitLead(formData);
    
    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else if (result.success) {
      setStatus("success");
      setMessage("Thank you! We have received your request and will be in touch shortly.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 text-center h-full flex flex-col justify-center min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
        <h3 className="text-2xl font-heading font-bold mb-4">Request Received 🎉</h3>
        <p className="text-muted-foreground">{message}</p>
        <div className="mt-8">
          <p className="text-sm font-medium">Our next step:</p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            <li>1. We review your requirements</li>
            <li>2. We understand your business goals</li>
            <li>3. We contact you with the next steps</li>
          </ul>
        </div>
        <Button variant="outline" className="mt-8 mx-auto" onClick={() => setStatus("idle")}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="full_name" className="text-sm font-medium">Full Name *</label>
          <input id="full_name" name="full_name" required className="w-full h-11 px-4 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <label htmlFor="business_name" className="text-sm font-medium">Business Name *</label>
          <input id="business_name" name="business_name" required className="w-full h-11 px-4 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="Acme Corp" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
          <input id="email" name="email" type="email" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" required className="w-full h-11 px-4 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
          <input id="phone" name="phone" type="tel" pattern="[0-9\+\-\s\(\)]*" className="w-full h-11 px-4 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="+91 98765 43210" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="website_url" className="text-sm font-medium">Website URL (Optional)</label>
          <input id="website_url" name="website_url" type="url" className="w-full h-11 px-4 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" placeholder="https://yourbrand.com" />
        </div>
        <div className="space-y-2">
          <label htmlFor="industry" className="text-sm font-medium">Business Type</label>
          <select id="industry" name="industry" className="w-full h-11 px-4 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow appearance-none">
            <option value="">Select Industry...</option>
            <option value="Restaurant / Cafe">Restaurant / Cafe</option>
            <option value="Salon / Beauty">Salon / Beauty</option>
            <option value="Clinic / Healthcare">Clinic / Healthcare</option>
            <option value="Gym / Fitness">Gym / Fitness</option>
            <option value="Fashion / Clothing">Fashion / Clothing</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Local Business">Local Business</option>
            <option value="Startup">Startup</option>
            <option value="Personal Brand">Personal Brand</option>
            <option value="Coach / Consultant">Coach / Consultant</option>
            <option value="Service Business">Service Business</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="services" className="text-sm font-medium">Service Interested In *</label>
          <select id="services" name="services" required className="w-full h-11 px-4 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow appearance-none">
            <option value="">Select Service...</option>
            <option value="Social Media Management">Social Media Management</option>
            <option value="Content Creation">Content Creation</option>
            <option value="Meta Ads">Meta Ads</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Lead Generation">Lead Generation</option>
            <option value="Performance Marketing">Performance Marketing</option>
            <option value="AI-Powered Marketing">AI-Powered Marketing</option>
            <option value="Custom Marketing Strategy">Custom Marketing Strategy</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="budget" className="text-sm font-medium">Monthly Marketing Budget</label>
          <select id="budget" name="budget" className="w-full h-11 px-4 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow appearance-none">
            <option value="">Select Range...</option>
            <option value="Under ₹10,000">Under ₹10,000</option>
            <option value="₹10,000 - ₹25,000">₹10,000–₹25,000</option>
            <option value="₹25,000 - ₹50,000">₹25,000–₹50,000</option>
            <option value="₹50,000 - ₹1,00,000">₹50,000–₹1,00,000</option>
            <option value="₹1,00,000+">₹1,00,000+</option>
            <option value="Not Sure">Not Sure</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Message *</label>
        <textarea id="message" name="message" required rows={3} className="w-full p-4 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-shadow resize-none" placeholder="Tell us what you're trying to achieve..." />
      </div>
      
      {/* Honeypot field for basic spam protection */}
      <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {status === "error" && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-200 dark:border-red-900 rounded-md text-sm">
          {message}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full h-14 text-base" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Send Request"}
      </Button>
    </form>
  );
}
