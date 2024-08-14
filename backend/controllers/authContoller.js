import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "Account already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const catchUser = await User.findOne({ email });
    const sendUser = {
      _id: catchUser._id,
      email: catchUser.email,
      name: catchUser.name,
    };
    const jwtToken = jwt.sign(
      { email: catchUser.email, _id: catchUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(201).json({
      message: "Sign Up sucessfull",
      success: true,
      jwtToken,
      user: sendUser,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const errmsg = "Auth failed, email or password is incorrect0";
    if (!user) {
      return res.status(401).json({ message: errmsg, success: false });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: errmsg, success: false });
    }
    const sendUser = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      message: "Logged In successfully",
      success: true,
      jwtToken,
      user: sendUser,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export { signin, signup };
