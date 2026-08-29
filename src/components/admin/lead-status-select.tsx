"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/app/actions/admin";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  "New": "bg-blue-100 text-blue-700",
  "Contacted": "bg-amber-100 text-amber-700",
  "Qualified": "bg-purple-100 text-purple-700",
  "Proposal Sent": "bg-indigo-100 text-indigo-700",
  "Won": "bg-green-100 text-green-700",
  "Lost": "bg-neutral-100 text-neutral-700",
};

export function LeadStatusSelect({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateLeadStatus(id, newStatus);
    });
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={cn(
        "px-2 py-1 text-xs rounded-full font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 transition-opacity",
        STATUS_COLORS[currentStatus] || "bg-neutral-100 text-neutral-700",
        isPending && "opacity-50 cursor-not-allowed"
      )}
    >
      <option value="New">New</option>
      <option value="Contacted">Contacted</option>
      <option value="Qualified">Qualified</option>
      <option value="Proposal Sent">Proposal Sent</option>
      <option value="Won">Won</option>
      <option value="Lost">Lost</option>
    </select>
  );
}
