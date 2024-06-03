import Joi from "joi";

export const addthreadSchema = Joi.object({
  content: Joi.string().required(),
});
