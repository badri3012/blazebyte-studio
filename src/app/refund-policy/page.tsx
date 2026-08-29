import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Refund & Cancellation Policy | BlazeByte Studio",
  description: "Refund and cancellation terms for BlazeByte Studio digital marketing services.",
};

export default function RefundPolicyPage() {
  const lastUpdated = "August 30, 2026";

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="mb-12">
          <Link href="/" className="text-primary hover:underline text-sm font-medium mb-6 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Refund & Cancellation Policy</h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="space-y-12 text-lg text-neutral-300 leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">1. Service-Based Work</h2>
            <p>
              {siteConfig.brandName} operates as a service-based digital marketing agency. Due to the nature of our consulting, strategy, content creation, and campaign management services, time and resources are committed the moment a project begins. Therefore, all digital marketing services are subject to this Refund & Cancellation Policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">2. Non-Refundable Services</h2>
            <p className="mb-4">
              Any work that has already been completed, delivered, or executed is strictly non-refundable. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Completed strategy documents and campaign roadmaps.</li>
              <li>Delivered content, copywriting, or visual assets.</li>
              <li>Setup fees for advertising accounts, tracking pixels, or automation funnels.</li>
              <li>Management fees for past or current billing cycles where work was actively performed.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">3. Third-Party Charges and Advertising Spend</h2>
            <p>
              Under no circumstances will {siteConfig.brandName} refund any advertising spend paid directly or indirectly to third-party platforms (e.g., Meta, Google, LinkedIn). Ad spend is strictly between the client and the respective advertising platform. Any disputes regarding ad spend must be directed to the relevant platform.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">4. Cancellation Process</h2>
            <p className="mb-4">
              If you wish to cancel an ongoing retainer or subscription service, you must provide written notice via email to {siteConfig.email}. The required notice period (e.g., 14 days, 30 days) will be determined by your specific service agreement.
            </p>
            <p>
              Upon cancellation, you will be billed for any outstanding work completed up to the date of termination, and any unspent advance payments (excluding non-refundable setup fees or completed milestones) will be subject to our refund review process.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">5. Custom Work and Advance Payments</h2>
            <p>
              For custom projects, an upfront deposit is often required to secure our resources. This deposit is generally non-refundable once work has commenced. If a project is cancelled by the client before any substantial work has begun, a partial refund may be issued at our sole discretion, minus any administrative or consultative fees incurred.
            </p>
          </section>

          <section className="pt-8 border-t border-neutral-800">
            <h2 className="font-heading text-2xl font-bold text-white mb-4">6. Contact Us</h2>
            <p className="mb-2">If you have any questions about this policy, please contact us at:</p>
            <p className="font-bold text-white">{siteConfig.brandName}</p>
            <p>Email: {siteConfig.email}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
