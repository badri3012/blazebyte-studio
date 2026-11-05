/**
 * BLAZEBYTE STUDIO — TEST SUITE FOR ISS-004 AND ISS-005
 *
 * Covers:
 * 1. ISS-004: Contact form service dropdown options (4 core services + General Enquiry)
 * 2. ISS-004: Contact API route accepting each service and legacy values
 * 3. ISS-004: Validation failure on missing fields
 * 4. ISS-005: Route title metadata exports for /apps and /ai
 * 5. ISS-005: Non-regression checks for /web and /marketing
 */

import * as fs from "fs";
import * as path from "path";

// Allow importing files that import CSS
(require as any).extensions[".css"] = () => {};

// Load .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const k = trimmed.slice(0, idx).trim();
        let v = trimmed.slice(idx + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        process.env[k] = v;
      }
    }
  }
}

let passed = 0;
let total = 0;

// Hermetic mock for Supabase API calls during unit testing
const originalFetch = global.fetch;
global.fetch = async (input: any, init?: any) => {
  const url = typeof input === "string" ? input : input?.url || "";
  if (url.includes("supabase.co")) {
    return new Response(JSON.stringify([{ id: "test-lead-id" }]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (originalFetch) {
    return originalFetch(input, init);
  }
  return new Response("{}", { status: 200 });
};

function assert(cond: boolean, name: string, detail?: any) {
  total++;
  if (cond) {
    passed++;
    console.log(`✓ [PASS] ${name}`);
  } else {
    console.error(`✗ [FAIL] ${name}`, detail || "");
  }
}

async function run() {
  console.log("=================================================");
  console.log(" RUNNING ISS-004 & ISS-005 COMPREHENSIVE TESTS");
  console.log("=================================================\n");

  // --- 1. ISS-004: Component Inspection ---
  console.log("--- 1. ISS-004: Quick Enquiry Form Component Options ---");
  const formCode = fs.readFileSync(path.join(process.cwd(), "src/components/forms/short-enquiry.tsx"), "utf-8");
  assert(formCode.includes('<option value="Web Development">Web Development</option>'), "Includes 'Web Development' option");
  assert(formCode.includes('<option value="Digital Marketing">Digital Marketing</option>'), "Includes 'Digital Marketing' option");
  assert(formCode.includes('<option value="AI Automation">AI Automation</option>'), "Includes 'AI Automation' option");
  assert(formCode.includes('<option value="Custom Application Development">Custom Application Development</option>'), "Includes 'Custom Application Development' option");
  assert(formCode.includes('<option value="General Enquiry">General Enquiry</option>'), "Preserves 'General Enquiry' option");
  assert(formCode.includes('if (submitting) return;'), "Has anti-spam double-click prevention");

  // --- 2. ISS-004: Contact API Route Tests ---
  console.log("\n--- 2. ISS-004: Contact API Service Submissions ---");
  const { POST: contactPOST } = await import("../src/app/api/contact/route");

  const servicesToTest = [
    { input: "Web Development", expected: "Web Development" },
    { input: "Digital Marketing", expected: "Digital Marketing" },
    { input: "AI Automation", expected: "AI Automation" },
    { input: "Custom Application Development", expected: "Custom Application Development" },
    { input: "General Enquiry", expected: "General Enquiry" },
    // Backwards compatibility legacy values
    { input: "apps", expected: "Custom Application Development" },
    { input: "web", expected: "Web Development" },
    { input: "marketing", expected: "Digital Marketing" },
    { input: "ai", expected: "AI Automation" }
  ];

  for (const item of servicesToTest) {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `Test Lead ${item.input}`,
        email: `test-${item.input.toLowerCase().replace(/[^a-z0-9]/g, "")}@example.com`,
        phone: "+91 98765 43210",
        service: item.input,
        details: `Automated test for service: ${item.input}`,
      }),
    });

    const res = await contactPOST(req);
    const data = await res.json();
    assert(res.status === 200, `POST /api/contact with service '${item.input}' returns HTTP 200`);
    assert(data.success === true, `Response success is true for '${item.input}'`);
    assert(data.data?.service === item.expected, `Service normalized correctly: '${item.input}' -> '${data.data?.service}' (expected '${item.expected}')`);
  }

  // Validation failure tests
  console.log("\n--- 3. ISS-004: Form Validation Edge Cases ---");
  const reqNoName = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "valid@example.com", service: "Web Development" }),
  });
  const resNoName = await contactPOST(reqNoName);
  assert(resNoName.status === 400, "Rejects submission when name is missing (HTTP 400)");

  const reqNoEmail = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Tester", email: "invalid-email", service: "Web Development" }),
  });
  const resNoEmail = await contactPOST(reqNoEmail);
  assert(resNoEmail.status === 400, "Rejects submission when email is invalid (HTTP 400)");

  // --- 4. ISS-005: Metadata Title Structure & Inheritance Tests ---
  console.log("\n--- 4. ISS-005: Page Title Metadata Verification ---");
  const rootLayoutSource = fs.readFileSync(path.join(process.cwd(), "src/app/layout.tsx"), "utf-8");
  const templateMatch = rootLayoutSource.match(/template:\s*["']([^"']+)["']/);
  const titleTemplate = templateMatch ? templateMatch[1] : "";
  assert(titleTemplate === "%s | BlazeByte Studio", "Root layout defines template '%s | BlazeByte Studio'");

  // Helper to compute final rendered title
  function computeFinalTitle(routeTitle: any): string {
    if (typeof routeTitle === "string") {
      return titleTemplate ? titleTemplate.replace("%s", routeTitle) : routeTitle;
    }
    if (routeTitle && typeof routeTitle === "object" && "absolute" in routeTitle) {
      return routeTitle.absolute;
    }
    return "";
  }

  // /apps metadata
  const appsLayout = await import("../src/app/apps/layout");
  const appsMeta = appsLayout.metadata;
  const finalAppsTitle = computeFinalTitle(appsMeta.title);
  console.log(`  Rendered /apps title: "${finalAppsTitle}"`);
  assert(
    finalAppsTitle === "Custom App Development Company in Coimbatore | BlazeByte Studio",
    "Final /apps title is exactly 'Custom App Development Company in Coimbatore | BlazeByte Studio'"
  );
  assert(!finalAppsTitle.includes("BlazeByte Studio | BlazeByte Studio"), "No duplicate brand suffix on /apps");
  assert(appsMeta.openGraph?.title === "Custom App Development Company in Coimbatore | BlazeByte Studio", "OpenGraph title for /apps matches exactly");
  assert(appsMeta.alternates?.canonical === "https://www.blazebyte.shop/apps", "/apps canonical is https://www.blazebyte.shop/apps");

  // /ai metadata
  const aiLayout = await import("../src/app/ai/layout");
  const aiMeta = aiLayout.metadata;
  const finalAiTitle = computeFinalTitle(aiMeta.title);
  console.log(`  Rendered /ai title: "${finalAiTitle}"`);
  assert(
    finalAiTitle === "AI Automation Services in Coimbatore | BlazeByte Studio",
    "Final /ai title is exactly 'AI Automation Services in Coimbatore | BlazeByte Studio'"
  );
  assert(finalAiTitle.includes("in Coimbatore"), "Includes local targeting 'in Coimbatore' on /ai");
  assert(aiMeta.openGraph?.title === "AI Automation Services in Coimbatore | BlazeByte Studio", "OpenGraph title for /ai matches exactly");
  assert(aiMeta.alternates?.canonical === "https://www.blazebyte.shop/ai", "/ai canonical is https://www.blazebyte.shop/ai");

  // Non-regression: /web and /marketing metadata
  console.log("\n--- 5. ISS-005: Non-Regression on /web and /marketing ---");
  const webLayout = await import("../src/app/web/layout");
  const finalWebTitle = computeFinalTitle(webLayout.metadata.title);
  assert(finalWebTitle === "Web Development Company in Coimbatore | BlazeByte Studio", "/web title preserved: 'Web Development Company in Coimbatore | BlazeByte Studio'");

  const marketingLayout = await import("../src/app/marketing/layout");
  const finalMarketingTitle = computeFinalTitle(marketingLayout.metadata.title);
  assert(finalMarketingTitle === "Digital Marketing Agency in Coimbatore | BlazeByte Studio", "/marketing title preserved: 'Digital Marketing Agency in Coimbatore | BlazeByte Studio'");

  console.log("\n=================================================");
  console.log(` SUMMARY: ${passed}/${total} TESTS PASSED (100%)`);
  console.log("=================================================");

  if (passed !== total) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
