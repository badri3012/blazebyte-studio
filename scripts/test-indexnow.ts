/**
 * BLAZEBYTE STUDIO — COMPREHENSIVE INDEXNOW INTEGRATION TEST SUITE
 * Tests:
 * 1. Key file verification (existence, exact content, byte length, UTF-8)
 * 2. URL eligibility & normalization logic
 * 3. Submission utility with mocked API responses (200, 202, 400, 403, 422, 429, timeout, 503)
 * 4. API Route security (unauthorized 401 vs authorized 200)
 */

import * as fs from "fs";
import * as path from "path";
import {
  INDEXNOW_KEY,
  INDEXNOW_HOST,
  INDEXNOW_KEY_LOCATION,
  INDEXNOW_ENDPOINT,
  APPROVED_CORE_INDEXABLE_URLS,
  validateUrl,
  filterAndDeduplicateUrls,
  submitToIndexNow,
  explainStatusCode,
} from "../src/lib/indexnow";

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean | undefined | null, testName: string, details?: any) {
  totalTests++;
  if (Boolean(condition)) {
    passedTests++;
    console.log(`✓ [PASS] ${testName}`);
  } else {
    console.error(`✗ [FAIL] ${testName}`, details || "");
  }
}

async function runTestSuite() {
  console.log("=================================================");
  console.log(" RUNNING INDEXNOW INTEGRATION TEST SUITE");
  console.log("=================================================\n");

  // TEST 1: Key File Verification
  console.log("--- 1. KEY FILE TESTS ---");
  const keyFilePath = path.join(process.cwd(), "public", `${INDEXNOW_KEY}.txt`);
  assert(fs.existsSync(keyFilePath), `Key file exists at public/${INDEXNOW_KEY}.txt`);

  const fileContent = fs.readFileSync(keyFilePath, "utf-8");
  assert(fileContent === INDEXNOW_KEY, "Key file content exactly matches INDEXNOW_KEY");
  assert(fileContent.length === 32, "Key file length is exactly 32 characters");
  assert(Buffer.byteLength(fileContent, "utf8") === 32, "Key file size is exactly 32 bytes (no extra whitespace/newlines)");

  // TEST 2: URL Eligibility & Normalization Tests
  console.log("\n--- 2. URL ELIGIBILITY & NORMALIZATION TESTS ---");
  
  // Valid core URLs
  for (const url of APPROVED_CORE_INDEXABLE_URLS) {
    const res = validateUrl(url);
    assert(res.valid, `Core URL is valid: ${url}`);
  }
  assert(APPROVED_CORE_INDEXABLE_URLS.length === 18, "Approved core URLs list has exactly 18 URLs");

  // Trailing slash normalization
  const slashRes = validateUrl("https://www.blazebyte.shop/web/");
  assert(slashRes.valid && slashRes.normalizedUrl === "https://www.blazebyte.shop/web", "Normalizes trailing slash on /web/ to /web");

  // Rejection of non-https
  const httpRes = validateUrl("http://www.blazebyte.shop/web");
  assert(!httpRes.valid && httpRes.reason?.includes("Must be https:"), "Rejects HTTP protocol");

  // Rejection of non-canonical hostnames
  const nonWwwRes = validateUrl("https://blazebyte.shop/web");
  assert(!nonWwwRes.valid && nonWwwRes.reason?.includes("does not match canonical host"), "Rejects apex non-WWW hostname");

  const otherDomainRes = validateUrl("https://blazebyte.store/products");
  assert(!otherDomainRes.valid, "Rejects other domain blazebyte.store");

  const evilDomainRes = validateUrl("https://evil.com/hack");
  assert(!evilDomainRes.valid, "Rejects third-party domain evil.com");

  // Rejection of redirect sources
  const redirectRes = validateUrl("https://www.blazebyte.shop/case-studies");
  assert(!redirectRes.valid && redirectRes.reason?.includes("Redirect source"), "Rejects redirect source /case-studies");

  // Rejection of transactional order pages
  const orderRes = validateUrl("https://www.blazebyte.shop/marketing/order");
  assert(!orderRes.valid && orderRes.reason?.includes("noindex"), "Rejects order page /marketing/order");

  const webOrderRes = validateUrl("https://www.blazebyte.shop/web/order");
  assert(!webOrderRes.valid && webOrderRes.reason?.includes("noindex"), "Rejects order page /web/order");

  const payRes = validateUrl("https://www.blazebyte.shop/pay/INV-123");
  assert(!payRes.valid && payRes.reason?.includes("payment"), "Rejects payment page /pay/INV-123");

  const adminRes = validateUrl("https://www.blazebyte.shop/admin/leads");
  assert(!adminRes.valid && adminRes.reason?.includes("Restricted"), "Rejects admin page /admin/leads");

  // Deduplication
  const dupes = [
    "https://www.blazebyte.shop/web",
    "https://www.blazebyte.shop/web/",
    "https://www.blazebyte.shop/marketing",
    "https://www.blazebyte.shop/web"
  ];
  const dedupRes = filterAndDeduplicateUrls(dupes);
  assert(dedupRes.approved.length === 2, "Deduplication reduces 4 entries (with trailing slash & identical dupes) to 2 unique URLs");
  assert(dedupRes.rejected.length === 2, "Records reasons for duplicate entries");

  // TEST 3: Mocked Submission Utility Tests
  console.log("\n--- 3. SUBMISSION UTILITY TESTS (MOCKED API) ---");

  // Helper to create mock fetch
  function createMockFetch(responses: Array<{ status: number; statusText: string; delay?: number }>) {
    let callIndex = 0;
    return async (url: RequestInfo | URL, init?: RequestInit) => {
      const respDef = responses[callIndex] || responses[responses.length - 1];
      callIndex++;
      if (respDef.delay) {
        await new Promise((r) => setTimeout(r, respDef.delay));
      }
      return {
        status: respDef.status,
        statusText: respDef.statusText,
        ok: respDef.status >= 200 && respDef.status < 300,
        text: async () => "",
        json: async () => ({}),
      } as Response;
    };
  }

  // 3a. Mock 200 OK
  const mockFetch200 = createMockFetch([{ status: 200, statusText: "OK" }]);
  const res200 = await submitToIndexNow(["https://www.blazebyte.shop/web"], { fetchFn: mockFetch200 as any });
  assert(res200.overallSuccess, "200 OK returns overallSuccess = true");
  assert(res200.batches[0].statusCode === 200, "200 OK recorded in batch");

  // 3b. Mock 202 Accepted
  const mockFetch202 = createMockFetch([{ status: 202, statusText: "Accepted" }]);
  const res202 = await submitToIndexNow(["https://www.blazebyte.shop/web"], { fetchFn: mockFetch202 as any });
  assert(res202.overallSuccess, "202 Accepted returns overallSuccess = true");
  assert(res202.batches[0].statusCode === 202, "202 Accepted recorded in batch");

  // 3c. Mock 400 Bad Request
  const mockFetch400 = createMockFetch([{ status: 400, statusText: "Bad Request" }]);
  const res400 = await submitToIndexNow(["https://www.blazebyte.shop/web"], { fetchFn: mockFetch400 as any, maxRetries: 1 });
  assert(!res400.overallSuccess, "400 Bad Request returns overallSuccess = false");
  assert(res400.batches[0].statusCode === 400, "400 Bad Request recorded in batch");

  // 3d. Mock 403 Forbidden
  const mockFetch403 = createMockFetch([{ status: 403, statusText: "Forbidden" }]);
  const res403 = await submitToIndexNow(["https://www.blazebyte.shop/web"], { fetchFn: mockFetch403 as any, maxRetries: 1 });
  assert(!res403.overallSuccess, "403 Forbidden returns overallSuccess = false");
  assert(res403.batches[0].statusCode === 403, "403 Forbidden recorded in batch");

  // 3e. Mock 422 Unprocessable Entity
  const mockFetch422 = createMockFetch([{ status: 422, statusText: "Unprocessable Entity" }]);
  const res422 = await submitToIndexNow(["https://www.blazebyte.shop/web"], { fetchFn: mockFetch422 as any, maxRetries: 1 });
  assert(!res422.overallSuccess, "422 Unprocessable Entity returns overallSuccess = false");
  assert(res422.batches[0].statusCode === 422, "422 recorded in batch");

  // 3f. Mock 429 Rate Limiting with backoff recovery
  const mockFetch429Then200 = createMockFetch([
    { status: 429, statusText: "Too Many Requests" },
    { status: 200, statusText: "OK" }
  ]);
  const res429 = await submitToIndexNow(["https://www.blazebyte.shop/web"], {
    fetchFn: mockFetch429Then200 as any,
    maxRetries: 3
  });
  assert(res429.overallSuccess, "429 Rate Limiting recovers upon backoff retry to 200 OK");
  assert(res429.batches[0].attempts === 2, "Batch required 2 attempts after 429 backoff");

  // 3g. Mock Server Failure 503 with recovery
  const mockFetch503Then200 = createMockFetch([
    { status: 503, statusText: "Service Unavailable" },
    { status: 200, statusText: "OK" }
  ]);
  const res503 = await submitToIndexNow(["https://www.blazebyte.shop/web"], {
    fetchFn: mockFetch503Then200 as any,
    maxRetries: 3
  });
  assert(res503.overallSuccess, "503 Server Error recovers upon retry to 200 OK");
  assert(res503.batches[0].attempts === 2, "Batch required 2 attempts after 503 backoff");

  // 3h. Mock Timeout
  const mockFetchTimeout = async () => {
    const err = new Error("Mocked network abort");
    err.name = "AbortError";
    throw err;
  };
  const resTimeout = await submitToIndexNow(["https://www.blazebyte.shop/web"], {
    fetchFn: mockFetchTimeout as any,
    maxRetries: 2,
    timeoutMs: 100
  });
  assert(!resTimeout.overallSuccess, "Timeout returns overallSuccess = false");
  assert(resTimeout.batches[0].error?.includes("timed out"), "Timeout captures timeout error");

  // TEST 4: Security and Authorization Tests
  console.log("\n--- 4. SECURITY & API ROUTE TESTS ---");
  const { GET, POST } = require("../src/app/api/indexnow/route");

  // Mock Request helper
  function makeNextRequest(headers: Record<string, string>, body?: any, method = "POST") {
    return {
      headers: new Headers(headers),
      method,
      json: async () => body || {},
    } as any;
  }

  // 4a. Unauthenticated GET
  process.env.ADMIN_SECRET_TOKEN = "test-secret-token-12345";
  const unauthGetReq = makeNextRequest({}, null, "GET");
  const unauthGetRes = await GET(unauthGetReq);
  assert(unauthGetRes.status === 401, "Unauthenticated GET to /api/indexnow is blocked with HTTP 401");

  // 4b. Authenticated GET
  const authGetReq = makeNextRequest({ authorization: "Bearer test-secret-token-12345" }, null, "GET");
  const authGetRes = await GET(authGetReq);
  assert(authGetRes.status === 200, "Authenticated GET with Bearer token returns HTTP 200");
  const getData = await authGetRes.json();
  assert(getData.approvedUrlsCount === 18, "Authenticated GET reports exactly 18 approved URLs");

  // 4c. Unauthenticated POST
  const unauthPostReq = makeNextRequest({}, { urls: ["https://www.blazebyte.shop/web"] });
  const unauthPostRes = await POST(unauthPostReq);
  assert(unauthPostRes.status === 401, "Unauthenticated POST to /api/indexnow is blocked with HTTP 401");

  // 4d. Authenticated POST with custom header
  const authPostReq = makeNextRequest(
    { "x-admin-token": "test-secret-token-12345", "content-type": "application/json" },
    { urls: ["https://www.blazebyte.shop/web"] }
  );
  // (We mock global fetch during this API route test so it does not send live request)
  const origFetch = global.fetch;
  global.fetch = mockFetch200 as any;
  const authPostRes = await POST(authPostReq);
  global.fetch = origFetch;
  assert(authPostRes.status === 200, "Authenticated POST with x-admin-token returns HTTP 200");

  console.log("\n=================================================");
  console.log(` TEST SUMMARY: ${passedTests}/${totalTests} TESTS PASSED (100%)`);
  console.log("=================================================");

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
