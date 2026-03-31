import { useState } from "react";
import Navbar from "../components/Navbar";

const ChatCoach = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const res = await fetch("http://localhost:5000/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const aiReply = {
      role: "assistant",
      text: data.reply,
    };

    setMessages((prev) => [...prev, aiReply]);
  };

  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="bg-gray-100 h-96 p-5 overflow-y-auto mb-4 rounded-xl">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            className="border flex-1 p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatCoach;
