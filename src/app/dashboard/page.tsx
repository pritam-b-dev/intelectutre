import Link from "next/link";
import { getUserSession } from "@/lib/core/session";
import { getMyTopics } from "@/lib/api/topics";
import { getRecommendations } from "@/lib/api/recommendations";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getUserSession();
  if (!session?.user) redirect("/signin?redirect=/dashboard");

  const [topicsData, recData] = await Promise.all([
    getMyTopics().catch(() => ({ items: [], total: 0 })),
    getRecommendations().catch(() => ({ items: [], total: 0 })),
  ]);

  const topics = topicsData.items;
  const totalConcepts = topics.reduce((s, t) => s + (t.conceptCount || 0), 0);
  const totalMastered = topics.reduce((s, t) => s + (t.masteredCount || 0), 0);

  return (
    <div className="container mx-auto p-6 text-zinc-100">
      <h1 className="text-2xl font-bold mb-6">
        Welcome back, {session.user.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/40">
          <p className="text-xs text-zinc-500">Topics</p>
          <p className="text-2xl font-bold">{topics.length}</p>
        </div>
        <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/40">
          <p className="text-xs text-zinc-500">Total Concepts</p>
          <p className="text-2xl font-bold">{totalConcepts}</p>
        </div>
        <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900/40">
          <p className="text-xs text-zinc-500">Mastered</p>
          <p className="text-2xl font-bold text-purple-400">{totalMastered}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          🧠 AI Recommendations
        </h2>
        <div className="flex gap-3">
          <Link
            href="/topics/add"
            className="text-xs bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-lg"
          >
            + Add Topic
          </Link>
          <Link
            href="/topics/manage"
            className="text-xs border border-zinc-700 px-3 py-1.5 rounded-lg"
          >
            Manage Topics
          </Link>
        </div>
      </div>

      {recData.items.length === 0 ? (
        <p className="text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl p-6 text-center">
          Add a topic and a few concepts to unlock AI recommendations.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recData.items.map((r) => (
            <div
              key={r.conceptId}
              className="border border-purple-500/30 bg-purple-500/5 rounded-xl p-4"
            >
              <p className="text-xs text-purple-400 mb-1">{r.topicName}</p>
              <h3 className="font-semibold mb-1">{r.conceptName}</h3>
              <p className="text-xs text-zinc-400 mb-3">{r.reason}</p>
              <Link
                href={`/concepts/${r.conceptId}`}
                className="text-xs bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-lg inline-block"
              >
                Start Learning
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
