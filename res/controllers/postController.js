const Post = require("../models/postInfo");

const createPost = async (req, res) => {
  try {
    const { title, content, author, userId } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const newPost = new Post({
      title,
      content,
      author,
      imageUrl,
      createdAt: new Date(),
      userId,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error during post creation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createPost,
};