export const dynamic = "force-dynamic";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";
import { getMyTopics } from "@/lib/api/topics";
import { getRecommendations } from "@/lib/api/recommendations";
import { redirect } from "next/navigation";
import { getConceptsByTopic } from "@/lib/api/concepts";
import ProgressChart from "../../components/dashboard/ProgressChart";

export default async function DashboardPage() {
  const session = await getUserSession();
  if (!session?.user) redirect("/signin?redirect=/dashboard");

  const [topicsData, recData] = await Promise.all([
    getMyTopics().catch(() => ({ items: [], total: 0 })),
    getRecommendations().catch(() => ({ items: [], total: 0 })),
  ]);

  const topics = topicsData.items;

  const allConcepts = (
    await Promise.all(
      topics.map((t) => getConceptsByTopic(t._id).catch(() => ({ items: [] }))),
    )
  ).flatMap((r) => r.items);

  const chartData = [
    {
      name: "Mastered",
      value: allConcepts.filter((c) => c.status === "mastered").length,
    },
    {
      name: "Learning",
      value: allConcepts.filter((c) => c.status === "learning").length,
    },
    {
      name: "Not Started",
      value: allConcepts.filter((c) => c.status === "not_started").length,
    },
  ];
  const totalConcepts = topics.reduce((s, t) => s + (t.conceptCount || 0), 0);
  const totalMastered = topics.reduce((s, t) => s + (t.masteredCount || 0), 0);

  return (
    <div className="container mx-auto p-6 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Welcome Header */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
        Welcome back, {session.user.name}
      </h1>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white/80 dark:bg-zinc-900/40 shadow-sm transition-colors">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Topics
          </p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            {topics.length}
          </p>
        </div>
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white/80 dark:bg-zinc-900/40 shadow-sm transition-colors">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Total Concepts
          </p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            {totalConcepts}
          </p>
        </div>
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white/80 dark:bg-zinc-900/40 shadow-sm transition-colors">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Mastered
          </p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {totalMastered}
          </p>
        </div>
      </div>

      {/* AI Tutor Banner Callout */}
      <Link
        href="/chat"
        className="flex items-center justify-between border border-purple-200 dark:border-purple-500/30 bg-purple-50/60 dark:bg-purple-500/10 rounded-xl p-5 mb-8 hover:bg-purple-100/60 dark:hover:bg-purple-500/20 transition-all shadow-sm group"
      >
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
            🧠 Talk to your AI Tutor
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
            Ask questions about any concept you are learning
          </p>
        </div>
        <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
          Open Chat →
        </span>
      </Link>

      {/* Progress Chart Container */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white/80 dark:bg-zinc-900/40 shadow-sm transition-colors mb-10">
        <h2 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
          Progress Overview
        </h2>
        <ProgressChart data={chartData} />
      </div>

      {/* AI Recommendations Header */}
      <div className="flex justify-between items-center mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          🧠 AI Recommendations
        </h2>
        <div className="flex gap-2.5">
          <Link
            href="/topics/add"
            className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium px-3.5 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            + Add Topic
          </Link>
          <Link
            href="/topics/manage"
            className="text-xs border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-zinc-800 dark:text-zinc-200 hover:text-white dark:hover:text-white px-3.5 py-1.5 rounded-lg transition-colors font-medium"
          >
            Manage Topics
          </Link>
        </div>
      </div>

      {/* Recommendations Cards or Empty State */}
      {recData.items.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400 text-sm border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl p-8 text-center bg-zinc-50/50 dark:bg-zinc-900/10 transition-colors">
          Add a topic and a few concepts to unlock AI recommendations.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recData.items.map((r) => (
            <div
              key={r.conceptId}
              className="border border-purple-200 dark:border-purple-500/30 bg-purple-50/40 dark:bg-purple-500/5 rounded-xl p-5 shadow-sm transition-colors flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                  {r.topicName}
                </p>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  {r.conceptName}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                  {r.reason}
                </p>
              </div>
              <Link
                href={`/concepts/${r.conceptId}`}
                className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium px-3.5 py-2 rounded-lg inline-block text-center transition-colors shadow-sm"
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
