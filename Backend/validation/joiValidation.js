import joi from "joi";

export const registerValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(30).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name cannot be more than 30 characters",
    }),

    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),

    password: joi.string().min(6).max(14).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  next();
};

export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),

    password: joi.string().min(6).max(14).required().messages({
      "string.empty": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};

export const postSchema = joi.object({
  title: joi.string().min(3).max(100).required(),
  description: joi.string().min(10).required(),
  author: joi.string().required(),
  category: joi.array().items(joi.string()).min(1).required(),
  coverImage: joi.string().uri().optional().allow(""),
});
