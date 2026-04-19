import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

const ChatCoach = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey champion! I'm your AI Coach. Ready to crush your goals today? Ask me anything about workouts or nutrition!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiMsg = { role: "assistant", text: data.reply || data.message || "I'm having trouble connecting to my central brain. Try again in a bit!" };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full p-4 md:p-6">
        <header className="mb-6 flex items-center gap-4">
          <div className="w-12 h-12 sporty-gradient rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-primary/20">
            <FaRobot />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter italic">AI <span className="text-primary">Coach</span></h1>
            <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Always Online • Personal Trainer</p>
          </div>
        </header>

        <div className="flex-grow glass rounded-3xl border border-white/5 overflow-hidden flex flex-col mb-6">
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs ${
                      msg.role === "user" ? "bg-secondary text-white" : "bg-primary text-white"
                    }`}>
                      {msg.role === "user" ? <FaUser /> : <FaRobot />}
                    </div>
                    <div
                      className={`px-5 py-3 rounded-2xl font-medium leading-relaxed ${
                        msg.role === "user"
                          ? "bg-secondary/20 text-white border border-secondary/20 rounded-tr-none"
                          : "glass text-gray-100 border border-white/10 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-xs text-white">
                  <FaRobot />
                </div>
                <div className="glass px-5 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white/5 border-t border-white/5">
            <div className="relative flex items-center">
              <input
                className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 pr-14 focus:outline-none focus:border-primary/50 transition-colors font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about training, diet, or motivation..."
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="absolute right-2 p-3 bg-primary text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatCoach;