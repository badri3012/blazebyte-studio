/**
 * BLAZEBYTE STUDIO — OFFICIAL INDEXNOW INTEGRATION UTILITY
 * 
 * Supports Bing Webmaster Tools & IndexNow protocol (RFC / indexnow.org)
 * Endpoint: https://api.indexnow.org/indexnow
 * Domain: https://www.blazebyte.shop
 */

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const INDEXNOW_KEY = "f044b8477f014aeca046d92d9938f16a";
export const INDEXNOW_HOST = "www.blazebyte.shop";
export const INDEXNOW_KEY_LOCATION = "https://www.blazebyte.shop/f044b8477f014aeca046d92d9938f16a.txt";

/**
 * Confirmed Indexable Website URLs matching sitemap.xml canonicals.
 * Guaranteed: HTTP 200, noindex-free, crawlable, canonical format.
 */
export const APPROVED_CORE_INDEXABLE_URLS: readonly string[] = [
  "https://www.blazebyte.shop/",
  "https://www.blazebyte.shop/web",
  "https://www.blazebyte.shop/marketing",
  "https://www.blazebyte.shop/ai",
  "https://www.blazebyte.shop/apps",
  "https://www.blazebyte.shop/work",
  "https://www.blazebyte.shop/process",
  "https://www.blazebyte.shop/about",
  "https://www.blazebyte.shop/contact",
  "https://www.blazebyte.shop/faq",
  "https://www.blazebyte.shop/packages",
  "https://www.blazebyte.shop/services",
  "https://www.blazebyte.shop/services/seo",
  "https://www.blazebyte.shop/privacy-policy",
  "https://www.blazebyte.shop/terms-and-conditions",
  "https://www.blazebyte.shop/refund-policy",
  "https://www.blazebyte.shop/cookie-policy",
  "https://www.blazebyte.shop/disclaimer",
];

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export interface IndexNowSubmissionOptions {
  host?: string;
  key?: string;
  keyLocation?: string;
  timeoutMs?: number;
  maxRetries?: number;
  batchSize?: number;
  fetchFn?: typeof fetch;
}

export interface BatchSubmissionResult {
  batchIndex: number;
  submittedUrls: string[];
  statusCode: number;
  statusText: string;
  explanation: string;
  success: boolean;
  attempts: number;
  error?: string;
}

export interface IndexNowSubmissionReport {
  timestamp: string;
  host: string;
  keyLocation: string;
  totalCandidateUrls: number;
  approvedUrls: string[];
  rejectedUrls: { url: string; reason: string }[];
  batches: BatchSubmissionResult[];
  overallSuccess: boolean;
}

/**
 * Validates an individual URL against BlazeByte canonical indexability rules.
 */
export function validateUrl(rawUrl: string, expectedHost = INDEXNOW_HOST): { valid: boolean; normalizedUrl?: string; reason?: string } {
  if (!rawUrl || typeof rawUrl !== "string") {
    return { valid: false, reason: "URL must be a non-empty string." };
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return { valid: false, reason: "Malformed URL syntax." };
  }

  if (parsed.protocol !== "https:") {
    return { valid: false, reason: `Invalid protocol '${parsed.protocol}'. Must be https:.` };
  }

  if (parsed.hostname.toLowerCase() !== expectedHost.toLowerCase()) {
    return {
      valid: false,
      reason: `Host '${parsed.hostname}' does not match canonical host '${expectedHost}'. Submissions must target ${expectedHost} strictly.`,
    };
  }

  // Reject disallowed or transactional routes
  const pathname = parsed.pathname;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/")) {
    return { valid: false, reason: `Restricted system or administrative path: '${pathname}'.` };
  }

  if (pathname.endsWith("/order") || pathname.includes("/order/") || pathname === "/order-project") {
    return { valid: false, reason: `Transactional order page is marked noindex and must not be submitted: '${pathname}'.` };
  }

  if (pathname === "/pay" || pathname.startsWith("/pay/") || pathname === "/invoice" || pathname.startsWith("/invoice/")) {
    return { valid: false, reason: `Private payment or invoice transactional route: '${pathname}'.` };
  }

  if (pathname === "/case-studies") {
    return { valid: false, reason: "Redirect source (redirects 308 to /work). Submit canonical '/work' instead." };
  }

  // Normalize: Strip trailing slash (except root) and remove hashes
  let normalizedPath = pathname;
  if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  const normalizedUrl = `https://${expectedHost}${normalizedPath}${parsed.search}`;
  return { valid: true, normalizedUrl };
}

/**
 * Normalizes, validates, and deduplicates a list of candidate URLs.
 */
export function filterAndDeduplicateUrls(
  urls: readonly string[] | string[],
  expectedHost = INDEXNOW_HOST
): { approved: string[]; rejected: { url: string; reason: string }[] } {
  const approvedSet = new Set<string>();
  const rejected: { url: string; reason: string }[] = [];

  for (const raw of urls) {
    const res = validateUrl(raw, expectedHost);
    if (!res.valid || !res.normalizedUrl) {
      rejected.push({ url: raw, reason: res.reason || "Invalid URL" });
    } else if (approvedSet.has(res.normalizedUrl)) {
      rejected.push({ url: raw, reason: `Duplicate URL omitted: ${res.normalizedUrl}` });
    } else {
      approvedSet.add(res.normalizedUrl);
    }
  }

  return {
    approved: Array.from(approvedSet),
    rejected,
  };
}

/**
 * Maps IndexNow HTTP status codes to actionable engineering messages.
 */
export function explainStatusCode(code: number): { explanation: string; retryable: boolean; success: boolean } {
  switch (code) {
    case 200:
      return {
        explanation: "OK: URLs submitted successfully and acknowledged by IndexNow.",
        retryable: false,
        success: true,
      };
    case 202:
      return {
        explanation: "Accepted: URLs received by IndexNow. Key verification or processing is pending.",
        retryable: false,
        success: true,
      };
    case 400:
      return {
        explanation: "Bad Request: Invalid format, missing required parameters, or malformed payload.",
        retryable: false,
        success: false,
      };
    case 403:
      return {
        explanation: "Forbidden: Key not valid (key not found at keyLocation, invalid file content, or unauthorized).",
        retryable: false,
        success: false,
      };
    case 422:
      return {
        explanation: "Unprocessable Entity: Host does not match keyLocation, or URLs don't belong to the declared host.",
        retryable: false,
        success: false,
      };
    case 429:
      return {
        explanation: "Too Many Requests: Rate limited by IndexNow. Exponential backoff required.",
        retryable: true,
        success: false,
      };
    case 500:
    case 502:
    case 503:
    case 504:
      return {
        explanation: `Server Error (${code}): IndexNow service transient failure. Retryable with backoff.`,
        retryable: true,
        success: false,
      };
    default:
      return {
        explanation: `Unexpected HTTP status ${code} from IndexNow service.`,
        retryable: code >= 500,
        success: code >= 200 && code < 300,
      };
  }
}

/**
 * Submits a validated batch of URLs to the official IndexNow endpoint with bounded exponential backoff.
 */
async function submitSingleBatch(
  batchUrls: string[],
  batchIndex: number,
  options: Required<IndexNowSubmissionOptions>
): Promise<BatchSubmissionResult> {
  const payload: IndexNowPayload = {
    host: options.host,
    key: options.key,
    keyLocation: options.keyLocation,
    urlList: batchUrls,
  };

  const bodyStr = JSON.stringify(payload);
  let attempts = 0;
  let lastError: string | undefined;

  while (attempts < options.maxRetries) {
    attempts++;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs);

    try {
      const response = await options.fetchFn(INDEXNOW_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: bodyStr,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const status = response.status;
      const statusText = response.statusText || "";
      const { explanation, retryable, success } = explainStatusCode(status);

      if (success) {
        return {
          batchIndex,
          submittedUrls: batchUrls,
          statusCode: status,
          statusText,
          explanation,
          success: true,
          attempts,
        };
      }

      if (retryable && attempts < options.maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempts - 1), 4000) + Math.floor(Math.random() * 250);
        console.warn(`[IndexNow Batch ${batchIndex}] Attempt ${attempts} returned ${status}. Retrying in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      return {
        batchIndex,
        submittedUrls: batchUrls,
        statusCode: status,
        statusText,
        explanation,
        success: false,
        attempts,
        error: `IndexNow returned status ${status}: ${explanation}`,
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = err instanceof Error && err.name === "AbortError";
      lastError = isAbort
        ? `Request timed out after ${options.timeoutMs}ms`
        : err instanceof Error
        ? err.message
        : String(err);

      if (attempts < options.maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempts - 1), 4000);
        console.warn(`[IndexNow Batch ${batchIndex}] Network failure attempt ${attempts}: ${lastError}. Retrying in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
    }
  }

  return {
    batchIndex,
    submittedUrls: batchUrls,
    statusCode: 0,
    statusText: "Network Failure",
    explanation: `Failed after ${attempts} attempts: ${lastError}`,
    success: false,
    attempts,
    error: lastError,
  };
}

/**
 * Main server-side IndexNow submission utility.
 * Validates, deduplicates, chunks, and submits URLs to the IndexNow protocol.
 */
export async function submitToIndexNow(
  candidateUrls: readonly string[] | string[],
  opts: IndexNowSubmissionOptions = {}
): Promise<IndexNowSubmissionReport> {
  const options: Required<IndexNowSubmissionOptions> = {
    host: opts.host || INDEXNOW_HOST,
    key: opts.key || INDEXNOW_KEY,
    keyLocation: opts.keyLocation || INDEXNOW_KEY_LOCATION,
    timeoutMs: opts.timeoutMs ?? 10000,
    maxRetries: opts.maxRetries ?? 3,
    batchSize: opts.batchSize ?? 100,
    fetchFn: opts.fetchFn ?? globalThis.fetch,
  };

  const { approved, rejected } = filterAndDeduplicateUrls(candidateUrls, options.host);
  const batches: BatchSubmissionResult[] = [];

  if (approved.length === 0) {
    return {
      timestamp: new Date().toISOString(),
      host: options.host,
      keyLocation: options.keyLocation,
      totalCandidateUrls: candidateUrls.length,
      approvedUrls: [],
      rejectedUrls: rejected,
      batches: [],
      overallSuccess: false,
    };
  }

  // Chunk approved URLs into batches of batchSize
  for (let i = 0; i < approved.length; i += options.batchSize) {
    const chunk = approved.slice(i, i + options.batchSize);
    const batchIndex = Math.floor(i / options.batchSize) + 1;
    const result = await submitSingleBatch(chunk, batchIndex, options);
    batches.push(result);
  }

  const overallSuccess = batches.length > 0 && batches.every((b) => b.success);

  return {
    timestamp: new Date().toISOString(),
    host: options.host,
    keyLocation: options.keyLocation,
    totalCandidateUrls: candidateUrls.length,
    approvedUrls: approved,
    rejectedUrls: rejected,
    batches,
    overallSuccess,
  };
}
