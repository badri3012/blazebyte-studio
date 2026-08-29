import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Cookie Policy | BlazeByte Studio",
  description: "Information on how BlazeByte Studio uses cookies and tracking technologies.",
};

export default function CookiePolicyPage() {
  const lastUpdated = "August 30, 2026";

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="mb-12">
          <Link href="/" className="text-primary hover:underline text-sm font-medium mb-6 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <div className="space-y-12 text-lg text-neutral-300 leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">
              {siteConfig.brandName} uses cookies to improve your experience on our website. Specifically, we may use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Necessary Cookies:</strong> These cookies are essential to provide you with services available through our website and to use some of its features, such as securing form submissions (e.g., our Order Project flow).
              </li>
              <li>
                <strong>Analytics and Functional Cookies:</strong> If utilized, these cookies collect information that is used either in aggregate form to help us understand how our website is being used, how effective our marketing campaigns are, or to help us customize our website for you.
              </li>
              <li>
                <strong>Third-Party Cookies:</strong> In some special cases, we also use cookies provided by trusted third parties. This may include analytics platforms or third-party marketing pixels used to track conversions and optimize ad campaigns.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">3. Managing Cookies</h2>
            <p className="mb-4">
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
            <p>
              As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser&apos;s help menu for more information.
            </p>
          </section>

          <section className="pt-8 border-t border-neutral-800">
            <h2 className="font-heading text-2xl font-bold text-white mb-4">4. Contact Us</h2>
            <p className="mb-2">If you have any questions about our use of cookies or other technologies, please email us at:</p>
            <p className="font-bold text-white">{siteConfig.brandName}</p>
            <p>Email: {siteConfig.email}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
