import express from "express";


import { createArtifact, getArtifacts } from "../controllers/artifact.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import upload from "../middleware/upload.middleware.js"
// ... existing imports ...

const router = express.Router();


router.post('/', authMiddleware, authorizeRoles("ADMIN", "EDITOR"), upload.single("file"), createArtifact);

router.get('/', authMiddleware, getArtifacts);

export default router;