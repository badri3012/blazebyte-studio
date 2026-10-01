import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * BLAZEBYTE STUDIO â€” Admin Route Protection Middleware
 *
 * Protects /admin/* routes from public access.
 * Uses a simple token-based check via an environment variable.
 * In production, replace with NextAuth session cookie checking.
 *
 * Environment variables required:
 *   ADMIN_SECRET_TOKEN â€” set to a strong random secret (e.g., openssl rand -hex 32)
 *
 * Access by including header: Authorization: Bearer <ADMIN_SECRET_TOKEN>
 * OR by visiting /admin?token=<ADMIN_SECRET_TOKEN> for browser access (sets session cookie).
 */

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin")) {
    const adminToken = process.env.ADMIN_SECRET_TOKEN;

    // If no token configured in environment, block access entirely
    if (!adminToken) {
      return new NextResponse(
        JSON.stringify({
          error: "Admin access not configured. Set ADMIN_SECRET_TOKEN in environment.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check session cookie (set on successful login)
    const sessionCookie = request.cookies.get("bb_admin_session");
    if (sessionCookie && sessionCookie.value === adminToken) {
      return NextResponse.next();
    }

    // Check Authorization header (for API access)
    const authHeader = request.headers.get("Authorization");
    if (authHeader === `Bearer ${adminToken}`) {
      return NextResponse.next();
    }

    // Check query param token (for initial browser login)
    const queryToken = request.nextUrl.searchParams.get("token");
    if (queryToken === adminToken) {
      // Grant access and set session cookie
      const response = NextResponse.next();
      response.cookies.set("bb_admin_session", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 8, // 8 hours
        path: "/admin",
      });
      return response;
    }

    // Deny access â€” return 401 JSON for API calls, redirect to a simple auth page for browser
    const isApiLike =
      request.headers.get("Accept")?.includes("application/json") ||
      pathname.startsWith("/admin/api");

    if (isApiLike) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized. Admin access denied." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Redirect to admin login page
    const loginUrl = new URL("/admin-login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
