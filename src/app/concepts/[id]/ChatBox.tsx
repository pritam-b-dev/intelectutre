"use client";

import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/lib/api/chat";
import { ChatMessage } from "@/types";
import { FaPaperPlane, FaRobot, FaUser, FaCircleNotch } from "react-icons/fa6";

export default function ChatBox({
  conceptId,
  initialHistory,
}: {
  conceptId: string;
  initialHistory: ChatMessage[];
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages or loading state change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const currentInput = input.trim();
    const userMsg: ChatMessage = {
      userId: "",
      conceptId,
      role: "user",
      message: currentInput,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(conceptId, currentInput);
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          userId: "",
          conceptId,
          role: "assistant",
          message: "Something went wrong, please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[450px] bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 transition-colors shadow-sm">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400 dark:text-zinc-500 text-xs space-y-2">
            <FaRobot size={28} className="text-purple-500/60 animate-bounce" />
            <p>Ask anything about this concept to start learning!</p>
          </div>
        ) : (
          messages.map((m, i) => {
            const isUser = m.role === "user";
            return (
              <div
                key={i}
                className={`flex items-start gap-2.5 max-w-[88%] ${
                  isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`p-2 rounded-xl text-xs flex items-center justify-center shrink-0 ${
                    isUser
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {isUser ? <FaUser size={12} /> : <FaRobot size={12} />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`text-sm px-4 py-2.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                    isUser
                      ? "bg-purple-600 text-white rounded-tr-none shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/50 rounded-tl-none shadow-sm"
                  }`}
                >
                  {m.message}
                </div>
              </div>
            );
          })
        )}

        {/* Loading / AI Typing State */}
        {loading && (
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs pl-1">
            <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <FaRobot size={12} />
            </div>
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 px-3 py-2 rounded-2xl rounded-tl-none">
              <FaCircleNotch
                className="animate-spin text-purple-600 dark:text-purple-400"
                size={12}
              />
              <span>AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="flex gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800 mt-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={loading}
          className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm disabled:opacity-50 disabled:hover:bg-purple-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
        >
          <FaPaperPlane size={14} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
