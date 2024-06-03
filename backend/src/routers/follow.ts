import { Router } from "express";
import * as followController from "../controllers/follow";
import authentication from "../middlewares/authentication";

const followRouter = Router();

followRouter.post(
  "/follows/:followingId",
  authentication,
  followController.follow
);

export default followRouter;
