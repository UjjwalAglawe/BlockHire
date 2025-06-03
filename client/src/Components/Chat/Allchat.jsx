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
        .then((res) => res.json())
        .then((data) => setChats(data))
        .catch((error) => console.error("Error fetching chats:", error));
    }
  }, [currentUser?.id]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b border-indigo-300 pb-2 flex items-center gap-3">
        💬 Your Chats
      </h2>

      {chats.length > 0 ? (
        <div className="bg-white shadow-xl rounded-xl p-5 space-y-4">
          {chats.map((clientId) => (
            <div
              key={clientId}
              onClick={() => navigate(`/chat/${clientId}`)}
              className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 cursor-pointer transition-shadow shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold select-none">
                  {clientId.toString().charAt(0).toUpperCase()}
                </div>
                <span className="text-lg text-gray-900 font-semibold select-none">
                  Client {clientId}
                </span>
              </div>
              <span className="text-sm text-indigo-700 font-medium select-none">
                Tap to chat →
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic mt-10 select-none">
          No chats available
        </p>
      )}
    </div>
  );
}
