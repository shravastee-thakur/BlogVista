import Post from "../models/postModel.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, description, category, coverImage } = req.body;

    if (!title || !description || !category) {
      return res
        .status(401)
        .json({ success: false, message: "All fields are required" });
    }

    const newPost = await Post.create({
      title,
      description,
      author: req.user.id,
      category,
      coverImage,
    });

    return res
      .status(201)
      .json({ success: true, newPost, message: "Post created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.find().sort({ createdAt: -1 });
    if (!allPosts) {
      return res
        .status(404)
        .json({ success: false, message: "Posts not found" });
    }

    return res.status(201).json({
      success: true,
      allPosts,
      message: "All posts fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("author");
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(201).json({
      success: true,
      post,
      message: "Post fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyPosts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ author: userId });
    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "Posts not found" });
    }

    return res.status(201).json({
      success: true,
      posts,
      message: "Post fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { title, description, category, coverImage } = req.body;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to update the post" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, description, category, coverImage },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      updatedPost,
      message: "Post updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    await post.findByIdAndDelete(postId);

    return res.status(201).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
