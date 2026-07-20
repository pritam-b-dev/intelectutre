"use client";
import { useState } from "react";
import { sendMessage } from "@/lib/api/chat";
import { ChatMessage } from "@/types";

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

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = {
      userId: "",
      conceptId,
      role: "user",
      message: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const reply = await sendMessage(conceptId, input);
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          userId: "",
          conceptId,
          role: "assistant",
          message: "Something went wrong, try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm p-2 rounded-lg max-w-[85%] ${m.role === "user" ? "bg-purple-600/30 ml-auto" : "bg-zinc-800"}`}
          >
            {m.message}
          </div>
        ))}
        {loading && (
          <div className="text-xs text-zinc-500">AI is typing...</div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask something..."
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-4 rounded-lg text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
