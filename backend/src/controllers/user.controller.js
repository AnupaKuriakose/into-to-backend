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
      return res.status(400).json({
        messge: "User not found",
      });

    //validation 2: compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    res.status(200).json({
      message: "User logged in",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
     console.log('user', req.body);
    const { email } = req.body;
   
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {return res.status(404).json({ messgae: "User not found" });}
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export { registerUser, loginUser, logoutUser };
