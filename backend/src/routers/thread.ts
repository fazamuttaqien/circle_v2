import { Router } from "express";
import * as threadController from "../controllers/thread";
import authentication from "../middlewares/authentication";
import upload from "../middlewares/upload";

const threadRouter = Router();

threadRouter.post(
  "/threads",
  authentication,
  upload.any(),
  threadController.addThread
);
threadRouter.put(
  "/threads/:threadId",
  authentication,
  upload.any(),
  threadController.updateThread
);
threadRouter.delete(
  "/threads/:threadId",
  authentication,
  threadController.deleteThread
);
threadRouter.get(
  "/threads/byId/:threadId",
  authentication,
  threadController.findThreadById
);
threadRouter.get(
  "/threads/byUserId",
  authentication,
  threadController.findThreadByUserId
);
threadRouter.get("/threads/", authentication, threadController.findThreadAll);
threadRouter.get(
  "/threads/cache/",
  authentication,
  threadController.findThreadAllRedis
);

export default threadRouter;
