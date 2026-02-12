import cron from "node-cron";
import Artifact from "../models/artifact.js";

export const testing = () => {
    console.log("Testing cleanup job scheduled (every minute)");

    // Run every minute for testing
    cron.schedule("* * * * *", async () => {
        console.log("Running testing cron job...");
        try {
            // For testing, let's look for drafts older than 5 minutes
            const testingTimeThreshold = new Date(Date.now() - 5 * 60 * 1000);

            const drafts = await Artifact.find({
                status: "DRAFT",
                createdAt: { $lt: testingTimeThreshold }
            });

            console.log(`[TESTING] Found ${drafts.length} old draft artifacts (older than 5 mins).`);

            drafts.forEach(draft => {
                console.log(`- [TESTING] Draft ID: ${draft._id}, Created At: ${draft.createdAt}`);
            });

        } catch (error) {
            console.error("Error in testing cron job:", error);
        }
    })
}



// import cron from "node-cron"

// export const testing = () => {
//     console.log("Testing function scheduled");
//     cron.schedule("21 15 * * *", () => {
//         console.log("Cron job is running");
//     })
// }
// // 1st start  is rep minute 2nd  star is rep hours 3rd  star is rep day of month 4th  star is rep month 5th  star is rep day of week