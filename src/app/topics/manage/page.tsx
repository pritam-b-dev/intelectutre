export const dynamic = "force-dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getMyTopics } from "@/lib/api/topics";

export default async function ManageTopicsPage() {
  const session = await getUserSession();
  if (!session?.user) redirect("/signin?redirect=/topics/manage");

  const { items: topics } = await getMyTopics().catch(() => ({
    items: [],
    total: 0,
  }));

  return (
    <div className="container mx-auto p-6 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            My Topics
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
            Manage and track all your created learning topics
          </p>
        </div>
        <Link
          href="/topics/add"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
        >
          + Add Topic
        </Link>
      </div>

      {/* Content Section */}
      {topics.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/10 transition-colors">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            No topics yet. Create your first one to get started!
          </p>
        </div>
      ) : (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white/80 dark:bg-zinc-900/40 shadow-sm dark:shadow-xl transition-colors">
          {topics.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
            >
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {t.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {t.conceptCount} concepts · {t.masteredCount} mastered
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/topics/${t._id}`}
                  className="text-xs border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-zinc-800 dark:text-zinc-200 hover:text-white dark:hover:text-white px-3.5 py-1.5 rounded-lg transition-colors font-medium"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
