"use client";

import React, { useState } from "react";
import {
  FaEnvelope,
  FaPaperPlane,
  FaCheck,
  FaCircleNotch,
} from "react-icons/fa6";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // সিমুলেশন
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-20 px-6 transition-colors">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
            Have questions about Intelecture or want to partner with us? We
            would love to hear from you.
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900/60 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm transition-colors"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl p-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-purple-500 outline-none transition text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                placeholder="john@example.com"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl p-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-purple-500 outline-none transition text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="How can we help you?"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl p-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-purple-500 outline-none transition resize-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed text-sm ${
              status === "success"
                ? "bg-emerald-600 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {status === "idle" && (
              <>
                <FaPaperPlane size={14} /> Send Message
              </>
            )}
            {status === "sending" && (
              <>
                <FaCircleNotch className="animate-spin text-white" size={14} />
                Sending...
              </>
            )}
            {status === "success" && (
              <>
                <FaCheck size={14} /> Message Sent!
              </>
            )}
          </button>
        </form>

        {/* Support Email */}
        <div className="flex justify-center items-center gap-2.5 text-zinc-600 dark:text-zinc-400 text-sm font-medium">
          <FaEnvelope className="text-purple-600 dark:text-purple-400" />
          <a
            href="mailto:support@intelecture.com"
            className="hover:underline transition-all"
          >
            support@intelecture.com
          </a>
        </div>
      </div>
    </div>
  );
}
