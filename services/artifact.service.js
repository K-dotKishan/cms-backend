import Artifact from "../models/artifact.js";

export const createArtifactService = async ({
    title,
    content,
    userId,
    filePath
}) => {
    if(!title || !content) {
        throw new Error("Title and content are required");
    }

    const artifact = await Artifact.create({
        title,
        content,
        author: userId,
        media: filePath || null
    });
    return artifact;
}