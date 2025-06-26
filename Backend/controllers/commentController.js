import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const createComment = async (req, res, next) => {
  try {
    const { post, text } = req.body;

    const postForComment = await Post.findById(post);

    if (!postForComment) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      post,
      user: req.user.id,
      text,
    });

    return res.status(201).json({
      success: true,
      comment: {
        id: comment._id,
        text: comment.text,
        user: comment.user,
        createdAt: comment.createdAt,
      },
      message: "Comment done successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find(postId);

    return res.status(201).json({
      success: true,
      count: comments.length,
      comments,
      message: "Comments fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if (comment.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit the comment",
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(commentId);

    return res.status(201).json({
      success: true,
      updatedComment,
      message: "Comment done successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if (
      comment.user.toString() !== req.user.id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete the comment",
      });
    }

    await Comment.deleteOne();

    return res.status(201).json({
      success: true,
      message: "Comment done successfully",
    });
  } catch (error) {
    next(error);
  }
};
