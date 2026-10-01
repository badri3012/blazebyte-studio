"use client";

import React, { Suspense } from "react";
import { ServiceOrderEngine } from "@/components/configurator/service-order-engine";
import { APPS_ORDER_CONFIG } from "@/components/configurator/service-order-configs";

export default function AppsOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#191C21] text-white flex items-center justify-center font-mono">
        Loading Software Product Studio Environment...
      </div>
    }>
      <ServiceOrderEngine config={APPS_ORDER_CONFIG} />
    </Suspense>
  );
}
