import Joi from "joi";

export const logInSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.base": "Email must be a text value.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a text value.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),
});
