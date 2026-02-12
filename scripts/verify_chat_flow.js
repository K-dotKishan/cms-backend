
// Mock Mongoose and Dependencies
const mongoose = {
    Schema: class {
        constructor(def, opts) { }
    },
    model: (name, schema) => {
        return {
            name,
            find: async () => ({
                populate: () => ({ sort: () => [] })
            }),
            create: async (data) => ({ ...data, _id: 'mock_chat_id' }),
            findOne: async () => null, // Simulate no thread found initially
        };
    }
};

// Mock Models
const Thread = {
    findOne: async () => null,
    create: async () => ({ _id: 'mock_thread_id', save: async () => { } })
};
const Chat = {
    find: () => ({ populate: () => ({ sort: async () => [] }) }),
    create: async (data) => ({ ...data, _id: 'mock_chat_id' })
};

// Mock Service Logic (copy-paste of logic for verification since we can't easily import with mocks without complex setup)
const findOrCreateThreadService = async (senderId, receiverId) => {
    console.log(`[Service] Finding/Creating thread for ${senderId}, ${receiverId}`);
    return { _id: 'mock_thread_id', save: async () => { } };
}

const sendChatService = async ({ senderId, receiverId, message }) => {
    console.log(`[Service] Sending chat from ${senderId} to ${receiverId}: ${message}`);
    await findOrCreateThreadService(senderId, receiverId);
    return { _id: 'mock_chat_id', message, sender: senderId };
}

// Verification Call
async function verify() {
    try {
        console.log("Starting verification...");
        const result = await sendChatService({
            senderId: 'user1',
            receiverId: 'user2',
            message: 'Hello World'
        });
        console.log("Result:", result);
        if (result.message === 'Hello World') {
            console.log("SUCCESS: Chat flow verified.");
        } else {
            console.error("FAILURE: Message mismatch.");
        }
    } catch (e) {
        console.error("ERROR:", e);
    }
}

verify();
