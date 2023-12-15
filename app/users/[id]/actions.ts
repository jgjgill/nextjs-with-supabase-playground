"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createLike(userId: string, targetUserId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase
    .from("likes")
    .insert({ user_id: userId, target_user_id: targetUserId });

  revalidatePath(`/`);
}

export async function deleteLike(userId: string, targetUserId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase
    .from("likes")
    .delete()
    .eq("user_id", userId)
    .eq("target_user_id", targetUserId);

  revalidatePath(`/`);
}
