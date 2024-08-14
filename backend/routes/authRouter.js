import express from "express";
const authRouter = express.Router();
import { signin, signup } from "../controllers/authContoller.js";
import {
  signUpValidation,
  signInValidation,
} from "../middlewares/authValidation.js";

authRouter
  .post("/signup", signUpValidation, signup)
  .post("/signin", signInValidation, signin);
export default authRouter;
