"use client";

import React, { Suspense } from "react";
import { ServiceOrderEngine } from "@/components/configurator/service-order-engine";
import { WEB_ORDER_CONFIG } from "@/components/configurator/service-order-configs";

export default function WebOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] flex items-center justify-center font-mono">
        Loading Web Studio Environment...
      </div>
    }>
      <ServiceOrderEngine config={WEB_ORDER_CONFIG} />
    </Suspense>
  );
}
