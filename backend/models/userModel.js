import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
      lowercase: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true } 
);

const User = mongoose.model("User", userSchema);
export default User;
