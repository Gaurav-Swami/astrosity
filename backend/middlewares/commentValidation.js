import Joi from "joi";

export const commentValidation = (req, res, next) => {
  const schema = Joi.object({
    content: Joi.string().min(1).max(500).required(),
    byUser: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad request", error });
  }
  next();
};

