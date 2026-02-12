
try {
    await import('../models/chat.js');
    console.log("models/chat.js imported successfully");
    await import('../models/thread.js');
    console.log("models/thread.js imported successfully");
    await import('../models/chat.service.js');
    console.log("models/chat.service.js imported successfully");
    await import('../controllers/chats.controller.js');
    console.log("controllers/chats.controller.js imported successfully");
    console.log("All files syntax checked.");
} catch (e) {
    console.error("Syntax Error or Import Error:", e);
    process.exit(1);
}
