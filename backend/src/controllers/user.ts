import { Request, Response } from "express";
import * as userService from "../services/user";
import { errorHandler } from "../utils/errorHandler";

export const deleteUser = async (req: Request, resp: Response) => {
  try {
    const userId = req.params.userId;
    const message = await userService.deleteUser(userId);

    resp.status(200).json({ message: message });
  } catch (error) {
    return errorHandler(error, resp);
  }
};

export const updateUser = async (req: Request, resp: Response) => {
  try {
    const body = req.body;
    const userId = req.params.userId;
    const files = req.files;
    const sessionId = resp.locals.userId;

    const data = await userService.updateUser(
      userId,
      sessionId,
      body,
      files as { [fieldname: string]: Express.Multer.File[] }
    );

    resp.status(200).json(data);
  } catch (error) {
    const err = error as unknown as Error;
    resp.status(500).json({
      message: err.message,
    });
  }
};

export const findSuggestedUser = async (req: Request, resp: Response) => {
  try {
    const sessionId = resp.locals.userId;
    const { limit = "5" } = req.query as { limit: string };

    const data = await userService.findSuggestedUser(limit, sessionId);
    resp.status(200).json(data);
  } catch (error) {
    const err = error as unknown as Error;
    resp.status(500).json({
      message: err.message,
    });
  }
};

export const findByNameUser = async (req: Request, resp: Response) => {
  try {
    const name = req.params.name;

    const data = await userService.findByNameUser(name);
    resp.status(200).json(data);
  } catch (error) {
    const err = error as unknown as Error;
    resp.status(500).json({
      message: err.message,
    });
  }
};

export const findByIdUser = async (req: Request, resp: Response) => {
  try {
    const userId = resp.locals.userId;
    const data = await userService.findByIdUser(userId);

    resp.status(200).json(data);
  } catch (error) {
    const err = error as unknown as Error;
    resp.status(500).json({
      message: err.message,
    });
  }
};

export const findAllUserRedis = async (req: Request, resp: Response) => {
  try {
    const { page = "1" } = req.query as {
      page: string;
    };
    const data = await userService.findAllUserRedis(page);
    resp.status(200).json(data);
  } catch (error) {
    const err = error as unknown as Error;
    resp.status(500).json({
      message: err.message,
    });
  }
};
