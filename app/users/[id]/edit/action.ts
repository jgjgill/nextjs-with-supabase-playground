"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createNote(userId: string, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const title = formData.get("title") as string;
  await supabase.from("notes").insert({ user_id: userId, title });
  revalidatePath(`/users/${userId}/edit`);
}

export async function deleteNote(noteId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.from("notes").delete().eq("id", noteId);
  revalidatePath(`/`);
}
