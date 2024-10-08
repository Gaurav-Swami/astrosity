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
      try {
        // Use upload_stream if you are using memoryStorage
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "blogimages" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(imageFile.buffer); // Send the buffer
        });
        imageURL = result.secure_url;
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Image upload failed", success: false });
      }
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
    const blogs = await Blog.find().populate("byUser", "name");
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
    const blog = await Blog.findOne({ _id: id }).populate({
      path: "comments.byUser",
      select: "name _id", // Populate the name and id of the user who made the comment
    });
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
    const blog = await Blog.findById(blogId);
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

const handleLike = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { liked } = req.body;
  try {
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }

    const comment = blog.comments.id(commentId);
    console.log(blogId);
    if (!comment) {
      return res
        .status(404)
        .json({ message: "comment not found", success: false });
    }
    comment.likes += liked ? 1 : -1;
    await blog.save();
    return res.status(200).json(new ApiResponse(200, "Like status toggled"));
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error togglingl like status" });
  }
};

export {
  createBlog,
  displayBlogs,
  displaySingleBlog,
  displayUserBlogs,
  deleteBlog,
  createComment,
  handleLike,
};
