import mongoose from 'mongoose';

try {
    console.log("Testing mongoose.set('runValidators', true)...");
    mongoose.set("runValidators", true);
    console.log("No error thrown.");
} catch (error) {
    console.error("Error thrown:", error.message);
}

console.log("Done.");
