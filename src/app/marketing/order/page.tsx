"use client";

import React, { Suspense } from "react";
import { ServiceOrderEngine } from "@/components/configurator/service-order-engine";
import { MARKETING_ORDER_CONFIG } from "@/components/configurator/service-order-configs";

export default function MarketingOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#17172B] text-[#F6F1E8] flex items-center justify-center font-mono">
        Loading Growth Studio Environment...
      </div>
    }>
      <ServiceOrderEngine config={MARKETING_ORDER_CONFIG} />
    </Suspense>
  );
}
