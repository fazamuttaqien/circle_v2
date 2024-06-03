import { Router } from "express";
import * as replyController from "../controllers/reply";
import authentication from "../middlewares/authentication";
import upload from "../middlewares/upload";

const replyRouter = Router();

replyRouter.post(
  "/replies/:threadId/reply",
  authentication,
  upload.single("image"),
  replyController.addReply
);

replyRouter.put(
  "/replies/:threadId/reply/:replyId",
  authentication,
  upload.single("image"),
  replyController.updateReply
);

replyRouter.delete(
  "/replies/:replyId",
  authentication,
  replyController.deleteReply
);

export default replyRouter;
