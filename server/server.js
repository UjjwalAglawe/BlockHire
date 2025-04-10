const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const app = require("./index"); // Import Express app

const prisma = new PrismaClient();
const server = http.createServer(app); // Create HTTP server

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Frontend URL
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a chat room
    socket.on("joinChat", ({ clientId, freelancerId }) => {
        const roomId = [clientId, freelancerId].sort().join("-"); // Unique room ID
        socket.join(roomId);
        console.log(`User ${clientId} joined room ${roomId}`);
    });

    socket.on("fetchMessages", async ({ userId, chatPartnerId }) => {
        try {
            console.log(`Fetching messages between ${userId} and ${chatPartnerId}`);

            const messages = await prisma.message.findMany({
                where: {
                    OR: [
                        { senderId: Number(userId), receiverId: Number(chatPartnerId) },
                        { senderId: Number(chatPartnerId), receiverId: Number(userId) },
                    ],
                },
                orderBy: { timestamp: "asc" },
            });

            socket.emit("chatHistory", { userId, messages });
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    });

    socket.on("message", async (data) => {
        const { senderId, receiverId, content } = data;
        const roomId = [senderId, receiverId].sort().join("-"); // Unique chat room ID

        try {
            // Store message in the database
            const newMessage = await prisma.message.create({
                data: {
                    senderId,
                    receiverId,
                    content,
                },
            });

            // Emit message to the correct chat room
            io.to(roomId).emit("message", newMessage);
            console.log(`Message sent in room ${roomId}:`, newMessage);
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start Server
const PORT = process.env.PORT || 4000; // Run on a different port than index.js
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
