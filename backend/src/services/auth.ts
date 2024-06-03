import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import registerSchema from "../utils/validation/registerValidation";
import { ERROR_MESSAGE } from "../utils/constant/error";
import { User } from "@prisma/client";
import * as userService from "./user";
import loginSchema from "../utils/validation/loginValidation";
import logger from "../utils/logger/winston";
import cloudinary from "../lib/cloudinary/cloudinary";
import db from "../lib/db";

export const register = async (body: User): Promise<{ Id: string }> => {
  const { error, value } = registerSchema.validate(body);
  if (error?.details) {
    logger.error(error?.details);
    throw new Error(ERROR_MESSAGE.WRONG_INPUT);
  }
  logger.info("Validation of body data register was successful");

  const existEmail = await userService.getSingleUser({
    email: value.email,
  });

  if (existEmail) {
    logger.error("Email already exist");
    throw new Error(ERROR_MESSAGE.EXISTED_DATA);
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);
  const avatar: string =
    "https://res.cloudinary.com/dklgstji2/image/upload/v1716116271/default/dwugcokjho4yr3qndacc.jpg";
  const avatarCloudinary = await cloudinary.uploader.upload(avatar, {
    folder: "circle",
  });
  const avatarURL = avatarCloudinary.secure_url;

  const cover: string =
    "https://res.cloudinary.com/dklgstji2/image/upload/v1716116265/default/q5ckct7yvwojxsxnipzp.png";
  const coverCloudinary = await cloudinary.uploader.upload(cover, {
    folder: "circle",
  });
  const coverURL = coverCloudinary.secure_url;

  const user = await userService.createUser({
    ...value,
    password: hashedPassword,
    avatar: avatarURL,
    cover: coverURL,
  });
  logger.info("User created successfully");

  return { Id: user.Id };
};

export const login = async (body: User): Promise<{ token: string }> => {
  const { error, value } = loginSchema.validate(body);

  if (error?.details) {
    throw new Error(ERROR_MESSAGE.WRONG_INPUT);
  }

  const existEmail = await userService.getSingleUser({
    email: value.email,
  });

  if (!existEmail) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  const isMatch = await bcrypt.compare(value.password, existEmail.password);
  if (!isMatch) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  const token = jwt.sign(existEmail, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });

  return { token };
};

export const check = async (userId: string): Promise<void> => {
  const user = await db.user.findUnique({
    where: {
      Id: userId,
    },
  });

  if (!user) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }
};
