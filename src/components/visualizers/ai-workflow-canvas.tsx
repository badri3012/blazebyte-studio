"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/context/sound-context";
import { Cpu, Database, Network, MessageSquareCode, ArrowRight, Play, CheckCircle2, Zap } from "lucide-react";

export const AIWorkflowCanvas = () => {
  const { playHover, playClick } = useSound();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const workflowNodes = [
    {
      id: 1,
      title: "01 — Ingestion Trigger",
      type: "Webhook / API / Email",
      description: "Captures unformatted incoming leads, customer support tickets, or document payloads.",
      icon: Network,
      color: "border-blue-accent/50 text-blue-light bg-blue-accent/10",
    },
    {
      id: 2,
      title: "02 — AI Agent Triage & RAG",
      type: "LLM + Vector Database Search",
      description: "Parses request intent, queries custom internal company knowledge, & generates verified response context.",
      icon: Cpu,
      color: "border-indigo-accent/50 text-indigo-light bg-indigo-accent/10",
    },
    {
      id: 3,
      title: "03 — Automated Workflow Action",
      type: "CRM Sync + WhatsApp / Email Dispatch",
      description: "Executes automated CRM record update, dispatches qualified instant reply, and alerts account manager.",
      icon: MessageSquareCode,
      color: "border-teal-accent/50 text-teal-light bg-teal-accent/10",
    },
  ];

  const handleSimulate = () => {
    playClick();
    setIsRunning(true);
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
      playHover();
    }, 1200);

    setTimeout(() => {
      setActiveStep(3);
      playHover();
    }, 2400);

    setTimeout(() => {
      setIsRunning(false);
    }, 3600);
  };

  return (
    <div className="rounded-2xl bg-graphite-card border border-blue-accent/30 p-6 lg:p-8 relative overflow-hidden shadow-2xl">
      {/* Background Blue Grid & Ambient Light */}
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-graphite-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-light mb-1">
              <Cpu className="w-4 h-4 text-blue-accent" />
              <span>INTELLIGENT WORKFLOW SIMULATOR</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-ivory">
              Autonomous AI Workflow Orchestration
            </h3>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isRunning}
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-accent text-graphite font-semibold text-xs font-mono hover:bg-blue-light transition-all disabled:opacity-50 cursor-pointer glow-blue self-start sm:self-auto"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Executing Workflow..." : "Simulate Live Execution"}</span>
          </button>
        </div>

        {/* Workflow Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {workflowNodes.map((node, idx) => {
            const Icon = node.icon;
            const isCurrent = activeStep === node.id;
            const isDone = activeStep > node.id;

            return (
              <div key={node.id} className="relative">
                <motion.div
                  animate={{
                    borderColor: isCurrent ? "rgba(56, 189, 248, 0.8)" : "rgba(34, 34, 40, 1)",
                    scale: isCurrent ? 1.02 : 1,
                  }}
                  className={`p-6 rounded-xl bg-graphite border transition-all space-y-4 h-full flex flex-col justify-between ${
                    isCurrent ? "glow-blue" : ""
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-lg border ${node.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-graphite-card border border-graphite-border text-muted-grey">
                        Node {node.id}
                      </span>
                    </div>

                    <h4 className="text-lg font-heading font-bold text-ivory">
                      {node.title}
                    </h4>

                    <div className="text-xs font-mono text-blue-light">
                      {node.type}
                    </div>

                    <p className="text-xs text-muted-grey leading-relaxed">
                      {node.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-graphite-border/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-muted-grey">Status:</span>
                    {isCurrent ? (
                      <span className="text-blue-light font-bold flex items-center gap-1 animate-pulse">
                        <Zap className="w-3 h-3" /> Processing...
                      </span>
                    ) : isDone ? (
                      <span className="text-teal-accent font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="text-muted-grey">Idle</span>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-graphite border border-graphite-border text-xs text-muted-grey flex items-center justify-between">
          <span className="font-mono">Output Protocol: Structured JSON API Payload + Role Access Audit Trail</span>
          <span className="text-blue-light font-mono font-semibold">Latency Target: &lt;450ms</span>
        </div>
      </div>
    </div>
  );
};
