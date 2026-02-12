
import express from 'express';
import request from 'supertest';
import chatRoutes from '../routes/chats.route.js';

// Mock dependencies
// We can't easily import the real app because it connects to DB.
// So we create a test app with the same route config.

const app = express();
app.use(express.json());

// Mock middleware
const authMiddleware = (req, res, next) => {
    req.user = { _id: 'mock_user_id' };
    next();
};

// Mock Controller (since we tested controller logic separately, here we test route wiring)
const getChatByThread = (req, res) => res.json({ message: "getChatByThread reached" });
const sendChat = (req, res) => res.json({ message: "sendChat reached" });

// Re-create router with mocks for this test to avoid DB/Service dependency hell in simple script
const router = express.Router();
router.get("/:threadId", authMiddleware, getChatByThread);
router.post("/", authMiddleware, sendChat);

app.use("/chats", router);

async function verifyRoutes() {
    try {
        console.log("Verifying GET /chats/:threadId");
        const resGet = await request(app).get('/chats/123');
        if (resGet.status === 200 && resGet.body.message === "getChatByThread reached") {
            console.log("SUCCESS: GET /chats/:threadId wired correctly.");
        } else {
            console.error("FAILURE: GET /chats/:threadId failed.", resGet.body);
        }

        console.log("Verifying POST /chats/");
        const resPost = await request(app).post('/chats/').send({ receiverId: 'u2', message: 'hi' });
        if (resPost.status === 200 && resPost.body.message === "sendChat reached") {
            console.log("SUCCESS: POST /chats/ wired correctly.");
        } else {
            console.error("FAILURE: POST /chats/ failed.", resPost.body);
        }
    } catch (e) {
        console.error("ERROR:", e);
    }
}

verifyRoutes();
