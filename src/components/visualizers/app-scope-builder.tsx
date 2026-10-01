"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSound } from "@/context/sound-context";
import { APP_BUILD_TYPES, APP_FEATURE_REQUIREMENTS } from "@/config/studio-data";
import { Button } from "@/components/ui/button";
import { Layers, CheckSquare, Square, ArrowRight, Sparkles } from "lucide-react";

export const AppScopeBuilder = () => {
  const router = useRouter();
  const { playHover, playClick, playPortalApps } = useSound();
  const [selectedType, setSelectedType] = useState<string>("Business Application");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "User Authentication & Roles",
    "Database Architecture",
    "Admin Command Dashboard",
  ]);

  const toggleFeature = (feature: string) => {
    playClick();
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleLaunchConfigurator = () => {
    playPortalApps();
    const query = new URLSearchParams({
      service: "apps",
      appType: selectedType,
      features: selectedFeatures.join(","),
    }).toString();
    router.push(`/contact?${query}`);
  };

  return (
    <div className="rounded-2xl bg-graphite-card border border-ivory/30 p-6 lg:p-10 relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 space-y-8">
        <div className="border-b border-graphite-border pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-ivory mb-1">
            <Sparkles className="w-4 h-4 text-ivory" />
            <span>INTERACTIVE SCOPE SELECTOR</span>
          </div>
          <h3 className="text-2xl font-heading font-bold text-ivory">
            Configure Your Custom Product Requirements
          </h3>
          <p className="text-sm text-muted-grey mt-1">
            Select your product concept and required capability modules to generate a direct build proposal.
          </p>
        </div>

        {/* Step 1: What are you building? */}
        <div className="space-y-4">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-ivory">
            01 — What are you building?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {APP_BUILD_TYPES.map((type) => {
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setSelectedType(type);
                  }}
                  className={`p-3 rounded-lg border text-xs font-mono text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-ivory text-graphite border-ivory font-bold shadow-md"
                      : "bg-graphite border-graphite-border text-muted-grey hover:text-ivory hover:border-graphite-border/80"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: What does it need? */}
        <div className="space-y-4">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-ivory">
            02 — What capability modules does it need?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {APP_FEATURE_REQUIREMENTS.map((feature) => {
              const isChecked = selectedFeatures.includes(feature);
              return (
                <div
                  key={feature}
                  onMouseEnter={playHover}
                  onClick={() => toggleFeature(feature)}
                  className={`p-3.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-3 cursor-pointer ${
                    isChecked
                      ? "bg-graphite border-ivory/60 text-ivory font-semibold"
                      : "bg-graphite/50 border-graphite-border text-muted-grey hover:text-ivory"
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-ivory shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-muted-grey shrink-0" />
                  )}
                  <span>{feature}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scope Summary Footer */}
        <div className="pt-6 border-t border-graphite-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-muted-grey">Selected Configuration</div>
            <div className="text-base font-heading font-bold text-ivory mt-0.5">
              {selectedType} <span className="text-xs font-mono text-muted-grey font-normal">({selectedFeatures.length} Modules Selected)</span>
            </div>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={handleLaunchConfigurator}
            className="w-full sm:w-auto"
          >
            <span>Request a Custom Build (₹50,000+)</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
