import express from "express";
import {
  login,
  logout,
  refreshTokenHandler,
  register,
} from "../controllers/userController.js";
import {
  loginValidation,
  registerValidation,
} from "../validation/joiValidation.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/refresh", refreshTokenHandler);
router.post("/logout", authenticate, logout);

export default router;
