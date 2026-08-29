import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Privacy Policy | BlazeByte Studio",
  description: "Privacy Policy and Data Protection guidelines for BlazeByte Studio.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 30, 2026";

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="mb-12">
          <Link href="/" className="text-primary hover:underline text-sm font-medium mb-6 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="space-y-12 text-lg text-neutral-300 leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to {siteConfig.brandName} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at {siteConfig.email}.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our services. The personal information that we collect depends on the context of your interactions with us and the website. We may collect the following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and Business Name</li>
              <li>Email Address and Phone Number</li>
              <li>Location and Website URL</li>
              <li>Industry and Project Requirements</li>
              <li>Requested Services and Packages</li>
              <li>Budget, Goals, and Timeline</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use personal information collected via our website for a variety of business purposes described below:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Lead and Enquiry Processing:</strong> To assess your project requirements and determine how our digital marketing services can help you.</li>
              <li><strong>Communication:</strong> To contact you regarding your enquiry, send proposals, and manage our ongoing business relationship.</li>
              <li><strong>Email Notifications:</strong> To send automated confirmations and updates regarding your requested services.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">4. Data Storage and Third-Party Services</h2>
            <p className="mb-4">
              We only share and disclose your information with the following third parties for the purpose of operating our business and providing our services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Supabase:</strong> We use Supabase for our secure database infrastructure to store and manage your project enquiries and lead data.</li>
              <li><strong>Resend:</strong> We use Resend to securely process and deliver email notifications related to your project enquiries.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">5. Data Security and Retention</h2>
            <p className="mb-4">
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">6. Your Privacy Rights</h2>
            <p>
              You have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request by contacting us directly at {siteConfig.email}.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">7. Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The updated version will be indicated by an updated &quot;Last Updated&quot; date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
            </p>
          </section>

          <section className="pt-8 border-t border-neutral-800">
            <h2 className="font-heading text-2xl font-bold text-white mb-4">8. Contact Us</h2>
            <p className="mb-2">If you have questions or comments about this policy, you may email us at:</p>
            <p className="font-bold text-white">{siteConfig.brandName}</p>
            <p>{siteConfig.location}</p>
            <p>Email: {siteConfig.email}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
