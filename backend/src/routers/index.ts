import { Router } from "express";
import userRouter from "./user";
import authRouter from "./auth";
import threadRouter from "./thread";
import replyRouter from "./reply";
import likeRouter from "./like";
import followRouter from "./follow";

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(threadRouter);
router.use(replyRouter);
router.use(likeRouter);
router.use(followRouter);

export default router;
