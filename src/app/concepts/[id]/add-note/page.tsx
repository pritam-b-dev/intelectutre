import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import AddNoteFormClient from "./AddNoteFormClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AddNotePage({ params }: PageProps) {
  // Next.js 15 অনুযায়ী params প্রমিস রেজলভ করা হলো
  const resolvedParams = await params;
  const conceptId = resolvedParams.id;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Back Button */}
      <Link
        href={`/concepts/${conceptId}`}
        className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors group text-sm font-medium"
      >
        <FaChevronLeft className="group-hover:-translate-x-0.5 transition-transform duration-200 text-xs" />
        Back to Concept
      </Link>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Add Study Note
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          Capture your thoughts, formulas, or summaries for this concept.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors">
        <AddNoteFormClient conceptId={conceptId} />
      </div>
    </div>
  );
}
