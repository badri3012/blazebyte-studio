"use client";

import React, { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError("Access token is required.");
      return;
    }
    setLoading(true);
    setError("");
    // Redirect to admin with token in query — middleware sets session cookie
    const adminUrl = `${redirect}?token=${encodeURIComponent(token.trim())}`;
    router.push(adminUrl);
  };

  return (
    <form onSubmit={handleLogin} className="bg-[#171A20] border-2 border-[#242832] p-8 space-y-6">
      <div className="space-y-2">
        <label className="block text-xs font-mono font-bold text-[#B8BDC7] uppercase tracking-widest">
          Admin Access Token
        </label>
        <div className="relative">
          <input
            type={showToken ? "text" : "password"}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter admin access token"
            autoComplete="current-password"
            className="w-full px-4 py-3 pr-12 bg-[#0B0D10] border border-[#242832] text-[#F4F3EE] font-mono text-sm focus:border-[#3457FF] focus:outline-none placeholder-[#4B5563]"
          />
          <button
            type="button"
            onClick={() => setShowToken(!showToken)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#B8BDC7] cursor-pointer"
          >
            {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-950/30 border border-red-900 px-3 py-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-[#3457FF] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#2845DD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "AUTHENTICATING..." : "ACCESS ADMIN PANEL →"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#3457FF]/10 border-2 border-[#3457FF]/30 rounded-none mb-4">
            <Lock className="w-6 h-6 text-[#3457FF]" />
          </div>
          <h1 className="font-heading font-black text-3xl text-[#F4F3EE] uppercase tracking-tight">
            BLAZEBYTE ADMIN
          </h1>
          <p className="text-xs font-mono text-[#6B7280] uppercase tracking-widest">
            Restricted Access — Authorised Personnel Only
          </p>
        </div>

        {/* Wrap the form using searchParams in Suspense */}
        <Suspense
          fallback={
            <div className="bg-[#171A20] border-2 border-[#242832] p-8 text-center text-xs font-mono text-[#6B7280]">
              Loading authentication...
            </div>
          }
        >
          <AdminLoginForm />
        </Suspense>

        {/* Security notice */}
        <p className="text-center text-[10px] font-mono text-[#4B5563]">
          All admin access attempts are logged. Unauthorised access is prohibited.
        </p>
      </div>
    </div>
  );
}
