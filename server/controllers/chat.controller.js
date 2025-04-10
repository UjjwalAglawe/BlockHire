const prisma = require("../dbConfig/prisma");

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body; // Renamed recipientId → receiverId, message → content
        const senderId = req.user.id;

        if (!receiverId || !content) {
            return res.status(400).json({ success: false, message: "Receiver and content are required." });
        }

        const newMessage = await prisma.message.create({
            data: {
                senderId,
                receiverId,
                content, // Ensure this matches the schema
                timestamp: new Date(),
            },
        });

        return res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
    }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user.id;

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: currentUserId, receiverId: parseInt(userId) },
                    { senderId: parseInt(userId), receiverId: currentUserId },
                ],
            },
            orderBy: { timestamp: "asc" },
        });

        return res.status(200).json({ success: true, data: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
    }
};
