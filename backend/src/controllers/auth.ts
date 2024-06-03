import { Request, Response } from "express";
import * as authService from "../services/auth";
import { User } from "@prisma/client";
import { errorHandler } from "../utils/errorHandler";

export const register = async (req: Request, resp: Response) => {
  try {
    const data = await authService.register(req.body as User);
    resp.status(200).send(data);
  } catch (error) {
    return errorHandler(error, resp);
  }
};

export const login = async (req: Request, resp: Response) => {
  try {
    const data = await authService.login(req.body as User);
    resp.status(200).send(data);
  } catch (error) {
    return errorHandler(error, resp);
  }
};

export const check = async (req: Request, resp: Response) => {
  try {
    const userId = resp.locals.userId;

    await authService.check(userId);

    resp.status(200).send({ status: true });
  } catch (error) {
    return errorHandler(error, resp);
  }
};
