import Link from "next/link";
import { notFound } from "next/navigation";
import { getTopic } from "@/lib/api/topics";
import { getConceptsByTopic } from "@/lib/api/concepts";

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const topic = await getTopic(id).catch(() => null);
  if (!topic) notFound();

  const { items: concepts } = await getConceptsByTopic(id).catch(() => ({
    items: [],
    total: 0,
  }));

  return (
    <div className="container mx-auto p-6 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Header Badge & Title */}
      <div className="mb-6">
        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
          {topic.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold mt-1 mb-2 text-zinc-900 dark:text-zinc-100">
          {topic.name}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-3xl">
          {topic.description}
        </p>
      </div>

      {/* Concepts Section Bar */}
      <div className="flex justify-between items-center mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Concepts ({concepts.length})
        </h2>
        <Link
          href={`/topics/${id}/add-concept`}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-3.5 py-2 rounded-lg text-xs transition-colors shadow-sm"
        >
          + Add Concept
        </Link>
      </div>

      {/* Concept Grid or Empty State */}
      {concepts.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400 text-sm border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl p-8 text-center bg-zinc-50/50 dark:bg-zinc-900/10 transition-colors">
          No concepts yet — add the first one to start learning!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {concepts.map((c) => (
            <Link
              key={c._id}
              href={`/concepts/${c._id}`}
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-white/80 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                  {c.name}
                </span>
                <span
                  className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full capitalize ${
                    c.status === "mastered"
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"
                      : c.status === "learning"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Difficulty:{" "}
                <span className="font-medium">{c.difficulty}/5</span>
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
