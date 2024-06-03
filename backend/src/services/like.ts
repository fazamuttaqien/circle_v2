import { Like } from "@prisma/client";
import db from "../lib/db";
import isValidUUID from "../utils/validation/uuidValidation";

export const like = async (
  threadId: string,
  userId: string
): Promise<{ data: Like | Error | String }> => {
  if (!isValidUUID(threadId)) {
    throw new Error("Invalid UUID");
  }

  const userSelected = await db.user.findUnique({
    where: {
      Id: userId,
    },
  });

  if (!userSelected) {
    throw new Error("User not found");
  }

  const threadSelected = await db.thread.findUnique({
    where: {
      Id: threadId,
    },
    include: {
      likes: true,
    },
  });
  if (!threadSelected) {
    throw new Error("Thread not found");
  }

  const exitingLike = threadSelected.likes.find(
    (like) => like.userId === userId
  );

  if (exitingLike) {
    await db.like.delete({
      where: {
        Id: exitingLike.Id,
      },
    });

    await db.thread.update({
      where: { Id: threadId },
      data: {
        isLiked: false,
      },
    });

    return { data: "Undo like thread success" };
  }

  const likeThread = await db.like.create({
    data: {
      userId: userSelected.Id,
      threadId: threadSelected.Id,
    },
  });

  await db.thread.update({
    where: { Id: threadId },
    data: {
      isLiked: true,
    },
  });

  return { data: likeThread };
};
