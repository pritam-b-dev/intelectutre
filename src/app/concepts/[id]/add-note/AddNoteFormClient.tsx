"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/notes";
import { Note } from "@/types";

interface AddNoteFormClientProps {
  conceptId: string;
}

export default function AddNoteFormClient({
  conceptId,
}: AddNoteFormClientProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<Note["status"]>("learning");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation: Title non-empty
    if (!title.trim()) {
      setError("Note title is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createNote({
        conceptId,
        title: title.trim(),
        content: content.trim(),
        status,
      });

      // সফলভাবে তৈরি হলে কনসেপ্ট ডিটেইলস পেজে রিডাইরেক্ট ও রিফ্রেশ
      router.push(`/concepts/${conceptId}`);
      router.refresh();
    } catch (err) {
      console.error("Failed to create note:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm rounded-xl transition-colors">
          {error}
        </div>
      )}

      {/* Title Field */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block"
        >
          Note Title <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Key takeaways and architecture diagram"
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition text-sm"
        />
      </div>

      {/* Status Dropdown */}
      <div className="space-y-2">
        <label
          htmlFor="status"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block"
        >
          Current Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Note["status"])}
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 transition cursor-pointer text-sm"
        >
          <option value="not_started">Not Started</option>
          <option value="learning">Learning</option>
          <option value="mastered">Mastered</option>
        </select>
      </div>

      {/* Content Field */}
      <div className="space-y-2">
        <label
          htmlFor="content"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block"
        >
          Content / Study Notes
        </label>
        <textarea
          id="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your detailed notes, code snippets, or explanations here..."
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition resize-none font-sans text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => router.push(`/concepts/${conceptId}`)}
          className="px-5 py-2.5 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors font-medium text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all disabled:opacity-50 text-sm shadow-sm active:scale-95"
        >
          {isSubmitting ? "Creating..." : "Save Note"}
        </button>
      </div>
    </form>
  );
}
