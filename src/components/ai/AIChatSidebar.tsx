"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FaBrain,
  FaPaperPlane,
  FaXmark,
  FaRobot,
  FaUser,
} from "react-icons/fa6";
import { ChatMessage } from "@/types";
import { getHistory, sendMessage } from "@/lib/api/chat";

interface AIChatSidebarProps {
  conceptId?: string;
  userId?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export default function AIChatSidebar({
  conceptId = "demo-concept",
  userId = "user-1",
  isOpen: externalIsOpen,
  onClose,
  onOpen,
}: AIChatSidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => (onOpen ? onOpen() : setInternalIsOpen(true));
  const handleClose = () => (onClose ? onClose() : setInternalIsOpen(false));

  // F18: Fetch History
  const fetchChatHistory = useCallback(async () => {
    try {
      const data = await getHistory(conceptId);
      if (data && data.length > 0) {
        setMessages(data);
      } else {
        setMessages([
          {
            _id: "init-1",
            userId,
            conceptId,
            role: "assistant",
            message:
              "Hello! I'm your Intelecture AI study buddy. Ask me anything about this concept!",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  }, [conceptId, userId]);

  // Sidebar খোলার সাথে সাথে হিস্ট্রি ফেচ হবে
  useEffect(() => {
    if (isOpen && conceptId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchChatHistory();
    }
  }, [isOpen, conceptId, fetchChatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      _id: `temp-${Date.now()}`,
      userId,
      conceptId,
      role: "user",
      message: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const messageText = input;
    setInput("");
    setIsTyping(true);

    try {
      const reply = await sendMessage(conceptId, messageText);
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          _id: `err-${Date.now()}`,
          userId,
          conceptId,
          role: "assistant",
          message: "Something went wrong, try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <>
      {/* Floating Trigger */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-purple-600 px-4 py-3 rounded-full text-white hover:bg-purple-500 shadow-lg transition-all"
        >
          <FaBrain className="animate-pulse" />
          <span className="text-sm font-semibold">Ask AI</span>
        </button>
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-zinc-950 border-l border-zinc-800 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <h3 className="text-white font-bold flex items-center gap-2">
            <FaRobot className="text-purple-400" /> Intelecture AI
          </h3>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <FaXmark size={18} />
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 p-4 overflow-y-auto h-[calc(100vh-140px)]">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex gap-2 mb-4 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                  msg.role === "user"
                    ? "bg-teal-950 border-teal-700"
                    : "bg-purple-950 border-purple-700"
                }`}
              >
                {msg.role === "user" ? (
                  <FaUser size={12} className="text-teal-300" />
                ) : (
                  <FaRobot size={12} className="text-purple-300" />
                )}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-teal-900/30 text-teal-50"
                    : "bg-purple-900/30 text-purple-50"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-zinc-800 bg-zinc-900/50"
        >
          <div className="relative flex items-center">
            <input
              className="w-full bg-zinc-900 p-3 pr-12 rounded-xl text-white border border-zinc-700 focus:border-purple-500 outline-none transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
            />
            <button
              type="submit"
              className="absolute right-3 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
