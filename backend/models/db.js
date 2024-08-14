import mongoose from "mongoose";
import "dotenv/config";
const mongo_url = process.env.MONGODB_URL;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Database connected sucessfully...");
  })
  .catch((error) => {
    console.log(error);
  });
