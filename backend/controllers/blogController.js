import Blog from "../models/blogModel.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBlog = async (req, res) => {
  try {
    const { title, content, image, user_id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res
        .status(400)
        .json({ message: "Invalid user_id", success: false });
    }
    const newBlog = new Blog({
      title,
      content,
      byUser: new mongoose.Types.ObjectId(user_id),
      image,
    });
    await newBlog.save();
    return res
      .status(201)
      .json({ message: "Blog created successfully", success: true });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(500).json({ message: err.message, success: false });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const displayBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs.length) {
      return res
        .status(404)
        .json({ message: "Blogs not found", success: false });
    }
    const response = new ApiResponse(200, "Fetched Videos Successfully", blogs);
    return res.status(response.statusCode).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const displayUserBlogs = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid userId", success: false });
    }
    const blogs = await Blog.find({ byUser: userId });
    if (!blogs.length) {
      return res
        .status(404)
        .json({ message: "Blogs not found", success: false });
    }
    const response = new ApiResponse(
      200,
      "Fetched user blogs successfully",
      blogs
    );
    return res.status(response.statusCode).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const displaySingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id });
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }
    const response = new ApiResponse(200, "Fetched blog Successfully", blog);
    return res.status(response.statusCode).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Blog Deleted Successfully"));
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export {
  createBlog,
  displayBlogs,
  displaySingleBlog,
  displayUserBlogs,
  deleteBlog,
};
