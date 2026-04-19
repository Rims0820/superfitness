// <<<<<<< enhance-ai-fitness-frontend-8587306157091094013
// import { useState, useRef, useEffect } from "react";
// =======
// import { useState, useEffect, useRef } from "react";
// >>>>>>> jules-10063236854266631655-61028e01
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

// <<<<<<< enhance-ai-fitness-frontend-8587306157091094013
// const ChatCoach = () => {
//   const [messages, setMessages] = useState([
//     { role: "assistant", text: "Hey champion! I'm your AI Coach. Ready to crush your goals today? Ask me anything about workouts or nutrition!" }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userMsg = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await res.json();
//       const aiMsg = { role: "assistant", text: data.reply || data.message || "I'm having trouble connecting to my central brain. Try again in a bit!" };
//       setMessages((prev) => [...prev, aiMsg]);
//     } catch (error) {
//       console.error("Chat error:", error);
//       setMessages((prev) => [...prev, { role: "assistant", text: "Connection error. Please try again." }]);
//     } finally {
//       setLoading(false);
//     }
// =======
// export default function ChatCoach() {
//   const [messages, setMessages] = useState([]), [input, setInput] = useState(""), [isTyping, setIsTyping] = useState(false), scrollRef = useRef(null);
//   useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isTyping]);
//   const sendMessage = async (e) => {
//     e?.preventDefault(); if (!input.trim() || isTyping) return;
//     const userMsg = { role: "user", text: input };
//     setMessages(p => [...p, userMsg]); setInput(""); setIsTyping(true);
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: input }) });
//       const data = await res.json(); setMessages(p => [...p, { role: "assistant", text: data.reply || data.message || "Error" }]);
//     } catch { setMessages(p => [...p, { role: "assistant", text: "Connection error" }]); } finally { setIsTyping(false); }
// >>>>>>> jules-10063236854266631655-61028e01
  };
  return (
// <<<<<<< enhance-ai-fitness-frontend-8587306157091094013
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full p-4 md:p-6">
//         <header className="mb-6 flex items-center gap-4">
//           <div className="w-12 h-12 sporty-gradient rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-primary/20">
//             <FaRobot />
//           </div>
//           <div>
//             <h1 className="text-2xl font-black uppercase tracking-tighter italic">AI <span className="text-primary">Coach</span></h1>
//             <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Always Online • Personal Trainer</p>
//           </div>
//         </header>

//         <div className="flex-grow glass rounded-3xl border border-white/5 overflow-hidden flex flex-col mb-6">
//           <div className="flex-grow overflow-y-auto p-6 space-y-6" role="log" aria-live="polite">
//             <AnimatePresence initial={false}>
//               {messages.map((msg, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//                 >
//                   <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
//                     <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs ${
//                       msg.role === "user" ? "bg-secondary text-white" : "bg-primary text-white"
//                     }`}>
//                       {msg.role === "user" ? <FaUser /> : <FaRobot />}
//                     </div>
//                     <div
//                       className={`px-5 py-3 rounded-2xl font-medium leading-relaxed ${
//                         msg.role === "user"
//                           ? "bg-secondary/20 text-white border border-secondary/20 rounded-tr-none"
//                           : "glass text-gray-100 border border-white/10 rounded-tl-none"
//                       }`}
//                     >
//                       {msg.text}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {loading && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
//                 <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-xs text-white">
//                   <FaRobot />
//                 </div>
//                 <div className="glass px-5 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
//                   <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
//                   <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
//                   <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
//                 </div>
//               </motion.div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <form
//             className="p-4 bg-white/5 border-t border-white/5"
//             onSubmit={(e) => {
//               e.preventDefault();
//               sendMessage();
//             }}
//           >
//             <div className="relative flex items-center">
//               <input
//                 className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 pr-14 focus:outline-none focus:border-primary/50 transition-colors font-medium"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Ask about training, diet, or motivation..."
//                 aria-label="Message to coach"
//               />
//               <button
//                 type="submit"
//                 disabled={!input.trim() || loading}
//                 className="absolute right-2 p-3 bg-primary text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
//               >
//                 <FaPaperPlane />
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
// =======
//     <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-purple-100">
//       <Navbar />
//       <div className="max-w-3xl mx-auto p-6">
//         <div ref={scrollRef} className="bg-white h-96 p-4 rounded-2xl shadow overflow-y-auto mb-4 scroll-smooth" role="log" aria-live="polite">
//           {messages.map((m, i) => (
//             <div key={i} className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
//               <div className={`px-4 py-2 rounded-xl max-w-xs ${m.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"}`}>{m.text}</div>
//             </div>
//           ))}
//           {isTyping && <div className="text-gray-400 text-sm italic ml-2 animate-pulse">Coach is thinking...</div>}
//         </div>
//         <form className="flex gap-2" onSubmit={sendMessage}>
//           <input className="flex-1 border rounded-xl p-2 focus:ring-2 focus:ring-blue-400 outline-none" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask your AI coach..." aria-label="Message to coach" />
//           <button disabled={isTyping || !input.trim()} className="bg-blue-600 disabled:bg-gray-300 text-white px-5 rounded-xl transition-colors hover:bg-blue-700 font-medium">Send</button>
//         </form>
//       </div>
// >>>>>>> jules-10063236854266631655-61028e01
    </div>
  );
}
