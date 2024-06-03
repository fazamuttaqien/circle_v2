import db from "../lib/db";
import { v4 as uuidv4 } from "uuid";
import * as bcyrpt from "bcrypt";
import { ERROR_MESSAGE } from "../utils/constant/error";
import { User } from "@prisma/client";
import isValidUUID from "../utils/validation/uuidValidation";
import { updateSchema } from "../utils/validation/updateUserValidation";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "../lib/cloudinary/cloudinary";
import * as fs from "fs";
import { DEFAULT_EXPIRATION, redis } from "../lib/redis/client";
import { Pagination } from "../models/user";

export const createUser = async (body: User): Promise<User> => {
  return db.user.create({
    data: body,
  });
};

export const getSingleUser = async (condition: {
  [key: string]: string;
}): Promise<User | null> => {
  return db.user.findFirst({
    where: condition,
  });
};

export const deleteUser = async (userId: string): Promise<string> => {
  const existUser = await db.user.findFirst({
    where: {
      Id: userId,
    },
  });

  if (!existUser) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  await db.user.delete({
    where: {
      Id: userId,
    },
  });

  return "User deleted : " + userId;
};

export const findSuggestedUser = async (
  limit: string | string[],
  sessionId: string
): Promise<User[]> => {
  const limits = parseInt(limit as string) || 5;

  const followingUsers = await db.user.findFirstOrThrow({
    where: { Id: sessionId },
    select: {
      Id: true,
      fullname: true,
      following: {
        select: {
          followingId: true,
        },
      },
    },
  });

  const followings = followingUsers.following.map((item) => item.followingId);

  const users = await db.user.findMany({
    select: {
      Id: true,
      fullname: true,
      username: true,
      avatar: true,
    },
  });

  const data: any[] = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].Id !== sessionId && !followings.includes(users[i].Id)) {
      data.push(users[i]);
    }
  }
  const randomUsers = data.sort(() => 0.5 - Math.random()).slice(0, limits);

  return randomUsers;
};

export const findByNameUser = async (name: string): Promise<User[]> => {
  const user = await db.user.findMany({
    where: {
      fullname: name,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const findByIdUser = async (userId: string): Promise<User | null> => {
  if (!isValidUUID(userId)) {
    throw new Error("Invalid UUID of user");
  }

  return await db.user.findUniqueOrThrow({
    where: { Id: userId },
    include: {
      follower: {
        select: {
          Id: true,
          followerId: true,
          followingId: true,
          isFollow: true,
          follower: true,
        },
      },
      following: {
        select: {
          Id: true,
          followerId: true,
          followingId: true,
          isFollow: true,
          following: true,
        },
      },
      likes: true,
      threads: true,
    },
  });
};

export const findAllUserRedis = async (
  page: string | string[]
): Promise<{
  data: User[] | Error;
  pagination?: Pagination;
  message: string;
}> => {
  const parsedPage = parseInt(page as string, 10);

  const pageSize = 10;
  const skip = (parsedPage - 1) * pageSize;

  const cacheKey = `usersPage${page}`;
  if (!cacheKey) {
    throw new Error("Key not found");
  }

  const cacheData = await redis.get(cacheKey);
  if (cacheData) {
    const cache = JSON.parse(cacheData);
    const users = await db.user.findMany({
      skip,
      take: pageSize,
    });

    const totalUser = await db.user.count();
    const totalPages = Math.ceil(totalUser / pageSize);

    if (
      cache.data.length === users.length &&
      cache.pagination.totalUser === totalUser &&
      cache.pagination.totalPages === totalPages
    ) {
      const pagination: Pagination = {
        totalUser: cache.pagination.totalUser,
        totalPages: cache.pagination.totalPages,
        currentPage: cache.pagination.currentPage,
        parsedPageSize: cache.pagination.parsedPageSize,
      };

      return {
        message: "Data from cache success",
        data: cache.data,
        pagination: pagination,
      };
    } else {
      await redis.del(cacheKey);
    }
  }

  const users = await db.user.findMany({
    skip,
    take: pageSize,
    include: {
      follower: true,
      following: true,
      likes: true,
      threads: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalUser = await db.user.count();
  const totalPages = Math.ceil(totalUser / pageSize);

  if (parsedPage > totalPages) throw new Error("Page not found");

  const pagination = {
    totalUser: totalUser,
    totalPages: totalPages,
    currentPage: page,
    parsedPageSize: pageSize,
  };

  await redis.setEx(
    cacheKey,
    DEFAULT_EXPIRATION,
    JSON.stringify({
      data: users,
      pagination: pagination,
    })
  );

  return {
    message: "Data from database success",
    data: users,
    pagination: pagination,
  };
};

export const updateUser = async (
  userId: string,
  sessionId: string,
  body: User,
  files: { [fieldname: string]: Express.Multer.File[] }
): Promise<User | Error> => {
  if (userId !== sessionId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUniqueOrThrow({
    where: { Id: userId },
  });

  const imageURL: { field: string; url: string }[] = [];

  for (const [key, value] of Object.entries(files)) {
    const keyFiles = key as keyof User;
    try {
      const result = await cloudinary.uploader.upload(value[0].path, {
        folder: "circle",
      });
      imageURL.push({ field: key, url: result.secure_url });

      const publicId =
        "circle" + (user[keyFiles] as string)?.split("/circle")[1];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.error(`Failed to upload ${key}:`, error);
      throw new Error(`Failed to upload ${key}: ${error}`);
    }

    try {
      fs.unlinkSync(value[0].path as string);
    } catch (err) {
      throw new Error(
        `Failed to delete local file ${user[keyFiles] as string}: ${err}`
      );
    }
  }

  if (imageURL.length > 0) {
    imageURL.forEach((file) => {
      (body[file.field as keyof User] as string) = file.url;
    });
  }

  const { error } = updateSchema.validate(body);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const updated: Partial<User> = {
    fullname: body.fullname,
    username: body.username,
    bio: body.bio,
  };

  imageURL.forEach((file) => {
    (updated[file.field as keyof User] as string) = file.url;
  });

  return await db.user.update({
    where: { Id: userId },
    data: updated,
  });
};
