import Chat from '../models/chat.js';
import Thread from '../models/thread.js';

export const getChatByThreadService = async (threadId) => {
    return await Chat.find({ thread: threadId })
        .populate("sender", "name email")
        .sort({ createdAt: 1 });
}

export const sendChatService = async ({
    senderId,
    receiverId,
    message
}) => {
    const thread = await findOrCreateThreadService(senderId, receiverId);

    // create chat
    const chat = await Chat.create({
        thread: thread._id,
        sender: senderId,
        message
    });

    thread.lastMessage = message;
    thread.lastMessageAt = new Date();
    await thread.save();

    return chat;
}

export const findOrCreateThreadService = async (senderId, receiverId) => {
    let thread = await Thread.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    if (!thread) {
        thread = await Thread.create({
            participants: [senderId, receiverId]
        });
    }

    return thread;
}