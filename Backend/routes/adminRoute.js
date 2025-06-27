import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { deleteUser, getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

router.get("/getAllUsers", authenticate, getAllUsers);
router.delete("/deleteUser/:id", authenticate, deleteUser);

export default router;
