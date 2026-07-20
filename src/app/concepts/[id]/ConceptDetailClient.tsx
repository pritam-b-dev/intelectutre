"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Concept, Note } from "@/types";
import { createNote } from "@/lib/api/notes";
import { FaBrain, FaPlus, FaPen, FaTrashCan, FaXmark } from "react-icons/fa6";
import AIChatSidebar from "../../../components/ai/AIChatSidebar";

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

  // State for AI Sidebar visibility
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  const getStatusBadge = (status: Concept["status"]) => {
    switch (status) {
      case "mastered":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30">
            Mastered
          </span>
        );
      case "learning":
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30">
            Learning
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-zinc-100 text-zinc-700 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700">
            Not Started
          </span>
        );
    }
  };

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

      const newNote =
        (response as unknown as { data?: Note }).data || (response as Note);
      setNotes([newNote, ...notes]);

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
    <div className="space-y-8 text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm transition-colors">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {concept.name}
            </h1>
            {getStatusBadge(concept.status)}
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Difficulty Level:{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {concept.difficulty}/5
            </span>
          </p>
        </div>

        {/* 🧠 Ask AI Button */}
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md shadow-purple-600/20 active:scale-95 text-sm"
        >
          <FaBrain className="animate-pulse text-base" /> Ask AI Tutor
        </button>
      </div>

      {/* Concept Description */}
      <div className="p-6 bg-white/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm transition-colors">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          Concept Overview
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {concept.description}
        </p>
      </div>

      {/* Notes Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            My Study Notes
          </h2>
          {!isFormOpen && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              <FaPlus className="text-xs" /> Add Note
            </button>
          )}
        </div>

        {/* New Note Form */}
        {isFormOpen && (
          <form
            onSubmit={handleAddNote}
            className="p-6 bg-white/90 dark:bg-zinc-900/60 border border-purple-200 dark:border-purple-500/30 rounded-2xl space-y-4 shadow-sm transition-colors animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <h3 className="font-semibold text-purple-700 dark:text-purple-400 text-sm">
                Create New Note
              </h3>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
              >
                <FaXmark size={18} />
              </button>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-700 dark:text-zinc-400 font-medium">
                Note Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Summary of core formulas..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500 transition text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-700 dark:text-zinc-400 font-medium">
                Content
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your study notes here..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500 transition resize-none text-sm"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-5 py-2 rounded-xl transition-colors disabled:opacity-50 shadow-sm"
              >
                {isSubmitting ? "Saving..." : "Save Note"}
              </button>
            </div>
          </form>
        )}

        {/* Note List / Empty State */}
        {notes.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 transition-colors">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              No notes added for this concept yet. Click &quot;Add Note&quot; to
              start.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="p-5 bg-white/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm transition-all"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base sm:text-lg">
                      {note.title}
                    </h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 capitalize font-medium">
                      {note.status?.replace("_", " ") || "Note"}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                    {note.content}
                  </p>
                </div>

                <div className="flex gap-2 self-end sm:self-start">
                  <button
                    className="p-2 text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors"
                    title="Edit Note"
                  >
                    <FaPen size={14} />
                  </button>
                  <button
                    className="p-2 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors"
                    title="Delete Note"
                  >
                    <FaTrashCan size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Integrated AI Chat Drawer */}
      <AIChatSidebar
        conceptId={concept._id}
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onOpen={() => setIsAiChatOpen(true)}
      />
    </div>
  );
}
