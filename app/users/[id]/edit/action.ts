"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function create(userId: string, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const title = formData.get("title") as string;
  await supabase.from("notes").insert({ user_id: userId, title });
  revalidatePath(`/users/${userId}/edit`);
}
