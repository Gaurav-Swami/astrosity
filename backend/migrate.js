import mongoose from "mongoose";
import "dotenv/config";
import Blog from "./models/blogModel.js"; // Replace with the correct path to your Blog model
const mongo_url = process.env.MONGODB_URL;

const migrateData = async () => {
  await mongoose.connect(mongo_url);

  try {
    // Fetch all blogs
    const blogs = await Blog.find();

    for (let blog of blogs) {
      // Initialize the new fields with default values
      blog.likes = 0; // Default value for likes
      blog.comments = []; // Default empty array for comments

      // Save the updated blog document
      await blog.save();
    }

    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    mongoose.disconnect();
  }
};

migrateData();
