import { Request, Response } from "express";
import * as replyService from "../services/reply";
import { Thread } from "@prisma/client";

export const addReply = async (req: Request, resp: Response) => {
  try {
    const userId = resp.locals.userId;
    const threadId = req.params.threadId;
    const image = req.file;

    const reply = await replyService.addReply(
      req.body as Thread,
      threadId,
      userId,
      image
    );

    resp.status(200).json(reply);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};

export const updateReply = async (req: Request, resp: Response) => {
  try {
    const userId = resp.locals.userId;
    const threadId = req.params.threadId;
    const replyId = req.params.replyId;
    const image = req.file;

    const reply = await replyService.updateReply(
      req.body as Thread,
      threadId,
      userId,
      replyId,
      image
    );
    resp.status(200).json(reply);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};

export const deleteReply = async (req: Request, resp: Response) => {
  try {
    const userId = resp.locals.userId;
    const replyId = req.params.replyId;

    const reply = await replyService.deleteReply(userId, replyId);

    resp.status(200).json(reply);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};
