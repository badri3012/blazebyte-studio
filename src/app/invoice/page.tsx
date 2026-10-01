"use client";

import React, { Suspense } from "react";
import { InvoiceViewComponent } from "./invoice-view-component";

export default function InvoicePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] flex items-center justify-center font-mono">
        Loading Invoice Document...
      </div>
    }>
      <InvoiceViewComponent />
    </Suspense>
  );
}
