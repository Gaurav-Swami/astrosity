import express from "express";
const blogRouter = express.Router();
import {
  createBlog,
  displayBlogs,
  displaySingleBlog,
  deleteBlog,
  displayUserBlogs,
  createComment,
} from "../controllers/blogController.js";
import { createBlogValidation } from "../middlewares/blogValidation.js";
import { commentValidation } from "../middlewares/commentValidation.js";
import upload from "../middlewares/multer.js";

blogRouter
  .post("/", upload.single("image"), createBlogValidation, createBlog)
  .post("/:blogId/comments", commentValidation, createComment)
  .get("/", displayBlogs)
  .get("/:id", displaySingleBlog)
  .get("/user/:userId", displayUserBlogs)
  .delete("/:id", deleteBlog);

export default blogRouter;
