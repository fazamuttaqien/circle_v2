import { ReplyType } from "../models/reply";
import db from "../lib/db";
import isValidUUID from "../utils/validation/uuidValidation";
import { addthreadSchema } from "../utils/validation/threadValidation";
import cloudinary from "../lib/cloudinary/cloudinary";
import * as fs from "fs";
import { Thread } from "@prisma/client";

export const addReply = async (
  body: Thread,
  threadId: string,
  userId: string,
  file: Express.Multer.File | undefined
): Promise<{ data: ReplyType | Error }> => {
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
  });
  if (!threadSelected) {
    throw new Error("Thread not found");
  }

  const { error } = addthreadSchema.validate(body);
  if (error) {
    throw new Error(error.message);
  }

  let imageURL: string[] = [];
  // let imageURL: string = "";

  if (!file) {
    imageURL = [];
  } else {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "circle",
    });
    imageURL.push(result.secure_url);
    fs.unlinkSync(file.path);
  }

  const reply = await db.thread.create({
    data: {
      content: body.content,
      threadId: threadId,
      userId: userId,
      image: {
        create: imageURL.map((url) => ({
          url: url,
        })),
      },
    },
    include: {
      image: true,
      user: true,
    },
  });

  const dataReply: ReplyType = {
    threadId: reply.threadId,
    content: reply.content,
    image: reply.image,
    createdAt: reply.createdAt,
    user: {
      Id: reply.user.Id,
      fullname: reply.user.fullname,
    },
  };

  return { data: dataReply };
};

export const updateReply = async (
  body: Thread,
  threadId: string,
  userId: string,
  replyId: string,
  images: Express.Multer.File | undefined
): Promise<{ data: ReplyType | Error }> => {
  if (!isValidUUID(replyId) && !isValidUUID(threadId)) {
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
  });
  if (!threadSelected) {
    throw new Error("Thread not found");
  }

  const replySelected = await db.thread.findUnique({
    where: {
      Id: replyId,
      threadId: threadId,
    },
  });
  if (!replySelected) {
    throw new Error("Reply not found");
  }

  const { error } = addthreadSchema.validate(body);
  if (error) {
    throw new Error(error.message);
  }

  let imageURL: string = "";

  const oldReplyData = await db.thread.findUnique({
    where: { Id: replyId },
    select: { image: true },
  });

  if (images) {
    const cloudinaryUpload = await cloudinary.uploader.upload(images.path, {
      folder: "circle",
    });
    imageURL = cloudinaryUpload.secure_url;
    fs.unlinkSync(images.path);

    if (oldReplyData && oldReplyData.image) {
      oldReplyData?.image.forEach(async (item) => {
        if (item) {
          const publicId = item.url.split("/").pop()?.split(".")[0];
          cloudinary.uploader.destroy(publicId as string);
        }
      });
    }
  } else {
    const file = images as unknown as Express.Multer.File;
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "circle",
    });
    imageURL = result.secure_url;
    fs.unlinkSync(file.path);
  }

  const reply = await db.thread.update({
    where: { Id: replyId, threadId: threadId },
    data: {
      content: body.content,
      createdAt: new Date(),
      user: { connect: { Id: userId } },
      image: {
        updateMany: {
          where: {
            Id: oldReplyData?.image?.[0]?.Id,
          },
          data: {
            url: imageURL,
          },
        },
      },
    },
    select: {
      Id: true,
      content: true,
      image: true,
      threadId: true,
      createdAt: true,
      user: {
        select: {
          Id: true,
          fullname: true,
        },
      },
    },
  });

  return { data: reply };
};

export const deleteReply = async (
  userId: string,
  replyId: string
): Promise<{ data: ReplyType | Error }> => {
  if (!isValidUUID(replyId)) {
    throw new Error("Invalid UUID");
  }

  const userSelected = await db.user.findUnique({
    where: { Id: userId },
  });
  if (!userSelected) {
    throw new Error("User not found");
  }

  const oldReplyData = await db.thread.findUnique({
    where: { Id: replyId },
    select: { image: true },
  });

  if (oldReplyData && oldReplyData.image) {
    oldReplyData?.image.forEach(async (item) => {
      if (item) {
        const publicId = item.url.split("/").pop()?.split(".")[0];
        cloudinary.uploader.destroy(publicId as string);
      }
    });
  }

  const reply = await db.thread.delete({
    where: { Id: replyId },
    select: {
      Id: true,
      content: true,
      image: true,
      createdAt: true,
      user: {
        select: {
          Id: true,
          fullname: true,
        },
      },
      threadId: true,
    },
  });

  return { data: reply };
};
