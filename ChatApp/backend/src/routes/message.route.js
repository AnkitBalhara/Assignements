import express from "express";
import {
  getUsersForSidebar,
  getMessages,
} from "../controllers/message.controller.js";
import { ProtectRoute } from "../middleware/ProtectRoute.middleware.js";

const router = express.Router();

router.get("/user", ProtectRoute, getUsersForSidebar);
router.get("/:id", ProtectRoute, getMessages);

export default router;
