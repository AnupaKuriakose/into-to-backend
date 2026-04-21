import { json } from "express";
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //check user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "user already exists" });
    }

    //Now create user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });
    res.status(201).json({
      message: "user registered successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    //validation 1: user already exist validation
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!user)
      return res.staus(400).json({
        messge: "User not found",
      });

      //validation 2: compare passwords
      
  } catch (error) {}
};

export { registerUser };
