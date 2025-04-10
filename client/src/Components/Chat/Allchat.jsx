import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AllChat() {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser?.id) {
            fetch(`http://localhost:4000/api/chats/${currentUser.id}`)
                .then(res => res.json())
                .then(data => setChats(data))
                .catch(error => console.error("Error fetching chats:", error));
        }
    }, [currentUser?.id]);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">💬 Your Chats</h2>

            {chats.length > 0 ? (
                <div className="bg-white shadow-lg rounded-lg p-4">
                    {chats.map(clientId => (
                        <div
                            key={clientId}
                            className="flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer mb-2"
                            onClick={() => navigate(`/chat/${clientId}`)}
                        >
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-semibold">
                                    {clientId.toString().charAt(0).toUpperCase()}
                                </div>
                                <span className="ml-4 text-gray-700 font-medium">
                                    Client {clientId}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">Tap to chat →</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No chats available</p>
            )}
        </div>
    );
}
