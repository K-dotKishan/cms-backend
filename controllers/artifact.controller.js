


import { createArtifactService } from "../services/artifact.service.js";
import Artifact from "../models/artifact.js";

export const createArtifact = async (req, res) => {
    try {
        console.log("Controller req.file:", req.file); // Debug log
        console.log("Controller req.body:", req.body); // Debug log
        const artifact = await createArtifactService({
            title: req.body.title || req.body.Title, // Handle case sensitivity
            content: req.body.content || req.body.Content,
            userId: req.user.id,
            filePath: req.file ? req.file.path : null
        });
        res.status(201).json({
            success: true,
            message: "Artifact created successfully",
            artifact
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create artifact",
            error: error.message
        })
    }
}

export const getArtifacts = async (req, res) => {
    try {
        const artifacts = await Artifact.find({
            author: req.user.id
        });
        res.status(200).json({
            success: true,
            message: "Artifacts fetched successfully",
            artifacts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch artifacts",
            error: error.message
        })
    }
}
