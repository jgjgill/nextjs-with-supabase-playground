import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import KakaoButton from "./auth/callback/KakaoButton";

export default async function page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: allUsersNotes, error } = await supabase.from("profiles")
    .select(`
    id,
    nickname,
    notes(count)
    `);

  if (error) {
    throw error;
  }

  return (
    <>
      <KakaoButton />

      <div className="flex flex-col gap-5 w-full mt-14 bg-slate-100 p-5 rounded-xl">
        {allUsersNotes.map((allUsersNote) => (
          <Link
            href={`/users/${allUsersNote.id}`}
            className="px-4 py-2 w-full bg-white rounded-xl">
            {`${allUsersNote.nickname}의 노트 (${allUsersNote.notes[0].count})`}
          </Link>
        ))}
      </div>
    </>
  );
}
