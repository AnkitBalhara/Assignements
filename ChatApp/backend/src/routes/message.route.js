import express from "express";
import { getUsersForSidebar } from "../controllers/message.controller";
import { ProtectRoute } from "../middleware/ProtectRoute.middleware";

const router = express.Router();

router.get("/user",ProtectRoute, getUsersForSidebar);

export default router;
