import { Request, Response } from "express";
import * as likeService from "../services/like";

export const like = async (req: Request, resp: Response) => {
  try {
    const threadId = req.params.threadId;
    const userId = resp.locals.userId;

    const like = await likeService.like(threadId, userId);

    resp.status(200).json(like);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};
