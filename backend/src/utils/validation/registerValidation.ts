import Joi from "joi";

const registerSchema = Joi.object({
  fullname: Joi.string().required().min(5),
  username: Joi.string().required().min(6),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export default registerSchema;
