import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/commentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createComment", authenticate, createComment);
router.get("/getComment", getComment);
router.put("/updateComment/:id", authenticate, updateComment);
router.delete("/deleteComment/:id", authenticate, deleteComment);

export default router;
