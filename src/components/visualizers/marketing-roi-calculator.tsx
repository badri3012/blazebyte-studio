"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/context/sound-context";
import { TrendingUp, Users, Target, ArrowRight, DollarSign } from "lucide-react";

export const MarketingROICalculator = () => {
  const { playHover, playClick } = useSound();
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(5000);
  const [conversionRate, setConversionRate] = useState<number>(2.5); // %
  const [customerValue, setCustomerValue] = useState<number>(15000); // ₹

  const monthlyLeads = Math.round((monthlyTraffic * conversionRate) / 100);
  const estimatedRevenue = Math.round(monthlyLeads * customerValue);

  return (
    <div className="rounded-2xl bg-graphite-card border border-teal-accent/30 p-6 lg:p-8 relative overflow-hidden shadow-2xl">
      {/* Background Teal Atmosphere */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-teal-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-graphite-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-light mb-1">
              <TrendingUp className="w-4 h-4 text-teal-accent" />
              <span>DIGITAL ACQUISITION SIMULATOR</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-ivory">
              Growth & Conversion Pipeline Simulator
            </h3>
          </div>
          <span className="text-xs font-mono text-teal-light bg-teal-accent/10 border border-teal-accent/30 px-3 py-1.5 rounded self-start sm:self-auto">
            Measurable Commercial ROI
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target Monthly Traffic Slider */}
          <div className="space-y-3 p-4 rounded-xl bg-graphite border border-graphite-border">
            <div className="flex items-center justify-between text-xs font-mono text-muted-grey">
              <span>Target Monthly Visits</span>
              <span className="text-ivory font-bold">{monthlyTraffic.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={50000}
              step={1000}
              value={monthlyTraffic}
              onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
              onMouseDown={playClick}
              className="w-full accent-teal-accent bg-graphite-card rounded cursor-pointer h-2"
            />
            <p className="text-[11px] text-muted-grey">SEO + Local Search + High-Intent Ads Traffic</p>
          </div>

          {/* Target Conversion Rate Slider */}
          <div className="space-y-3 p-4 rounded-xl bg-graphite border border-graphite-border">
            <div className="flex items-center justify-between text-xs font-mono text-muted-grey">
              <span>Target Conversion Rate</span>
              <span className="text-teal-light font-bold">{conversionRate}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={8.0}
              step={0.1}
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              onMouseDown={playClick}
              className="w-full accent-teal-accent bg-graphite-card rounded cursor-pointer h-2"
            />
            <p className="text-[11px] text-muted-grey">Optimized Landing Pages & WhatsApp Routing</p>
          </div>

          {/* Customer Average Value Slider */}
          <div className="space-y-3 p-4 rounded-xl bg-graphite border border-graphite-border">
            <div className="flex items-center justify-between text-xs font-mono text-muted-grey">
              <span>Average Customer Value</span>
              <span className="text-ivory font-bold">₹{customerValue.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={customerValue}
              onChange={(e) => setCustomerValue(Number(e.target.value))}
              onMouseDown={playClick}
              className="w-full accent-teal-accent bg-graphite-card rounded cursor-pointer h-2"
            />
            <p className="text-[11px] text-muted-grey">Estimated Value per Converted Enquiry</p>
          </div>
        </div>

        {/* Live Forecast Metric Output Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            key={monthlyLeads}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-5 rounded-xl bg-graphite border border-teal-accent/40 flex items-center gap-4"
          >
            <div className="p-3 rounded-lg bg-teal-accent/10 border border-teal-accent/30 text-teal-accent">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-muted-grey">Estimated Qualified Inquiries / Month</div>
              <div className="text-3xl font-heading font-extrabold text-ivory mt-0.5">
                {monthlyLeads.toLocaleString()} <span className="text-sm font-sans text-teal-light font-normal">Leads</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            key={estimatedRevenue}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-5 rounded-xl bg-teal-accent/10 border border-teal-accent/50 flex items-center gap-4 glow-teal"
          >
            <div className="p-3 rounded-lg bg-teal-accent text-graphite font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-teal-light">Projected Monthly Pipeline Impact</div>
              <div className="text-3xl font-heading font-extrabold text-ivory mt-0.5">
                ₹{estimatedRevenue.toLocaleString()}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-xs text-muted-grey font-mono text-center pt-2">
          * Note: Advertising budget is separate from BlazeByte management fees and paid directly to ad platforms.
        </div>
      </div>
    </div>
  );
};
