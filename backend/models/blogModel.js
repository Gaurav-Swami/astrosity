import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 10,
    },
    image: {
      type: String,
      required: true,
    },
    byUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        content: {
          type: String,
          required: true,
          minLength: 1,
        },
        byUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        likes: {
          type: Number,
          default: 0,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },  
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
