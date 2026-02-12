import express from "express";

import { getChatByThread, sendChat } from "../controllers/chats.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js"
const router = express.Router();

router.get("/:threadId", authMiddleware,getChatByThread);
router.post("/", authMiddleware,sendChat);

export default router;