import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

export default function ChatCoach() {
  const [messages, setMessages] = useState([]), [input, setInput] = useState(""), [isTyping, setIsTyping] = useState(false), scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isTyping]);
  const sendMessage = async (e) => {
    e?.preventDefault(); if (!input.trim() || isTyping) return;
    const userMsg = { role: "user", text: input };
    setMessages(p => [...p, userMsg]); setInput(""); setIsTyping(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: input }) });
      const data = await res.json(); setMessages(p => [...p, { role: "assistant", text: data.reply || data.message || "Error" }]);
    } catch { setMessages(p => [...p, { role: "assistant", text: "Connection error" }]); } finally { setIsTyping(false); }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-purple-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <div ref={scrollRef} className="bg-white h-96 p-4 rounded-2xl shadow overflow-y-auto mb-4 scroll-smooth" role="log" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-xl max-w-xs ${m.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"}`}>{m.text}</div>
            </div>
          ))}
          {isTyping && <div className="text-gray-400 text-sm italic ml-2 animate-pulse">Coach is thinking...</div>}
        </div>
        <form className="flex gap-2" onSubmit={sendMessage}>
          <input className="flex-1 border rounded-xl p-2 focus:ring-2 focus:ring-blue-400 outline-none" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask your AI coach..." aria-label="Message to coach" />
          <button disabled={isTyping || !input.trim()} className="bg-blue-600 disabled:bg-gray-300 text-white px-5 rounded-xl transition-colors hover:bg-blue-700 font-medium">Send</button>
        </form>
      </div>
    </div>
  );
}
