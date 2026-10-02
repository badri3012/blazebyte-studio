"use client";

import React from "react";
import Image from "next/image";
import { ServiceGateway } from "@/components/service-portals/service-gateway";
import { AsymmetricPortfolio } from "@/components/portfolio/asymmetric-portfolio";
import { StudioPositioning } from "@/components/studio/studio-positioning";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0D10] text-[#F4F3EE]">
      {/* 01 — FIRST VISIT / SERVICE GATEWAY */}
      <ServiceGateway />

      {/* 02 — PREMIUM VISUAL PORTFOLIO (THE CATFISH GRILL + REAL BUILDS) */}
      <AsymmetricPortfolio />

      {/* 03 — STUDIO POSITIONING, MANIFESTO, PROCESS & TEAM ROSTER */}
      <StudioPositioning />
    </main>
  );
}

