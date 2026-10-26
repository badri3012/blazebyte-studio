import { NextRequest, NextResponse } from "next/server";
import {
  submitToIndexNow,
  APPROVED_CORE_INDEXABLE_URLS,
  INDEXNOW_HOST,
  INDEXNOW_KEY_LOCATION,
  IndexNowSubmissionReport,
} from "@/lib/indexnow";

/**
 * Validates request authorization using ADMIN_SECRET_TOKEN.
 * Accepts:
 *   1. Authorization: Bearer <ADMIN_SECRET_TOKEN>
 *   2. x-admin-token: <ADMIN_SECRET_TOKEN>
 */
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET_TOKEN;
  if (!secret) {
    // If not configured in environment, fail closed for security
    return false;
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.trim() === `Bearer ${secret}`) {
    return true;
  }

  const tokenHeader = request.headers.get("x-admin-token");
  if (tokenHeader && tokenHeader.trim() === secret) {
    return true;
  }

  return false;
}

/**
 * GET /api/indexnow
 * Authenticated status check — returns IndexNow configuration and candidate indexable URLs.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Valid administrator bearer token required." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    status: "ready",
    host: INDEXNOW_HOST,
    keyLocation: INDEXNOW_KEY_LOCATION,
    approvedUrlsCount: APPROVED_CORE_INDEXABLE_URLS.length,
    approvedUrls: APPROVED_CORE_INDEXABLE_URLS,
  });
}

/**
 * POST /api/indexnow
 * Authenticated submission trigger.
 * Body (optional JSON):
 *   {
 *     "urls": ["https://www.blazebyte.shop/web", ...]
 *   }
 * If "urls" is omitted or empty, defaults to APPROVED_CORE_INDEXABLE_URLS.
 */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Valid administrator bearer token required." },
      { status: 401 }
    );
  }

  try {
    let candidateUrls: string[] = [];

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await request.json().catch(() => ({}));
      if (Array.isArray(body?.urls) && body.urls.length > 0) {
        candidateUrls = body.urls;
      }
    }

    // Default to approved core URLs if no custom list was provided
    if (candidateUrls.length === 0) {
      candidateUrls = [...APPROVED_CORE_INDEXABLE_URLS];
    }

    const report: IndexNowSubmissionReport = await submitToIndexNow(candidateUrls);

    const httpStatus = report.overallSuccess ? 200 : 207; // 207 Multi-Status if partial/retry failure
    return NextResponse.json(
      {
        message: report.overallSuccess
          ? "IndexNow submission completed successfully."
          : "IndexNow submission finished with warnings or failures.",
        report,
      },
      { status: httpStatus }
    );
  } catch (err: any) {
    console.error("[IndexNow API Error]:", err);
    return NextResponse.json(
      {
        error: "Internal IndexNow submission error.",
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}
