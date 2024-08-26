import Blog from "../models/blogModel.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import { cloudinary } from "../utils/coudinary.js";

const createBlog = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;
    const imageFile = req.file;
    let imageURL = "";

    if (imageFile) {
      const result = await cloudinary.uploader.upload(imageFile.path, {
        folder: "blogimages",
      });
      imageURL = result.secure_url;

      fs.unlinkSync(imageFile.path);
    } else {
      imageURL =
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3";
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res
        .status(400)
        .json({ message: "Invalid user_id", success: false });
    }
    const newBlog = new Blog({
      title,
      content,
      byUser: new mongoose.Types.ObjectId(user_id),
      image: imageURL,
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
    const blog = await Blog.findOne({ _id: id }).populate(
      "comments.byUser",
      "name"
    );
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

const createComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content, byUser } = req.body;
    if (!mongoose.Types.ObjectId.isValid(byUser)) {
      return res
        .status(400)
        .json({ message: "Invalid userId", success: false });
    }
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }
    const newComment = { content, byUser };
    blog.comments.push(newComment);
    await blog.save();
    return res.status(200).json(new ApiResponse(200, "Comment Posted"));
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
  createComment,
};
