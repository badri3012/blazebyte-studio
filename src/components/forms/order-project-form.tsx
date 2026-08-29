"use client";

import { useState } from "react";
import { submitLead } from "@/app/actions/lead";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  "Restaurant / Cafe", "Salon / Beauty", "Clinic / Healthcare", "Gym / Fitness",
  "Fashion / Clothing", "E-commerce", "Local Business", "Startup", 
  "Personal Brand", "Coach / Consultant", "Service Business", "Other"
];

const SERVICES = [
  "Social Media Management", "Social Media Strategy", "Content Creation", 
  "Reels / Short-form Video", "Graphic Design", "Meta Ads", "Google Ads", 
  "Lead Generation", "Local Business Marketing", "SEO", "Brand Strategy", 
  "Influencer Marketing", "Performance Marketing", "Complete Digital Marketing"
];

const PACKAGES = [
  { id: "STARTER", price: "₹9,999 / month", desc: "For businesses starting their digital presence." },
  { id: "GROWTH", price: "₹19,999 / month", desc: "For businesses looking for consistent content, advertising and lead generation." },
  { id: "PRO", price: "₹34,999 / month", desc: "For businesses wanting a complete performance-driven marketing system." },
  { id: "CUSTOM", price: "Custom pricing", desc: "For businesses requiring a tailored strategy." }
];

const TIMELINES = [
  "Immediately", "Within 1 week", "Within 2–4 weeks", "Within 1–2 months", "Just exploring"
];

const GOALS = [
  "More enquiries", "More leads", "More sales", "Better social media presence", 
  "Better brand image", "More website traffic", "Better ad performance", 
  "Consistent content", "Launching a new business", "Other"
];

export function OrderProjectForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    full_name: "", business_name: "", email: "", phone: "", location: "",
    industry: "", website_url: "",
    requirements: "", // What do you need?
    services: [] as string[],
    package: "",
    goals: "", goal_details: "",
    timeline: "",
    message: "",
    consent: false
  });

  const updateForm = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists ? prev.services.filter(s => s !== service) : [...prev.services, service]
      };
    });
  };

  const validateStep = () => {
    if (step === 1) {
      if (formData.full_name.trim().length < 2) {
        setErrorMessage("Please enter a valid full name (minimum 2 characters).");
        return false;
      }
      if (formData.business_name.trim().length < 2) {
        setErrorMessage("Please enter a valid business name (minimum 2 characters).");
        return false;
      }
      
      const emailValue = formData.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValue || !emailRegex.test(emailValue)) {
        setErrorMessage("Please provide a valid email address.");
        return false;
      }
      
      if (!formData.location.trim()) {
        setErrorMessage("Please provide your city/location.");
        return false;
      }
      
      if (!formData.industry) {
        setErrorMessage("Please select your industry.");
        return false;
      }
    }
    
    if (step === 2) {
      if (!formData.requirements.trim()) {
        setErrorMessage("Please tell us what you need help with.");
        return false;
      }
      if (formData.services.length === 0) {
        setErrorMessage("Please select at least one service.");
        return false;
      }
      if (!formData.package) {
        setErrorMessage("Please select a package/budget tier.");
        return false;
      }
      if (!formData.goals) {
        setErrorMessage("Please select a primary project goal.");
        return false;
      }
      if (!formData.timeline) {
        setErrorMessage("Please select a project timeline.");
        return false;
      }
    }
    
    setErrorMessage("");
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setErrorMessage("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      setErrorMessage("You must agree to be contacted to submit the request.");
      return;
    }
    
    if (!validateStep()) return;

    setStatus("loading");
    setErrorMessage("");

    const submitData = new FormData();
    submitData.append("full_name", formData.full_name.trim());
    submitData.append("business_name", formData.business_name.trim());
    submitData.append("email", formData.email.trim().toLowerCase());
    submitData.append("phone", formData.phone.trim());
    submitData.append("location", formData.location.trim());
    submitData.append("industry", formData.industry);
    submitData.append("website_url", formData.website_url.trim());
    
    submitData.append("requirements", formData.requirements.trim());
    submitData.append("services", formData.services.join(", "));
    submitData.append("package", formData.package);
    
    // Combine goal and details for clarity in email/db
    const fullGoal = formData.goal_details.trim() 
      ? `${formData.goals} - ${formData.goal_details.trim()}`
      : formData.goals;
    submitData.append("goals", fullGoal);
    
    submitData.append("timeline", formData.timeline);
    submitData.append("message", formData.message.trim());
    submitData.append("source", "order-project");

    try {
      const result = await submitLead(submitData);
      if (result.error) {
        setStatus("error");
        setErrorMessage(result.error);
      } else if (result.success) {
        setStatus("success");
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Something went wrong while sending your enquiry. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 md:p-16 text-center shadow-xl">
        <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-8 text-4xl shadow-[0_0_30px_rgba(249,115,22,0.3)]">✓</div>
        <h3 className="text-3xl font-heading font-bold mb-4">Enquiry Received</h3>
        <p className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
          Thanks for reaching out to BlazeByte Studio. We&apos;ve received your project details and will get back to you shortly.
        </p>
        
        <p className="font-medium text-foreground mb-8 text-lg">{siteConfig.email}</p>
        
        <div className="flex justify-center">
          <Button variant="primary" size="lg" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-muted/30 p-4 sm:p-6 border-b border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Step {step} of 3</span>
          <span className="text-sm text-muted-foreground font-medium">
            {step === 1 && "Contact & Business"}
            {step === 2 && "Project Requirements"}
            {step === 3 && "Review & Submit"}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="bg-primary h-2 transition-all duration-500 ease-in-out" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
          
          {/* STEP 1: CONTACT & BUSINESS */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="border-b border-border pb-4 mb-6">
                <h2 className="text-2xl font-heading font-bold">Contact & Business</h2>
                <p className="text-muted-foreground">Let&apos;s start with the basics.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name *</label>
                  <input type="text" value={formData.full_name} onChange={e => updateForm('full_name', e.target.value)} required minLength={2} className="w-full h-11 px-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Business Name *</label>
                  <input type="text" value={formData.business_name} onChange={e => updateForm('business_name', e.target.value)} required minLength={2} className="w-full h-11 px-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary" placeholder="Acme Corp" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <input type="email" value={formData.email} onChange={e => updateForm('email', e.target.value)} required className="w-full h-11 px-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <input type="tel" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className="w-full h-11 px-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City / Location *</label>
                  <input type="text" value={formData.location} onChange={e => updateForm('location', e.target.value)} required className="w-full h-11 px-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary" placeholder="e.g. Mumbai, India" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Industry *</label>
                  <select value={formData.industry} onChange={e => updateForm('industry', e.target.value)} required className="w-full h-11 px-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary">
                    <option value="">Select Industry...</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL (Optional)</label>
                <input type="url" value={formData.website_url} onChange={e => updateForm('website_url', e.target.value)} className="w-full h-11 px-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary" placeholder="https://yourwebsite.com" />
              </div>
            </div>
          )}

          {/* STEP 2: PROJECT REQUIREMENTS */}
          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="border-b border-border pb-4 mb-6">
                <h2 className="text-2xl font-heading font-bold">Project Requirements</h2>
                <p className="text-muted-foreground">Tell us how we can help your business grow.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">What do you need? *</label>
                <textarea value={formData.requirements} onChange={e => updateForm('requirements', e.target.value)} required rows={3} className="w-full p-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary resize-none" placeholder="Briefly describe your current situation and what you're looking for..." />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium block">Services Required *</label>
                <div className="flex flex-wrap gap-3">
                  {SERVICES.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                        formData.services.includes(service) 
                          ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20" 
                          : "bg-background border-border text-foreground hover:border-primary/50"
                      )}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium block">Package / Budget *</label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {PACKAGES.map(pkg => (
                    <div 
                      key={pkg.id}
                      onClick={() => updateForm('package', pkg.id)}
                      className={cn(
                        "p-5 rounded-xl border cursor-pointer transition-all relative overflow-hidden",
                        formData.package === pkg.id 
                          ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm" 
                          : "border-border bg-background hover:border-primary/40"
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold font-heading text-lg">{pkg.id}</h3>
                        <div className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                          formData.package === pkg.id ? "border-primary" : "border-muted-foreground"
                        )}>
                          {formData.package === pkg.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                      </div>
                      <p className="text-primary font-semibold text-sm mb-2">{pkg.price}</p>
                      <p className="text-xs text-muted-foreground">{pkg.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium block">Project Goals *</label>
                  <select value={formData.goals} onChange={e => updateForm('goals', e.target.value)} required className="w-full h-12 px-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary font-medium">
                    <option value="">Select Primary Goal...</option>
                    {GOALS.map(goal => <option key={goal} value={goal}>{goal}</option>)}
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-medium block">Timeline *</label>
                  <select value={formData.timeline} onChange={e => updateForm('timeline', e.target.value)} required className="w-full h-12 px-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary font-medium">
                    <option value="">Select Timeline...</option>
                    {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Message (Optional)</label>
                <textarea value={formData.message} onChange={e => updateForm('message', e.target.value)} rows={3} className="w-full p-4 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary resize-none" placeholder="Anything else we should know?" />
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & SUBMIT */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="border-b border-border pb-4 mb-6">
                <h2 className="text-2xl font-heading font-bold">Review & Submit</h2>
                <p className="text-muted-foreground">Please review your details before submitting.</p>
              </div>

              <div className="bg-muted/20 border border-border rounded-xl p-6 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block mb-1">Business Name</span>
                    <span className="font-medium">{formData.business_name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block mb-1">Contact Name</span>
                    <span className="font-medium">{formData.full_name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block mb-1">Email</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block mb-1">Location</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block mb-1">Selected Services</span>
                    <span className="font-medium">{formData.services.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block mb-1">Package</span>
                    <span className="font-medium">{formData.package}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block mb-1">Goal</span>
                    <span className="font-medium">{formData.goals}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-xl border border-border mt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.consent} onChange={e => updateForm('consent', e.target.checked)} className="mt-1 w-5 h-5 rounded text-primary focus:ring-primary border-border bg-background" />
                  <span className="text-sm leading-relaxed font-medium">
                    I confirm that the information provided is accurate and I agree to be contacted by BlazeByte Studio regarding my enquiry.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-200 dark:border-red-900 rounded-lg text-sm flex items-center gap-3 font-medium">
              <span className="font-bold text-lg">!</span> {errorMessage}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 pt-6 border-t border-border flex items-center justify-between gap-4">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep} disabled={status === "loading"}>
                Back
              </Button>
            ) : <div />}
            
            {step < 3 ? (
              <Button type="button" variant="primary" onClick={nextStep} className="px-8">
                Next Step
              </Button>
            ) : (
              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto px-8" disabled={status === "loading" || !formData.consent}>
                {status === "loading" ? "Sending your enquiry..." : "Send Project Enquiry"}
              </Button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
