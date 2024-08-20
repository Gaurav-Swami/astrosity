import express from "express";
const blogRouter = express.Router();
import {
  createBlog,
  displayBlogs,
  displaySingleBlog,
  deleteBlog,
  displayUserBlogs,
} from "../controllers/blogController.js";
import { createBlogValidation } from "../middlewares/blogValidation.js";

blogRouter
  .post("/", createBlogValidation, createBlog)
  .get("/", displayBlogs)
  .get("/:id", displaySingleBlog)
  .get("/user/:userId", displayUserBlogs)
  .delete("/:id", deleteBlog);

export default blogRouter;
