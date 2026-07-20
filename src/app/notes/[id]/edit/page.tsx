import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { getNote } from "@/lib/api/notes";
import { Note } from "@/types";
import EditNoteFormClient from "./EditNoteFormClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNotePage({ params }: PageProps) {
  const resolvedParams = await params;
  const noteId = resolvedParams.id;

  // নোটের ডাটা ব্যাকএন্ড থেকে ফেচ করা
  const noteResponse = await getNote(noteId);

  // সেফটি চেক ও ডাটা এক্সট্র্যাক্ট (ESLint `any` রুল ফ্রেন্ডলি)
  const note =
    (noteResponse as unknown as { data?: Note }).data || noteResponse;

  if (!note) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-red-400">Note not found or has been deleted.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href={`/concepts/${note.conceptId}`}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition group text-sm"
      >
        <FaChevronLeft className="group-hover:-translate-x-0.5 transition" />{" "}
        Back to Concept
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Edit Study Note
        </h1>
        <p className="text-zinc-400 mt-1 text-sm">
          Update your thoughts or change the status of this note.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <EditNoteFormClient note={note} />
      </div>
    </div>
  );
}
