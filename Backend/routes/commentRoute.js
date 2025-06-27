import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/commentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { allowRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/createComment", authenticate, createComment);
router.get("/getComment", getComment);
router.put("/updateComment/:id", authenticate, updateComment);
router.delete(
  "/deleteComment/:id",
  authenticate,
  allowRole("user", "admin"),
  deleteComment
);

export default router;
