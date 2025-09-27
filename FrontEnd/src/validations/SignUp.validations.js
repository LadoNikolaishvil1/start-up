import Joi from "joi";

// 1. Reusable field-level schemas
const fieldSchemas = {
  userType: Joi.string().valid("company", "influencer").required().messages({
    "any.only": "User type must be either 'company' or 'influencer'.",
    "string.base": "User type must be a text value.",
    "any.required": "User type is required.",
  }),

  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a text value.",
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must not exceed 30 characters.",
    "any.required": "Username is required.",
  }),

  email: Joi.string().email({ tlds: false }).required().messages({
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

  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "any.required": "Please confirm your password.",
  }),

  socialHandle: Joi.string().min(2).max(30).required().messages({
    "string.base": "Social handle must be a text value.",
    "string.empty": "Social handle is required.",
    "string.min": "Social handle must be at least 2 characters long.",
    "string.max": "Social handle must not exceed 30 characters.",
    "any.required": "Social handle is required.",
  }),

  category: Joi.string().min(2).max(30).required().messages({
    "string.base": "Category must be a text value.",
    "string.empty": "Category is required.",
    "string.min": "Category must be at least 2 characters long.",
    "string.max": "Category must not exceed 30 characters.",
    "any.required": "Category is required.",
  }),

  bio: Joi.string().min(5).max(500).required().messages({
    "string.base": "Bio must be a text value.",
    "string.empty": "Bio is required.",
    "string.min": "Bio must be at least 5 characters long.",
    "string.max": "Bio must not exceed 500 characters.",
    "any.required": "Bio is required.",
  }),

  location: Joi.string().min(2).max(50).required().messages({
    "string.base": "Location must be a text value.",
    "string.empty": "Location is required.",
    "string.min": "Location must be at least 2 characters long.",
    "string.max": "Location must not exceed 50 characters.",
    "any.required": "Location is required.",
  }),

  website: Joi.alternatives().conditional(Joi.ref("$userType"), {
    is: "company",
    then: Joi.string().uri().allow("").messages({
      "string.uri": "Website must be a valid URL (e.g., https://example.com).",
      // "any.required": "Website is required.",
    }),
    otherwise: Joi.any().strip(), // Remove this field for non-company users
  }),

  interests: Joi.array().items(Joi.string()).required().messages({
    "array.base": "Interests must be a list of text values.",
    "any.required": "Interests are required.",
  }),

  lookingFor: Joi.array().items(Joi.string()).required().messages({
    "array.base": "Looking For must be a list of text values.",
    "any.required": "Looking For is required.",
  }),

  hobbies: Joi.alternatives().conditional(Joi.ref("$userType"), {
    is: "influencer",
    then: Joi.array().items(Joi.string()).required().messages({
      "array.base": "Hobbies must be a list of text values.",
      "any.required": "Hobbies are required.",
    }),
    otherwise: Joi.any().strip(),
  }),

  employer: Joi.alternatives().conditional(Joi.ref("$userType"), {
    is: "company",
    then: Joi.string().required().messages({
      "string.base": "Employer must be a text value.",
      "string.empty": "Employer is required.",
      "any.required": "Employer is required.",
    }),
    otherwise: Joi.any().strip(),
  }),

  securityKey: Joi.string().when(Joi.ref("$userType"), {
    is: "influencer",
    then: Joi.string().required().messages({
      "string.base": "Security Key must be a text value.",
      "string.empty": "Security Key is required.",
      "any.required": "Security Key is required.",
    }),
    otherwise: Joi.any().strip(),
  }),

  followers: Joi.alternatives().conditional(Joi.ref("$userType"), {
    is: "influencer",
    then: Joi.number().integer().min(0).required().messages({
      "number.base": "Followers must be a number.",
      "number.min": "Followers count cannot be negative.",
      "number.integer": "Followers must be a whole number.",
      "any.required": "Followers count is required.",
    }),
    otherwise: Joi.any().strip(),
  }),
};

// 2. Full schema (final step)
export const signUpSchema = Joi.object(fieldSchemas);

// 3. Utility to create schema for a step
export const createStepSchema = (inputNames = []) =>
  Joi.object(
    inputNames.reduce((acc, name) => {
      if (fieldSchemas[name]) acc[name] = fieldSchemas[name];
      return acc;
    }, {})
  );

// 4. Use with your `data` array in SignUp.jsx like:
/// (example)
/// createStepSchema(["username", "email", "socialHandle"]);
