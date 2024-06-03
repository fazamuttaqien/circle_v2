import { Request, Response } from "express";
import * as followService from "../services/follow";

export const follow = async (req: Request, resp: Response) => {
  try {
    const followingId = req.params.followingId;
    const userId = resp.locals.userId;

    const follow = await followService.follow(followingId, userId);

    resp.status(200).json(follow);
  } catch (error) {
    const err = error as unknown as Error;

    resp.status(500).json({
      message: err.message,
    });
  }
};
