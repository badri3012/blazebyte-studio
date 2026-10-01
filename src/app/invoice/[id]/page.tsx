"use client";

import React, { use, Suspense } from "react";
import { InvoiceViewComponent } from "../invoice-view-component";

interface DynamicInvoiceParams {
  params: Promise<{ id: string }>;
}

export default function DynamicInvoicePage({ params }: DynamicInvoiceParams) {
  const { id } = use(params);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] flex items-center justify-center font-mono">
        Loading Invoice Document...
      </div>
    }>
      <InvoiceViewComponent initialInvoiceId={id} />
    </Suspense>
  );
}
