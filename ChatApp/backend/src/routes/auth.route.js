import express from "express";
import { logout, signup, singin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup)
router.get("/login",singin)
router.get("/logout",logout)

export default router;