import cron from "node-cron";
import Artifact from "../models/artifact.js";

export const draftCleanup = () => {
    console.log("Draft cleanup job scheduled");

    // Run every 12 hours
    cron.schedule("0 */12 * * *", async () => {
        console.log("Running draft cleanup cron job...");

        try {
            const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

            const drafts = await Artifact.find({
                status: "DRAFT",
                createdAt: { $lt: twelveHoursAgo }
            });

            console.log(`Found ${drafts.length} old draft artifacts.`);

            // Log the drafts for now (or implement cleanup logic here)
            drafts.forEach(draft => {
                console.log(`- Draft ID: ${draft._id}, Created At: ${draft.createdAt}`);
            });

        } catch (error) {
            console.error("Error in draft cleanup cron job:", error);
        }
    });
};
