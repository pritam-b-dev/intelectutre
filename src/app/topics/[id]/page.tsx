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
    <div className="container mx-auto p-6 text-zinc-100">
      <span className="text-xs text-purple-400 uppercase">
        {topic.category}
      </span>
      <h1 className="text-2xl font-bold mb-2">{topic.name}</h1>
      <p className="text-zinc-400 mb-6">{topic.description}</p>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Concepts ({concepts.length})</h2>
        <Link
          href={`/topics/${id}/add-concept`}
          className="bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-lg text-xs"
        >
          + Add Concept
        </Link>
      </div>

      {concepts.length === 0 ? (
        <p className="text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl p-6 text-center">
          No concepts yet — add the first one.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {concepts.map((c) => (
            <Link
              key={c._id}
              href={`/concepts/${c._id}`}
              className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/40 hover:bg-zinc-900/70"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm">{c.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    c.status === "mastered"
                      ? "bg-purple-500/20 text-purple-400"
                      : c.status === "learning"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-zinc-700/50 text-zinc-400"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Difficulty: {c.difficulty}/5
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
