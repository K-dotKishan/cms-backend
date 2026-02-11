import express from "express";
import { toggleLike } from "../controllers/likes.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id/toggle", authMiddleware, toggleLike);

export default router;
