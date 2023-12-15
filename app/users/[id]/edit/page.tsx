import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AddNoteInput from "./add-note-input";
import DeleteNoteButton from "./delete-note-button";

export default async function page({ params }: { params: { id: string } }) {
  const { id: userId } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
        {`${userNickname[0].nickname}의 노트`}
      </h2>

      <AddNoteInput userId={userId} />
      <ul className="bg-slate-100 rounded-xl p-5 w-full flex flex-col gap-5 mt-10">
        {userNotes.map((userNote) => (
          <li
            key={userNote.id}
            className="bg-white flex justify-between px-4 py-2 rounded-xl">
            {userNote.title}
            <DeleteNoteButton noteId={userNote.id} />
          </li>
        ))}
      </ul>
    </>
  );
}
