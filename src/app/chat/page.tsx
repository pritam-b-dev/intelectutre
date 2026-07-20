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
    <div className="container mx-auto p-6 text-zinc-100">
      <h1 className="text-2xl font-bold mb-2">🧠 AI Tutor</h1>
      <p className="text-zinc-400 text-sm mb-6">
        Pick a topic, then a concept inside it, to start a context-aware chat.
      </p>

      {topics.length === 0 ? (
        <p className="text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl p-6 text-center">
          You have no topics yet.{" "}
          <Link href="/topics/add" className="text-purple-400 underline">
            Add one first
          </Link>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topics.map((t) => (
            <Link
              key={t._id}
              href={`/topics/${t._id}`}
              className="border border-purple-500/30 bg-purple-500/5 rounded-xl p-4 hover:bg-purple-500/10"
            >
              <p className="font-medium">{t.name}</p>
              <p className="text-xs text-zinc-500">
                {t.conceptCount} concepts — open to choose one and chat
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
