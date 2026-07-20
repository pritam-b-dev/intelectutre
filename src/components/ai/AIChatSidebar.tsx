"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaBrain,
  FaPaperPlane,
  FaXmark,
  FaRobot,
  FaUser,
} from "react-icons/fa6";
import { ChatMessage } from "@/types";

interface AIChatSidebarProps {
  conceptId?: string;
  userId?: string;
}

export default function AIChatSidebar({
  conceptId = "demo-concept",
  userId = "user-1",
}: AIChatSidebarProps) {
  // ১. সাইডবার খোলা নাকি বন্ধ তা ট্র্যাক করার স্টেট
  const [isOpen, setIsOpen] = useState(false);

  // ২. লোকাল মেসেজ লিস্ট স্টেট
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      _id: "init-1",
      userId,
      conceptId,
      role: "assistant",
      message:
        "Hello! I'm your Intelecture AI study buddy. Ask me anything about this concept or topic!",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // অটো-স্ক্রোল টু বটম
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // 🌟 F16B + B10: রিয়েল স্ট্রিম ও সেভ মেসেজ হ্যান্ডলার
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsgText = input.trim();
    const timestamp = new Date().toISOString();

    // ১. ইউজার মেসেজ তৈরি ও স্টেটে অ্যাড
    const userMsg: ChatMessage = {
      _id: `user-${Date.now()}`,
      userId,
      conceptId,
      role: "user",
      message: userMsgText,
      timestamp,
    };

    // ২. স্ট্রিম থেকে আসা লাইভ রেসপন্সের জন্য খালি Assistant মেসেজ প্লেসহোল্ডার
    const assistantMsgId = `assistant-${Date.now()}`;
    const initialAssistantMsg: ChatMessage = {
      _id: assistantMsgId,
      userId,
      conceptId,
      role: "assistant",
      message: "",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
    setInput("");
    setIsTyping(true);

    let fullAssistantText = "";

    try {
      // Step 1: POST to /api/chat/stream
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conceptId, message: userMsgText }),
      });

      if (!response.ok) {
        throw new Error(`Stream request failed with status ${response.status}`);
      }

      // Step 2: Open ReadableStream connection
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (reader) {
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");

          // অসম্পূর্ণ লাইন পরের চাঙ্কের জন্য বাফারে রেখে বাকি লাইনগুলো প্রসেস করি
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data:")) continue;

            const dataContent = trimmed.slice(5).trim();

            if (dataContent === "[DONE]") {
              break;
            }

            try {
              const parsed = JSON.parse(dataContent);
              if (parsed.text) {
                fullAssistantText += parsed.text;

                // Step 3: Append chunks in real-time (Typewriter effect)
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg._id === assistantMsgId
                      ? { ...msg, message: fullAssistantText }
                      : msg,
                  ),
                );
              }
            } catch (jsonErr) {
              console.error("Error parsing stream chunk:", jsonErr);
            }
          }
        }
      }

      // Step 4: On stream end, POST /api/chat/save-response (B10 Endpoint)
      if (fullAssistantText) {
        await fetch("/api/chat/save-response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conceptId,
            assistantMessage: fullAssistantText,
          }),
        });
      }
    } catch (error) {
      console.error("❌ Error during chat streaming:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === assistantMsgId
            ? {
                ...msg,
                message:
                  fullAssistantText ||
                  "Sorry, an error occurred while generating the response. Please try again.",
              }
            : msg,
        ),
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* 🌟 ১. ট্রিগার বাটন (সাইডবার বন্ধ থাকলে ভেসে থাকবে) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-4 py-3 rounded-full shadow-lg shadow-purple-950/50 transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-400/30 group"
          aria-label="Open AI Assistant"
        >
          <div className="relative flex items-center justify-center">
            <FaBrain className="text-xl animate-pulse text-purple-200" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-200"></span>
            </span>
          </div>
          <span className="font-semibold text-sm hidden sm:inline">Ask AI</span>
        </button>
      )}

      {/* 🌟 ২. ফ্লোটিং চ্যাট সাইডবার প্যানেল */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-full sm:w-96 bg-zinc-950/95 backdrop-blur-md border-l border-zinc-800/80 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* প্যানেল হেডার */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-purple-950/80 border border-purple-700/50 rounded-xl">
              <FaBrain className="text-purple-400 text-lg animate-pulse" />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                Intelecture AI
                <span className="text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-full font-mono">
                  Beta
                </span>
              </h3>
              <p className="text-xs text-zinc-400">Study Assistant</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            title="Close Sidebar"
          >
            <FaXmark size={18} />
          </button>
        </div>

        {/* মেসেজ লিস্ট (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            const formattedTime = new Date(msg.timestamp).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              },
            );

            return (
              <div
                key={msg._id || `msg-${index}`}
                className={`flex gap-3 max-w-[85%] ${
                  isUser ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
                }`}
              >
                {/* অ্যাভাটার */}
                <div
                  className={`flex-shrink-0 h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold border ${
                    isUser
                      ? "bg-teal-950/80 border-teal-700/50 text-teal-300"
                      : "bg-purple-950/80 border-purple-700/50 text-purple-300"
                  }`}
                >
                  {isUser ? <FaUser size={12} /> : <FaRobot size={12} />}
                </div>

                {/* বাবল মেসেজ */}
                <div className="space-y-1">
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? "bg-teal-950/60 border border-teal-800/50 text-teal-100 rounded-tr-xs"
                        : "bg-purple-950/40 border border-purple-900/40 text-purple-100 rounded-tl-xs"
                    }`}
                  >
                    {msg.message || (
                      <span className="italic opacity-60">Thinking...</span>
                    )}
                  </div>
                  <p
                    className={`text-[10px] text-zinc-500 px-1 ${
                      isUser ? "text-right" : "text-left"
                    }`}
                  >
                    {formattedTime}
                  </p>
                </div>
              </div>
            );
          })}

          {/* টাইপিং ইন্ডিকেটর */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%] mr-auto items-center">
              <div className="h-7 w-7 rounded-lg bg-purple-950/80 border border-purple-700/50 text-purple-300 flex items-center justify-center text-xs">
                <FaRobot size={12} />
              </div>
              <div className="p-3 bg-purple-950/30 border border-purple-900/30 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ইনপুট + সেন্ড বাটন */}
        <form
          onSubmit={handleSend}
          className="p-3 border-t border-zinc-800/80 bg-zinc-900/40 space-y-2"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI a question..."
              disabled={isTyping}
              className="w-full bg-zinc-900/90 text-white text-xs placeholder-zinc-500 rounded-xl pl-3 pr-10 py-3 border border-zinc-800 focus:outline-none focus:border-purple-500/80 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 text-purple-400 hover:text-purple-300 disabled:text-zinc-600 transition-colors"
              title="Send message"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
          <p className="text-[10px] text-center text-zinc-500">
            Press Enter to send. Powered by Intelecture AI.
          </p>
        </form>
      </div>
    </>
  );
}
