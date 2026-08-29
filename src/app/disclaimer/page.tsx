import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Disclaimer | BlazeByte Studio",
  description: "Important legal disclaimers regarding marketing outcomes and services.",
};

export default function DisclaimerPage() {
  const lastUpdated = "August 30, 2026";

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="mb-12">
          <Link href="/" className="text-primary hover:underline text-sm font-medium mb-6 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Disclaimer</h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="space-y-12 text-lg text-neutral-300 leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">1. General Information</h2>
            <p>
              The information provided by {siteConfig.brandName} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) on our website and through our consulting services is for general informational and educational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">2. Marketing Outcomes and Guarantees</h2>
            <p className="mb-4">
              Digital marketing is a dynamic field influenced by numerous external factors. Therefore, {siteConfig.brandName} strictly disclaims any guarantee of specific marketing outcomes.
            </p>
            <p className="mb-4">
              <strong>We do not guarantee:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>A specific number of leads, sales, or customer acquisitions.</li>
              <li>A specific Return on Ad Spend (ROAS) or Return on Investment (ROI).</li>
              <li>A specific amount of revenue or profit generation.</li>
              <li>Guaranteed placement on search engines or specific rankings.</li>
              <li>A guaranteed increase in social media followers, reach, or engagement.</li>
            </ul>
            <p>
              Marketing results vary significantly from client to client and depend heavily on your industry, offer quality, market competition, budget size, brand reputation, and the overall economic climate. Any explicit guarantees must be explicitly agreed upon in a written contract signed by both parties.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">3. Third-Party Advertising Platforms</h2>
            <p>
              Our services often rely on third-party advertising networks (e.g., Meta Ads, Google Ads). We are not responsible for, nor do we have control over, their algorithmic changes, policy updates, ad account suspensions, fluctuating advertising costs (CPCs/CPMs), or platform outages. Changes made by these platforms can positively or negatively affect your campaign performance without warning.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">4. Case Studies and Concept Projects</h2>
            <p>
              The case studies, portfolio items, and concept campaigns displayed on our website represent our capabilities, strategies, and past work. However, they must not be interpreted as a promise or guarantee that you will achieve identical or similar results. Past performance is not indicative of future results. Any numbers or metrics shown in concept projects are for illustrative presentation purposes only.
            </p>
          </section>

          <section className="pt-8 border-t border-neutral-800">
            <h2 className="font-heading text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p className="mb-2">If you have any questions about this disclaimer, please contact us at:</p>
            <p className="font-bold text-white">{siteConfig.brandName}</p>
            <p>Email: {siteConfig.email}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
