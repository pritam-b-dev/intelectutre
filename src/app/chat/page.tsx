export const dynamic = "force-dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getMyTopics } from "@/lib/api/topics";

export default async function ChatHubPage() {
  const session = await getUserSession();
  if (!session?.user) redirect("/signin?redirect=/chat");

  const { items: topics } = await getMyTopics().catch(() => ({
    items: [],
    total: 0,
  }));

  return (
    <div className="container mx-auto p-6 text-zinc-900 dark:text-zinc-100 transition-colors space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 text-zinc-900 dark:text-zinc-100">
          🧠 AI Tutor
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          Pick a topic, then a concept inside it, to start a context-aware chat.
        </p>
      </div>

      {topics.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl text-center transition-colors">
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            You have no topics yet.{" "}
            <Link
              href="/topics/add"
              className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
            >
              Add one first
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((t) => (
            <Link
              key={t._id}
              href={`/topics/${t._id}`}
              className="border border-purple-200 dark:border-purple-500/30 bg-purple-50/60 dark:bg-purple-500/5 rounded-2xl p-5 hover:bg-purple-100/70 dark:hover:bg-purple-500/10 transition-all shadow-sm hover:shadow group"
            >
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                {t.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {t.conceptCount} concepts — open to choose one and chat
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
