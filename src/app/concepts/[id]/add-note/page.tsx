import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import AddNoteFormClient from "./AddNoteFormClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AddNotePage({ params }: PageProps) {
  // Next.js 15 অনুযায়ী params প্রমিস রেজলভ করা হলো
  const resolvedParams = await params;
  const conceptId = resolvedParams.id;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href={`/concepts/${conceptId}`}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition group text-sm"
      >
        <FaChevronLeft className="group-hover:-translate-x-0.5 transition" />{" "}
        Back to Concept
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Add Study Note
        </h1>
        <p className="text-zinc-400 mt-1 text-sm">
          Capture your thoughts, formulas, or summaries for this concept.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <AddNoteFormClient conceptId={conceptId} />
      </div>
    </div>
  );
}
