"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating lead:", error);
    return { error: "Failed to update lead status." };
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true };
}
