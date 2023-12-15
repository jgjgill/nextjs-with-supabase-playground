"use client";

import { createLike, deleteLike } from "./[id]/actions";

export default function ToggleLikeButton({
  liked,
  userId,
  targetUserId,
}: {
  liked: boolean;
  userId: string;
  targetUserId: string;
}) {
  return (
    <button
      className="w-full hover:bg-slate-100 border border-slate-100 px-4 py-2 rounded-xl"
      onClick={async () => {
        liked
          ? await deleteLike(userId, targetUserId)
          : await createLike(userId, targetUserId);
      }}>
      {liked ? "좋아요 취소" : "좋아요"}
    </button>
  );
}
