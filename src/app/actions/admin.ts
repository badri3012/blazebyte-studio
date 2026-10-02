"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {

  // 2. Update Supabase if available
  try {
    const supabase = await createClient();
    await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);
  } catch (error) {
    console.warn("[ADMIN ACTION] Supabase lead update skipped:", error);
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true };
}
