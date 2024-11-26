import express from "express";
import {
  logout,
  signup,
  login,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middleware/ProtectRoute.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", ProtectRoute, updateProfile);

router.get("/check", ProtectRoute, checkAuth);

export default router;
