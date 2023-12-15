import KakaoButton from "@/app/auth/callback/kakao-button";
import { Database } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import Link from "next/link";
import ToggleLikeButton from "../toggle-like-button";

export default async function page({ params }: { params: { id: string } }) {
  const { id: targetUserId } = params;
  const cookieStore = cookies();
  const supabase: SupabaseClient<Database> = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userNickname, error: userNicknameError } = await supabase
    .from("profiles")
    .select("nickname")
    .eq("id", targetUserId);

  const { data: userNotes, error: userNotesError } = await supabase
    .from("notes")
    .select("title, id")
    .eq("user_id", targetUserId);

  const { data: userLikes, error: userLikesError } = await supabase
    .from("likes")
    .select("*, user_id(count)")
    .eq("user_id", "8b74ee1b-306e-4a4b-b1f2-6f4ff8bd8c22")
    .returns<{ user_id: { count: number } }[] | []>();

  if (userNicknameError || userNotesError || userLikesError) {
    throw new Error("잘못된 요청");
  }

  const liked = Boolean(userLikes.length);
  const count = userLikes.length === 0 ? 0 : userLikes[0].user_id.count;

  return (
    <>
      <h2 className="w-full bg-slate-100 rounded-xl px-4 py-2 text-center mb-5">
        {`${userNickname[0].nickname}의 노트 (좋아요 개수: ${count})`}
      </h2>

      {user && user.id === targetUserId && (
        <Link
          href={`/users/${targetUserId}/edit`}
          className="bg-slate-100 rounded-xl px-4 py-2 text-center mb-5 w-full">
          수정하기
        </Link>
      )}

      {user && user.id !== targetUserId && (
        <ToggleLikeButton
          liked={liked}
          userId={user.id}
          targetUserId={targetUserId}
        />
      )}

      {!user && <KakaoButton />}

      <ul className="bg-slate-100 rounded-xl p-5 w-full flex flex-col gap-5 mt-10">
        {userNotes.map((userNote) => (
          <li key={userNote.id} className="bg-white px-4 py-2 rounded-xl">
            {userNote.title}
          </li>
        ))}
      </ul>
    </>
  );
}
