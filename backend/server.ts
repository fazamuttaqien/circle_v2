import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/routers";
import db from "./src/lib/db";
import path from "path";
import { redisconnect } from "./src/lib/redis/client";
import logger from "./src/utils/logger/winston";
import morgan from "morgan";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use(router);

app.use(morgan("dev"));

app.listen(+PORT, async () => {
  await db.$connect();
  redisconnect();
  logger.info("Server is running at http://localhost:" + PORT);
});
