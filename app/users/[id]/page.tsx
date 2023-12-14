import KakaoButton from "@/app/auth/callback/KakaoButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function page({ params }: { params: { id: string } }) {
  const { id: userId } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userNickname, error: userNicknameError } = await supabase
    .from("profiles")
    .select("nickname")
    .eq("id", userId);

  const { data: userNotes, error: userNotesError } = await supabase
    .from("notes")
    .select("title, id")
    .eq("user_id", userId);

  if (userNicknameError || userNotesError) {
    throw new Error("잘못된 요청");
  }

  return (
    <>
      <h2 className="w-full bg-slate-100 rounded-xl px-4 py-2 text-center mb-5">
        {`${userNickname[0].nickname}의 노트(좋아요 개수 받기)`}
      </h2>

      {user && user.id === userId && (
        <Link href={`/users/${userId}/edit`}>수정하기</Link>
      )}

      {user && user.id !== userId && (
        <button className="w-full hover:bg-slate-100 border border-slate-100 px-4 py-2 rounded-xl">
          좋아요
        </button>
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
