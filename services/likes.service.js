
import Like from "../models/likes.js";

export const  toggleLikeService = async ({
    artifactId,
    userId
}) => {
    const existingLike = await Like.findOne({
        artifact: artifactId,
        user: userId
    });
    if(existingLike) {
        await Like.deleteOne({
            artifact: artifactId,
            user: userId
        });
        return {liked: false};
    } else {
        await Like.create({
            artifact: artifactId,
            user: userId
        });
        return {liked: true};
    }
}