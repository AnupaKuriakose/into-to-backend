import { Post } from "../models/posts.model.js";

//Create a post
const createPost = async (req, res) => {
  try {
    //take req payload
    const { name, description, age } = req.body;
    //validation
    if (!name || !description || !age)
      return res.status(400).json({
        message: "All fields are required",
      });
    //if all fields are there, create post
    const post = await Post.create({
      name: name,
      description: description,
      age: age,
    });
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error });
  }
};
//Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//Update post
const updatePost = async (req, res) => {
  try {
    //basic validation to check body is empty or not
    //{name:x, description:'abc', age:3} -> [name, description, age]
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({
        message: "No data provided for update",
      });
    const post = await Post.findById(req.params.id, req.body, { new: true });
    if (!post) res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { createPost, getPosts, updatePost};
