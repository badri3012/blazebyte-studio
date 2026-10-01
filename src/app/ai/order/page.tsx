"use client";

import React, { Suspense } from "react";
import { ServiceOrderEngine } from "@/components/configurator/service-order-engine";
import { AI_ORDER_CONFIG } from "@/components/configurator/service-order-configs";

export default function AIOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#161B22] text-[#F9F9F8] flex items-center justify-center font-mono">
        Loading AI Systems Studio Environment...
      </div>
    }>
      <ServiceOrderEngine config={AI_ORDER_CONFIG} />
    </Suspense>
  );
}
