"use client";

import React, { Suspense } from "react";
import { PayComponent } from "../pay-component";

export default function DynamicPayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] flex items-center justify-center font-mono">
        Loading Payment Portal...
      </div>
    }>
      <PayComponent />
    </Suspense>
  );
}
