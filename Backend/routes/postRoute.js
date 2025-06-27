import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getPostById,
  likePost,
  updatePost,
} from "../controllers/postController.js";
import { postValidation } from "../validation/joiValidation.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import { allowRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/createPost",
  authenticate,
  upload.single("coverImage"),
  postValidation,
  createPost
);
router.get("/getAllPosts", getAllPosts);
router.get("/getPostById/:id", getPostById);
router.get("/getMyPosts", authenticate, getMyPosts);
router.put("/updatePost/:id", authenticate, updatePost);
router.delete(
  "/deletePost/:id",
  authenticate,
  allowRole("user", "admin"),
  deletePost
);
router.patch("/like/:id", authenticate, likePost);

export default router;
