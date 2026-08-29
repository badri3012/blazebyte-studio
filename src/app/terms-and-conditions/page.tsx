import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Terms & Conditions | BlazeByte Studio",
  description: "Terms of Service and Conditions for engaging with BlazeByte Studio.",
};

export default function TermsPage() {
  const lastUpdated = "August 30, 2026";

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="mb-12">
          <Link href="/" className="text-primary hover:underline text-sm font-medium mb-6 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="space-y-12 text-lg text-neutral-300 leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing our website and engaging {siteConfig.brandName} for digital marketing services, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">2. Description of Services</h2>
            <p>
              {siteConfig.brandName} provides digital marketing services, including but not limited to social media management, content creation, paid advertising (Meta Ads, Google Ads), performance marketing, and lead generation. The specific scope of work will be outlined in a separate written agreement or proposal provided to the client.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">3. Client Responsibilities & Project Approval</h2>
            <p>
              The client agrees to provide necessary access to relevant platforms, assets, and information required for the execution of the services. Delays in client feedback or approval may result in timeline extensions. Final approval on deliverables rests with the client, and subsequent changes after approval may incur additional fees.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
            <p className="mb-4">
              Payment terms, including upfront deposits, milestones, and retainer fees, will be detailed in your specific service agreement.
            </p>
            <p className="font-bold text-white mb-2">Advertising Spend:</p>
            <p>
              Please note that our agency fees cover management, strategy, and creative execution. They <strong>do not</strong> include the advertising spend required by third-party platforms (e.g., Facebook, Google). The client is solely responsible for funding their own advertising accounts directly.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">5. Third-Party Platforms & Performance Disclaimer</h2>
            <p className="mb-4">
              We utilize third-party platforms (e.g., Meta, Google, LinkedIn) to execute campaigns. We have no control over their algorithms, policy changes, account suspensions, or technical outages.
            </p>
            <p>
              <strong>No Guaranteed Results:</strong> While we utilize industry best practices and data-driven strategies, we cannot guarantee specific outcomes such as a guaranteed number of leads, sales, followers, Return on Ad Spend (ROAS), or revenue. Marketing results are influenced by market conditions, competition, and external factors beyond our control.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
            <p>
              Unless otherwise agreed in writing, {siteConfig.brandName} retains the intellectual property rights to the strategies, frameworks, and raw creative files developed during the project. Upon full payment, the client is granted a license to use the final delivered assets for their intended marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">7. Confidentiality</h2>
            <p>
              Both parties agree to maintain the confidentiality of any proprietary information, business strategies, and data shared during the course of the engagement.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">8. Cancellation and Termination</h2>
            <p>
              Either party may terminate the agreement with written notice as specified in the individual service contract. We reserve the right to suspend or terminate services if payments are delayed or if there is a material breach of these terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <p>
              In no event shall {siteConfig.brandName}, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">10. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, specifically within the jurisdiction of Tamil Nadu, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="pt-8 border-t border-neutral-800">
            <h2 className="font-heading text-2xl font-bold text-white mb-4">11. Contact Us</h2>
            <p className="mb-2">For any legal inquiries regarding these terms, contact us at:</p>
            <p className="font-bold text-white">{siteConfig.brandName}</p>
            <p>{siteConfig.location}</p>
            <p>Email: {siteConfig.email}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
