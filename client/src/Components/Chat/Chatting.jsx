import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Connect to backend

const Chatting = () => {
    const { id: freelancerId } = useParams();  // Freelancer's ID from URL
    const { currentUser } = useSelector((state) => state.user);  // Client's ID from Redux
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser?.id && freelancerId) {
            socket.emit("joinChat", { clientId: currentUser.id, freelancerId });

            socket.emit("fetchMessages", { userId: currentUser.id, chatPartnerId: parseInt(freelancerId) });
        }

        socket.on("chatHistory", ({ userId, messages }) => {
            setMessages(messages);
        });

        socket.on("message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off("message");
            socket.off("chatHistory");
        };
    }, [currentUser?.id, freelancerId]);

    const sendMessage = () => {
        if (message.trim() !== "") {
            const chatData = {
                senderId: currentUser.id,
                receiverId: parseInt(freelancerId),
                content: message,
            };
            socket.emit("message", chatData);
            setMessages((prev) => [...prev, chatData]);
            setMessage("");
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Chat Header */}
            <div className=" ">
                <div className="bg-blue-600 text-white text-lg font-semibold p-4 shadow-md flex justify-between">
                    Chat with Freelancer {freelancerId}

                    {!currentUser.freelancer && <button className="bg-red-500 py-2 px-5 rounded-lg" onClick={() => { navigate("/deal/create") }}>Create Contract</button>}
                    
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-xs p-3 rounded-lg shadow-md ${msg.senderId === currentUser.id
                                ? "bg-blue-500 text-white ml-auto"
                                : "bg-gray-300 text-black"
                            }`}
                    >
                        <p className="text-sm">{msg.content}</p>
                    </div>
                ))}
            </div>

            {/* Input Section */}
            <div className="flex items-center p-4 bg-white shadow-md">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatting;
