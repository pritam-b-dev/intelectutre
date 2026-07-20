export const dynamic = "force-dynamic";

import { getMyTopics } from "@/lib/api/topics";
import { Topic } from "@/types";
import Link from "next/link";
import { FaEye, FaPen, FaTrashCan, FaPlus } from "react-icons/fa6";

interface TopicWithDetails extends Topic {
  id?: string;
  concepts?: { status: "mastered" | "learning" | "not_started" }[];
}

export default async function ManageTopicsPage() {
  const { items: topics = [] } = await getMyTopics().catch(() => ({
    items: [],
    total: 0,
  }));

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            My Learning Topics
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Manage, edit, and track your topic progress
          </p>
        </div>
        <Link
          href="/topics/add"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <FaPlus className="text-xs" /> New Topic
        </Link>
      </div>

      {/* Topics Content / Table */}
      {topics.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/10 transition-colors">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            You haven&apos;t created any topics yet.
          </p>
        </div>
      ) : (
        <div className="bg-white/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-x-auto shadow-sm transition-colors">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Topic Name
                </th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Concepts
                </th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Progress
                </th>
                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {topics.map((topic: Topic) => {
                const item = topic as TopicWithDetails;
                const topicId = item._id || item.id || "";
                const total = item.concepts?.length || item.conceptCount || 0;
                const mastered =
                  item.concepts?.filter((c) => c.status === "mastered")
                    .length ||
                  item.masteredCount ||
                  0;
                const progress =
                  total > 0 ? Math.round((mastered / total) * 100) : 0;

                return (
                  <tr
                    key={topicId}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-sm text-zinc-900 dark:text-zinc-100">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {total} concepts
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 max-w-xs">
                        <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 w-10 text-right">
                          {progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-3">
                        <Link
                          href={`/topics/${topicId}`}
                          className="text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1"
                          title="View Topic"
                        >
                          <FaEye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/topics/${topicId}/edit`}
                          className="text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors p-1"
                          title="Edit Topic"
                        >
                          <FaPen className="w-4 h-4" />
                        </Link>
                        <button
                          className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1"
                          title="Delete Topic"
                        >
                          <FaTrashCan className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
