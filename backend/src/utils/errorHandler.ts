import { ERROR_OBJECT } from "./constant/error";
import { Response } from "express";

export const errorHandler = (error: unknown, resp: Response) => {
  const errorMessage = (error as Error).message;
  let response = ERROR_OBJECT[errorMessage] || {
    statusCode: 500,
    message: errorMessage,
  };

  resp.status(response.statusCode).json({ message: response.message });
};
