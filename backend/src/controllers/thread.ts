import { Request, Response } from "express";
import * as threadService from "../services/thread";
import { Thread } from "@prisma/client";

export const addThread = async (req: Request, resp: Response) => {
  try {
    // const body = req.body as Thread;
    const userId = resp.locals.userId;
    const images = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const thread = await threadService.addThread(
      req.body as Thread,
      userId,
      images
    );

    resp.status(200).json(thread);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};

export const updateThread = async (req: Request, resp: Response) => {
  try {
    // const body = req.body;
    const userId = resp.locals.userId;
    const threadId = req.params.threadId;
    const multipleImage = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const thread = await threadService.updateThread(
      req.body as Thread,
      userId,
      threadId,
      multipleImage
    );
    resp.status(200).json(thread);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};

export const deleteThread = async (req: Request, resp: Response) => {
  try {
    const userId = resp.locals.userId;
    const threadId = req.params.threadId;

    const thread = await threadService.deleteThread(threadId, userId);
    resp.status(200).json(thread);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};

export const findThreadAll = async (req: Request, resp: Response) => {
  try {
    const { page = "1", pageSize = "10" } = req.query as {
      page: string;
      pageSize: string;
    };

    const thread = await threadService.findThreadAll(page, pageSize);

    resp.status(200).json(thread);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};

export const findThreadAllRedis = async (req: Request, resp: Response) => {
  try {
    const { page = "1", pageSize = "10" } = req.query as {
      page: string;
      pageSize: string;
    };

    const thread = await threadService.findThreadAllRedis(page, pageSize);
    resp.status(200).json(thread);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};

export const findThreadById = async (req: Request, resp: Response) => {
  try {
    const threadId = req.params.threadId;
    const thread = await threadService.findThreadById(threadId);

    resp.status(200).json(thread);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};

export const findThreadByUserId = async (req: Request, resp: Response) => {
  try {
    const userId = resp.locals.userId;

    const thread = await threadService.findThreadByUserId(userId);
    resp.status(200).json(thread);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};
