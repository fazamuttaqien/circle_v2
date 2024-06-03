import { Router } from "express";
import * as userController from "../controllers/user";
import authentication from "../middlewares/authentication";
import upload from "../middlewares/upload";

const userRouter = Router();

userRouter.delete("/users/:userId", authentication, userController.deleteUser);
userRouter.put(
  "/users/:userId",
  authentication,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  userController.updateUser
);
userRouter.get(
  "/users/suggested",
  authentication,
  userController.findSuggestedUser
);
userRouter.get(
  "/usersByName/:name",
  authentication,
  userController.findByNameUser
);
userRouter.get("/usersById/", authentication, userController.findByIdUser);
userRouter.get("/users", authentication, userController.findAllUserRedis);

export default userRouter;
