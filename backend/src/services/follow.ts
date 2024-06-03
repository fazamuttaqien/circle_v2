import db from "../lib/db";
import isValidUUID from "../utils/validation/uuidValidation";
import { FollowType } from "../models/follow";

export const follow = async (
  followingId: string,
  userId: string
): Promise<{ data: FollowType | Error | String }> => {
  if (!isValidUUID(followingId)) {
    throw new Error("Invalid UUID");
  }

  if (followingId == userId) {
    throw new Error("You cant follow your self");
  }

  const followingUser = await db.user.findUnique({
    where: {
      Id: followingId,
    },
  });

  if (!followingUser) {
    throw new Error("User not found");
  }

  const followerUser = await db.user.findUnique({
    where: {
      Id: userId,
    },
  });

  if (!followerUser) {
    throw new Error("User not found");
  }

  const exitingFollow = await db.follow.findFirst({
    where: {
      followerId: userId,
      followingId: followingId,
    },
  });

  if (exitingFollow) {
    await db.follow.delete({
      where: {
        Id: exitingFollow.Id,
      },
    });

    return { data: "Unfollow user success" };
  }

  const followUser = await db.follow.create({
    data: {
      followerId: userId,
      followingId: followingId,
      isFollow: true,
    },
    select: {
      Id: true,
      followerId: true,
      followingId: true,
      follower: {
        select: {
          Id: true,
          fullname: true,
        },
      },
      following: {
        select: {
          Id: true,
          fullname: true,
        },
      },
      followedAt: true,
      isFollow: true,
    },
  });

  return { data: followUser };
};
