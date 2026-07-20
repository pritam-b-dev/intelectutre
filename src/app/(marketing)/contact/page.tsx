"use client";

import React, { useState } from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa6";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // সিমুলেশন
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Get in Touch</h1>
          <p className="text-zinc-400">
            Have questions about Intelecture or want to partner with us? We
            would love to hear from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Name</label>
              <input
                required
                type="text"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-purple-500 outline-none transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Email</label>
              <input
                required
                type="email"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-purple-500 outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Message</label>
            <textarea
              required
              rows={4}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-purple-500 outline-none transition"
            />
          </div>

          <button
            disabled={status !== "idle"}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl transition active:scale-95 disabled:opacity-50"
          >
            {status === "idle" && (
              <>
                <FaPaperPlane /> Send Message
              </>
            )}
            {status === "sending" && "Sending..."}
            {status === "success" && "Message Sent!"}
          </button>
        </form>

        <div className="flex justify-center items-center gap-4 text-zinc-500 text-sm">
          <FaEnvelope /> support@intelecture.com
        </div>
      </div>
    </div>
  );
}
