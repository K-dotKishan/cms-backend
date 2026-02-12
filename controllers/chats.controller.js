import { getChatByThreadService, sendChatService } from "../services/chat.service.js";

export const getChatByThread = async (req, res) => {
    try {
        const { threadId } = req.params;
        const chats = await getChatByThreadService(threadId);
        return res.status(200).json(chats);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const sendChat = async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        // Assuming req.user is populated by authentication middleware
        const senderId = req.user?._id;

        if (!senderId) {
            return res.status(401).json({ message: "Unauthorized: Sender not identified" });
        }

        const chat = await sendChatService({ senderId, receiverId, message });
        return res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

