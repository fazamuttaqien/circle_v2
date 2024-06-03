import { Router } from "express";
import * as likeController from "../controllers/like";
import authentication from "../middlewares/authentication";

const likeRouter = Router();

likeRouter.post("/likes/:threadId/like", authentication, likeController.like);

export default likeRouter;
