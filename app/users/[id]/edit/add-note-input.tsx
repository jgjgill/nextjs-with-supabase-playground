"use client";

import { useRef } from "react";
import { createNote } from "./action";

export default function AddNoteInput({ userId }: { userId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData: FormData) => {
        if (!formRef.current) return;
        await createNote(userId, formData);

        formRef.current.reset();
      }}
      className="w-full">
      <input
        placeholder="노트 추가하기"
        type="text"
        name="title"
        className="border w-full rounded-xl px-4 py-2"
      />
    </form>
  );
}
