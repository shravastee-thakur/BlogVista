import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getPostById,
  updatePost,
} from "../controllers/postController.js";
import { postValidation } from "../validation/joiValidation.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createPost", authenticate, postValidation, createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getPostById/:id", getPostById);
router.get("/getMyPosts", authenticate, getMyPosts);
router.put("/updatePost/:id", authenticate, updatePost);
router.delete("/deletePost/:id", authenticate, deletePost);

export default router;
