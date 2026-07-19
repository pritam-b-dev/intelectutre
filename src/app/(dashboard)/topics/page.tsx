import { getMyTopics } from "@/lib/api/topics";
import { Topic } from "@/types"; // আপনার প্রজেক্টের মেইন টাইপ ইমপোর্ট করুন
import Link from "next/link";
import { FaEye, FaPen, FaTrashCan, FaPlus } from "react-icons/fa6";

interface ConceptItem {
  status: "mastered" | "learning" | "not_started";
}

interface TopicWithDetails extends Topic {
  id: string;
  concepts?: ConceptItem[];
}

export default async function ManageTopicsPage() {
  const { items: topics } = await getMyTopics();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Learning Topics</h1>
        <Link
          href="/topics/create"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <FaPlus /> New Topic
        </Link>
      </div>

      {topics.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500">
            You haven&apos;t created any topics yet.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Topic Name
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Concepts
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Progress
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* ৩. এখানে unknown কাস্টিং ব্যবহার করেছি যা safe এবং lint error দেয় না */}
              {topics.map((topic: unknown) => {
                const item = topic as TopicWithDetails;
                const total = item.concepts?.length || 0;
                const mastered =
                  item.concepts?.filter(
                    (c: ConceptItem) => c.status === "mastered",
                  ).length || 0;
                const progress =
                  total > 0 ? Math.round((mastered / total) * 100) : 0;

                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {total} concepts
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-3">
                      <Link
                        href={`/topics/${item.id}`}
                        className="text-gray-500 hover:text-indigo-600 transition"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/topics/${item.id}/edit`}
                        className="text-gray-500 hover:text-amber-600 transition"
                      >
                        <FaPen />
                      </Link>
                      <button className="text-gray-500 hover:text-red-600 transition">
                        <FaTrashCan />
                      </button>
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
