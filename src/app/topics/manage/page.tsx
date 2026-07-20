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
    <div className="container mx-auto p-6 text-zinc-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Topics</h1>
        <Link
          href="/topics/add"
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm"
        >
          + Add Topic
        </Link>
      </div>

      {topics.length === 0 ? (
        <p className="text-zinc-500 text-sm">
          No topics yet. Create your first one.
        </p>
      ) : (
        <div className="border border-zinc-800 rounded-xl overflow-hidden">
          {topics.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center p-4 border-b border-zinc-800 last:border-0"
            >
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-zinc-500">
                  {t.conceptCount} concepts · {t.masteredCount} mastered
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/topics/${t._id}`}
                  className="text-xs border border-zinc-700 px-3 py-1.5 rounded-lg"
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
