import Joi from "joi";
import Blog from "../models/blogModel.js";

export const createBlogValidation = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    image: Joi.string().required(),
    user_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad request", error });
  }

  const existingBlog = await Blog.findOne({ title: req.body.title });
  try {
    if (existingBlog) {
      return res
        .status(400)
        .json({ message: "Title must be unique", success: false });
    }
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Sever Error", success: false });
  }
};
