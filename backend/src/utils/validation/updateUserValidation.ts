import * as Joi from "joi";

export const updateSchema = Joi.object({
  fullname: Joi.string().allow(""),
  username: Joi.string().allow(""),
  // email: Joi.string().allow(""),
  // password: Joi.string()
  //   .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"))
  //   .message(
  //     "Password must be at least 8 character long and contain at at least one lowercase latter, one uppercase latter, and one number"
  //   )
  //   .allow(""),
  bio: Joi.string().allow(""),
  cover: Joi.allow(""),
  avatar: Joi.allow(""),
});
