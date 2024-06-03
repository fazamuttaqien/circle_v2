import { Thread } from "@prisma/client";
import * as fs from "fs";
import { Pagination } from "../models/thread";
import db from "../lib/db";
import { DEFAULT_EXPIRATION, redis } from "../lib/redis/client";
import isValidUUID from "../utils/validation/uuidValidation";
import { addthreadSchema } from "../utils/validation/threadValidation";
import cloudinary from "../lib/cloudinary/cloudinary";

export const findThreadAllRedis = async (
  page: string | string[],
  pageSize: string | string[]
): Promise<{
  data: Thread[] | Error;
  pagination?: Pagination;
  message: string;
}> => {
  const parsedPage = parseInt(page as string, 10);
  const parsedPageSize = parseInt(pageSize as string, 10);

  const skip = (parsedPage - 1) * parsedPageSize;

  const cacheKey = `threadsPage${page}`;

  if (!cacheKey) {
    throw new Error("Key not found");
  }

  const cacheData = await redis.get(cacheKey);
  if (cacheData) {
    const cache = JSON.parse(cacheData);

    const threads = await db.thread.findMany({
      skip,
      take: parsedPageSize,
      include: {
        user: true,
        image: true,
        likes: true,
        replies: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalThread = await db.thread.count();
    const totalPages = Math.ceil(totalThread / parsedPageSize);

    const checkThreads: () => boolean = () => {
      threads.forEach((thread, index) => {
        if (thread.content !== cache.data[index].content) return false;
        if (thread.likes.length !== cache.data[index].likes.length)
          return false;
        if (thread.replies.length !== cache.data[index].replies.length)
          return false;
        thread.image.forEach((image, i) => {
          if (image !== cache.data[index].image[i]) {
            return false;
          }
        });
      });
      return true;
    };

    // check whether the data in the database has new data or not
    if (
      cache.data.length === threads.length &&
      cache.pagination.totalThread == totalThread &&
      cache.pagination.totalPages == totalPages &&
      checkThreads()
    ) {
      // if there is no change then display the existing data in Redis
      const pagination: Pagination = {
        totalThread: cache.pagination.totalThread,
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
      // if there are changes, the existing data in Redis will be deleted and new data will be retrieved
      await redis.del(cacheKey);
    }
  }

  // retrieving data from the database
  const threads = await db.thread.findMany({
    skip,
    take: parsedPageSize,
    include: {
      user: true,
      image: true,
      likes: true,
      replies: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalThread = await db.thread.count();
  const totalPages = Math.ceil(totalThread / parsedPageSize);

  const pagination = {
    totalThread: totalThread,
    totalPages: totalPages,
    currentPage: page,
    parsedPageSize: parsedPageSize,
  };

  await redis.setEx(
    cacheKey,
    DEFAULT_EXPIRATION,
    JSON.stringify({
      data: threads,
      pagination: pagination,
    })
  );

  return {
    message: "Data from database success",
    data: threads,
    pagination: pagination,
  };
};

export const findThreadAll = async (
  page: string | string[],
  pageSize: string | string[]
): Promise<{ data: Thread[] | Error; pagination: Pagination }> => {
  const parsedPage = parseInt(page as string, 10);
  const parsedPageSize = parseInt(pageSize as string, 10);

  const skip = (parsedPage - 1) * parsedPageSize;

  const threads = await db.thread.findMany({
    skip,
    take: parsedPageSize,
    include: {
      user: true,
      image: true,
      likes: true,
      replies: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalThread = await db.thread.count();
  const totalPages = Math.ceil(totalThread / parsedPageSize);

  let paginationThreads: Pagination = {
    totalThread: totalThread,
    totalPages: totalPages,
    currentPage: page,
    parsedPageSize: parsedPageSize,
  };

  return { data: threads, pagination: paginationThreads };
};

export const findThreadById = async (
  threadId: string
): Promise<{ data: Thread[] | Thread | Error }> => {
  if (!isValidUUID(threadId)) {
    throw new Error("Invalid UUID of thread");
  }

  const cacheKey = `threadsId`;
  if (!cacheKey) {
    throw new Error("Cache key not found");
  }

  let dataThreads: Thread[] = [];

  const cache = await redis.get(cacheKey);
  if (cache) {
    dataThreads = JSON.parse(cache);
    const threads = await db.thread.findUniqueOrThrow({
      where: { Id: threadId },
      include: {
        image: true,
        user: true,
        likes: true,
        replies: true,
      },
    });

    // check if the thread already exists in the redis
    const existingUserIndex = Array.from(dataThreads).findIndex(
      (threads) => threads.Id === threadId
    );
    if (existingUserIndex !== -1 && threads !== null) {
      dataThreads[existingUserIndex] = threads;
    } else {
      Array.from(dataThreads).push(threads);
    }
    await redis.setEx(
      cacheKey,
      DEFAULT_EXPIRATION,
      JSON.stringify(dataThreads)
    );
    if (dataThreads[existingUserIndex]) {
      return { data: dataThreads[existingUserIndex] };
    }
  }

  const thread = await db.thread.findUniqueOrThrow({
    where: { Id: threadId },
    include: {
      image: true,
      user: true,
      likes: true,
      replies: true,
    },
  });
  if (!thread) {
    throw new Error("Thread not found");
  }

  dataThreads.push(thread);

  await redis.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(dataThreads));

  return { data: dataThreads };
};

export const findThreadByUserId = async (userId: string): Promise<Thread[]> => {
  return await db.thread.findMany({
    where: { userId: userId },
    include: {
      image: true,
      user: true,
      likes: true,
      replies: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const addThread = async (
  body: Thread,
  userId: string,
  files: { [fieldname: string]: Express.Multer.File[] }
): Promise<{ data: Thread | Error }> => {
  const userSelect = await db.user.findUnique({
    where: { Id: userId },
  });

  if (!userSelect) {
    throw new Error("User not found");
  }

  let imageURL: string[] = [];

  // check if multiple files are uploaded
  if (Array.isArray(files)) {
    for (const file of files as Express.Multer.File[]) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "circle",
      });
      imageURL.push(result.secure_url);
      fs.unlinkSync(file.path);
    }
  } else {
    // single file uploaded
    const file = files as unknown as Express.Multer.File;
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "circle",
    });
    imageURL.push(result.secure_url);
    fs.unlinkSync(file.path);
  }

  const thread = await db.thread.create({
    data: {
      content: body.content,
      createdAt: new Date(),
      user: { connect: { Id: userId } },
    },
  });

  await db.threadImage.createMany({
    data: imageURL.map((img) => ({
      url: img,
      threadId: thread.Id,
    })),
  });

  return { data: thread };
};

export const updateThread = async (
  body: Thread,
  userId: string,
  threadId: string,
  files: { [fieldname: string]: Express.Multer.File[] }
): Promise<{ data: Thread | Error }> => {
  if (!isValidUUID(threadId)) {
    throw new Error("Invalid UUID");
  }

  const userSelect = await db.user.findUnique({
    where: { Id: userId },
  });

  if (!userSelect) {
    throw new Error("User not found");
  }

  const threadSelect = await db.thread.findUnique({
    where: { Id: threadId, AND: { user: { Id: userId } } },
  });
  if (!threadSelect) {
    throw new Error("Your not authorized to update this thread");
  }

  const { error } = addthreadSchema.validate(body);
  if (error) {
    throw new Error(error.details[0].message);
  }

  let imageURL: string[] = [];

  // check if multiple files are uploaded
  if (Array.isArray(files)) {
    for (const file of files as Express.Multer.File[]) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "circle",
      });
      imageURL.push(result.secure_url);
      fs.unlinkSync(file.path);
    }
  } else {
    // single file uploaded
    const file = files as unknown as Express.Multer.File;
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "circle",
    });
    imageURL.push(result.secure_url);
    fs.unlinkSync(file.path);
  }

  const thread = await db.thread.update({
    where: { Id: threadId },
    data: {
      content: body.content,
      createdAt: new Date(),
      user: { connect: { Id: userId } },
    },
  });

  const threadImageId = await db.threadImage.findMany({
    where: { threadId: threadId },
    select: {
      Id: true,
      url: true,
    },
  });

  if (threadImageId.length === imageURL.length) {
    threadImageId.forEach(async (item, index) => {
      await db.threadImage.update({
        where: {
          Id: item.Id,
          threadId: thread.Id,
        },
        data: {
          url: imageURL[index],
        },
      });
    });
  } else {
    await db.threadImage.deleteMany({
      where: {
        threadId: thread.Id,
      },
    });
    await db.threadImage.createMany({
      data: imageURL.map((img) => ({
        url: img,
        threadId: thread.Id,
      })),
    });
  }

  return { data: thread };
};

export const deleteThread = async (
  threadId: string,
  userId: string
): Promise<{ data: Thread | Error }> => {
  if (!isValidUUID(threadId)) {
    throw new Error("Invalid UUID");
  }

  const userSelect = await db.user.findUnique({
    where: { Id: userId },
  });
  if (!userSelect) {
    throw new Error("User not found");
  }

  const oldThreadData = await db.thread.findUnique({
    where: { Id: threadId },
    select: { image: true },
  });

  oldThreadData?.image.forEach(async (item) => {
    if (oldThreadData && item) {
      const publicId = item.url.split("/").pop()?.split(".")[0];
      cloudinary.uploader.destroy(publicId as string);
    }
  });

  const thread = await db.thread.delete({
    where: { Id: threadId },
  });

  return { data: thread };
};
