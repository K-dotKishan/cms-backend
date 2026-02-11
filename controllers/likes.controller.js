import { toggleLikeService } from "../services/likes.service.js";

export const toggleLike = async (req,res) => {
    try {
        const result   =  await toggleLikeService({
            artifactId: req.params.id,
            userId: req.user.id
        })
        res.status(200).json({
            success: true,
            message: "Like toggled successfully",
            result
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: "Failed to toggle like",
            error: error.message
        })
    }
}