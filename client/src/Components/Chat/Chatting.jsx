import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const Chatting = () => {
  const { id: freelancerId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id && freelancerId) {
      socket.emit("joinChat", { clientId: currentUser.id, freelancerId });
      socket.emit("fetchMessages", {
        userId: currentUser.id,
        chatPartnerId: parseInt(freelancerId),
      });
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
    <div className="flex flex-col h-screen bg-gray-300">
      {/* Chat Container with lighter background */}
      <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-md">
        {/* Chat Header */}
        <div className="bg-indigo-600 text-white py-4 px-6 shadow-md flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chat with Freelancer #{freelancerId}</h2>
          {!currentUser.freelancer && (
            <button
              onClick={() => navigate(`/deal/create/${freelancerId}`)}
              className="bg-red-500 hover:bg-red-600 transition text-sm font-medium px-4 py-2 rounded-lg"
            >
              Create Contract
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-lg px-4 py-3 rounded-xl shadow 
                  ${
                    msg.senderId === currentUser.id
                      ? "bg-indigo-500 text-white self-end ml-auto"
                      : "bg-white text-gray-800 self-start"
                  }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="bg-white py-4 px-4 sm:px-6 shadow-inner">
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-500 hover:bg-indigo-600 transition text-white px-5 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
