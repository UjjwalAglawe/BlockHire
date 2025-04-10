const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Get all unique client chats for a freelancer
router.get("/chats/:freelancerId", async (req, res) => {
    const { freelancerId } = req.params;

    try {
        // Fetch all distinct clients who have chatted with the freelancer
        const chats = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: Number(freelancerId) },
                    { receiverId: Number(freelancerId) },
                ],
            },
            select: {
                senderId: true,
                receiverId: true,
            },
            distinct: ["senderId", "receiverId"], // Ensure unique chats
        });

        // Extract unique client IDs
        const uniqueClientIds = new Set();
        chats.forEach(chat => {
            if (chat.senderId !== freelancerId) uniqueClientIds.add(chat.senderId);
            if (chat.receiverId !== freelancerId) uniqueClientIds.add(chat.receiverId);
        });

        res.json(Array.from(uniqueClientIds)); // Return unique client IDs
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
