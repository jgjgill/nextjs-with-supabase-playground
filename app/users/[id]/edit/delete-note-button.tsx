"use client";

import { deleteNote } from "./action";

export default function DeleteNoteButton({ noteId }: { noteId: string }) {
  return (
    <button
      className="bg-slate-100 px-3 rounded-xl"
      onClick={async () => {
        await deleteNote(noteId);
      }}>
      삭제
    </button>
  );
}
