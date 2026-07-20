"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Concept, Note } from "@/types"; //[cite: 3]
import { createNote } from "@/lib/api/notes";
import { FaBrain, FaPlus, FaPen, FaTrashCan, FaXmark } from "react-icons/fa6";

interface ConceptDetailClientProps {
  concept: Concept;
  initialNotes: Note[];
}

export default function ConceptDetailClient({
  concept,
  initialNotes,
}: ConceptDetailClientProps) {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // স্ট্যাটাস অনুযায়ী ব্যাজের কালার নির্ধারণ
  const getStatusBadge = (status: Concept["status"]) => {
    switch (status) {
      case "mastered":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#FFCF00]/10 text-[#FFCF00] border border-[#FFCF00]/30">
            Mastered
          </span>
        );
      case "learning":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#00E0BA]/10 text-[#00E0BA] border border-[#00E0BA]/30">
            Learning
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-zinc-700 text-zinc-300">
            Not Started
          </span>
        );
    }
  };

  // ইনলাইন নোট সাবমিট হ্যান্ডলার
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await createNote({
        conceptId: concept._id,
        title,
        content,
      });

      // 🌟 'any' এর বদলে টাইপ-সেফ অবজেক্ট স্ট্রাকচারে কাস্ট করা হলো
      const newNote = (response as unknown as { data?: Note }).data || response;
      setNotes([newNote, ...notes]);

      // ফর্ম রিসেট
      setTitle("");
      setContent("");
      setIsFormOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* --- Concept Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {concept.name}
            </h1>
            {getStatusBadge(concept.status)}
          </div>
          <p className="text-sm text-zinc-400">
            Difficulty Level:{" "}
            <span className="font-semibold text-[#00E0BA]">
              {concept.difficulty}/5
            </span>
          </p>
        </div>

        {/* 🧠 Ask AI Button Placeholder */}
        <button
          disabled
          className="flex items-center justify-center gap-2 bg-[#91008D] opacity-75 cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-[#91008D]/20"
        >
          <FaBrain className="animate-pulse text-lg" /> Ask AI Tutor
        </button>
      </div>

      {/* --- Description Section --- */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <h2 className="text-lg font-semibold text-zinc-200 mb-3">
          Concept Overview
        </h2>
        <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
          {concept.description}
        </p>
      </div>

      {/* --- Notes Section --- */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">My Study Notes</h2>
          {!isFormOpen && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-[#00E0BA] hover:bg-[#00e0ba]/90 text-zinc-950 px-4 py-2 rounded-xl font-semibold transition"
            >
              <FaPlus /> Add Note
            </button>
          )}
        </div>

        {/* --- Inline Add Note Form --- */}
        {isFormOpen && (
          <form
            onSubmit={handleAddNote}
            className="p-6 bg-zinc-900 border border-[#00E0BA]/30 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <h3 className="font-semibold text-[#00E0BA]">Create New Note</h3>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <FaXmark size={18} />
              </button>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">
                Note Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Summary of core formulas..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#00E0BA] transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">
                Content
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your study notes here..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#00E0BA] transition resize-none"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#00E0BA] hover:bg-[#00e0ba]/90 text-zinc-950 font-semibold px-5 py-2 rounded-xl transition disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Note"}
              </button>
            </div>
          </form>
        )}

        {/* --- Notes List --- */}
        {notes.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500">
              No notes added for this concept yet. Click &quot;Add Note&quot; to
              start.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-zinc-700 transition"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-white text-lg">
                      {note.title}
                    </h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700 capitalize">
                      {note.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                    {note.content}
                  </p>
                </div>

                {/* Actions Buttons */}
                <div className="flex gap-2 self-end sm:self-start">
                  <button className="p-2 text-zinc-400 hover:text-[#00E0BA] bg-zinc-950 border border-zinc-800 rounded-xl transition">
                    <FaPen size={14} />
                  </button>
                  <button className="p-2 text-zinc-400 hover:text-[#FF3483] bg-zinc-950 border border-zinc-800 rounded-xl transition">
                    <FaTrashCan size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
