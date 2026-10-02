"use client";

import React, { use, Suspense } from "react";
import { PayComponent } from "../pay-component";

interface DynamicPayParams {
  params: Promise<{ id: string }>;
}

export default function DynamicPayPage({ params }: DynamicPayParams) {
  const { id } = use(params);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F1EA] text-[#17191C] flex items-center justify-center font-mono">
        Loading Payment Portal...
      </div>
    }>
      <PayComponent initialInvoiceId={id} />
    </Suspense>
  );
}
