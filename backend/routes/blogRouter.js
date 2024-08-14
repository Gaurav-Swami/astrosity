import express from "express";
const blogRouter = express.Router();
import {
  createBlog,
  displayBlogs,
  displaySingleBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { createBlogValidation } from "../middlewares/blogValidation.js";

blogRouter
  .post("/", createBlogValidation, createBlog)
  .get("/", displayBlogs)
  .get("/:id", displaySingleBlog)
  .delete("/:id",deleteBlog);

export default blogRouter;
