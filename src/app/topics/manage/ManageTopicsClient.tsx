"use client";

import { useState } from "react";
import Link from "next/link";
import { Topic } from "@/types";
import { deleteTopic } from "@/lib/api/topics";

export default function ManageTopicsClient({
  initialTopics,
}: {
  initialTopics: Topic[];
}) {
  const [topics, setTopics] = useState(initialTopics);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const prev = topics;
    setTopics((t) => t.filter((x) => x._id !== id));
    setConfirmId(null);
    try {
      await deleteTopic(id);
    } catch {
      setTopics(prev);
      alert("Failed to delete topic");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen text-zinc-900 dark:text-zinc-100">
      <div className="flex justify-between items-center mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold">My Topics</h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
            Manage and track all your created learning topics
          </p>
        </div>
        <Link
          href="/topics/add"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg text-sm"
        >
          + Add Topic
        </Link>
      </div>

      {topics.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            No topics yet. Create your first one to get started!
          </p>
        </div>
      ) : (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white/80 dark:bg-zinc-900/40">
          {topics.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
            >
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {t.conceptCount} concepts · {t.masteredCount} mastered
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Link
                  href={`/topics/${t._id}`}
                  className="text-xs border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-zinc-800 dark:text-zinc-200 hover:text-white px-3.5 py-1.5 rounded-lg font-medium"
                >
                  View
                </Link>
                {confirmId === t._id ? (
                  <>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-medium"
                    >
                      Confirm?
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="text-xs border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 rounded-lg"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmId(t._id)}
                    className="text-xs border border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 px-3.5 py-1.5 rounded-lg font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
