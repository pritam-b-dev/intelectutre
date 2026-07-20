"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNote } from "@/lib/api/notes";
import { Note } from "@/types";
import { FaCheckDouble } from "react-icons/fa6";

interface EditNoteFormClientProps {
  note: Note;
}

export default function EditNoteFormClient({ note }: EditNoteFormClientProps) {
  const router = useRouter();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [status, setStatus] = useState<Note["status"]>(note.status);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuickActionLoading, setIsQuickActionLoading] = useState(false);

  // সাধারণ ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Note title cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateNote(note._id, {
        title: title.trim(),
        content: content.trim(),
        status,
      });

      router.push(`/concepts/${note.conceptId}`);
      router.refresh();
    } catch (err) {
      console.error("Failed to update note:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🌟 "Mark as Mastered" কুইক অ্যাকশন হ্যান্ডলার
  const handleMarkAsMastered = async () => {
    setError("");
    setIsQuickActionLoading(true);
    try {
      await updateNote(note._id, {
        status: "mastered",
      });

      router.push(`/concepts/${note.conceptId}`);
      router.refresh();
    } catch (err) {
      console.error("Quick action failed:", err);
      setError("Failed to update status. Please try again.");
      setIsQuickActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Action Banner */}
      {status !== "mastered" && (
        <div className="p-4 bg-[#FFCF00]/5 border border-[#FFCF00]/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#FFCF00] text-center sm:text-left font-medium">
            Finished reviewing this note? You can quickly mark it as mastered.
          </p>
          <button
            type="button"
            disabled={isQuickActionLoading || isSubmitting}
            onClick={handleMarkAsMastered}
            className="flex items-center gap-2 bg-[#FFCF00]/10 hover:bg-[#FFCF00]/20 text-[#FFCF00] border border-[#FFCF00]/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap disabled:opacity-50"
          >
            <FaCheckDouble />{" "}
            {isQuickActionLoading ? "Updating..." : "Mark as Mastered"}
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="text-sm font-medium text-zinc-300 block"
          >
            Note Title <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E0BA] transition"
          />
        </div>

        {/* Status Dropdown */}
        <div className="space-y-2">
          <label
            htmlFor="status"
            className="text-sm font-medium text-zinc-300 block"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Note["status"])}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E0BA] transition appearance-none cursor-pointer"
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
            className="text-sm font-medium text-zinc-300 block"
          >
            Content / Study Notes
          </label>
          <textarea
            id="content"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E0BA] transition resize-none font-sans"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-2 border-t border-zinc-800">
          <button
            type="button"
            onClick={() => router.push(`/concepts/${note.conceptId}`)}
            className="px-5 py-2.5 rounded-xl text-zinc-400 hover:text-white transition font-medium text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isQuickActionLoading}
            className="bg-[#00E0BA] hover:bg-[#00e0ba]/90 text-zinc-950 font-semibold px-6 py-2.5 rounded-xl transition disabled:opacity-50 text-sm shadow-lg shadow-[#00E0BA]/10"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
