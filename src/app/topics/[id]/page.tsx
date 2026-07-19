import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaPlus,
  FaPen,
  FaTrashCan,
  FaBookOpen,
  FaCircleCheck,
} from "react-icons/fa6";
import { getTopic } from "@/lib/api/topics";
import { headers } from "next/headers";

interface Concept {
  id: string;
  name: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  status: "mastered" | "learning" | "not_started";
}

interface TopicWithConcepts {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  concepts: Concept[];
  createdAt?: string;
}

interface UserSession {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getUserSession(): Promise<UserSession | null> {
  const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie") || "";

  try {
    const res = await fetch(`${SERVER_URL}/api/auth/get-session`, {
      cache: "no-store",
      headers: { Cookie: cookieHeader },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function TopicDetailPage({ params }: PageProps) {
  const { id } = await params;

  const [topic, session] = await Promise.all([getTopic(id), getUserSession()]);

  if (!topic) {
    notFound();
  }

  const topicData = topic as unknown as TopicWithConcepts;

  const isOwner = session?.user?.id === topicData.ownerId;
  const concepts = topicData.concepts || [];
  const totalConcepts = concepts.length;
  const masteredConcepts = concepts.filter(
    (c: Concept) => c.status === "mastered",
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href="/topics"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition gap-2"
      >
        <FaArrowLeft className="text-xs" /> Back to Topics
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {topicData.name}
            </h1>
            <p className="text-gray-600 max-w-3xl mb-6">
              {topicData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 gap-2">
                <FaBookOpen className="text-indigo-500 text-sm" />
                <span className="text-sm font-medium text-gray-700">
                  {totalConcepts} {totalConcepts === 1 ? "Concept" : "Concepts"}
                </span>
              </div>
              <div className="flex items-center bg-yellow-50/50 px-4 py-2 rounded-lg border border-yellow-100 gap-2">
                <FaCircleCheck className="text-amber-500 text-sm" />
                <span className="text-sm font-medium text-amber-800">
                  {masteredConcepts} Mastered
                </span>
              </div>
            </div>
          </div>
          {isOwner && (
            <div className="flex gap-2 shrink-0">
              <Link
                href={`/topics/${id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm gap-2"
              >
                <FaPen className="text-xs" /> Edit
              </Link>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition shadow-sm gap-2">
                <FaTrashCan className="text-xs" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Core Concepts</h2>
        {session && (
          <Link
            href={`/topics/${id}/add-concept`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm gap-1.5"
          >
            <FaPlus className="text-xs" /> Add Concept
          </Link>
        )}
      </div>

      {concepts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No concepts added to this topic yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {concepts.map((concept) => {
            let badgeStyle = "bg-gray-100 text-gray-800 border-gray-200";
            let statusLabel = "Not Started";
            if (concept.status === "mastered") {
              badgeStyle =
                "bg-amber-100 text-amber-800 border-amber-200 font-semibold";
              statusLabel = "Mastered";
            } else if (concept.status === "learning") {
              badgeStyle = "bg-teal-100 text-teal-800 border-teal-200";
              statusLabel = "Learning";
            }

            return (
              <div
                key={concept.id}
                className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {concept.name}
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-gray-50 text-gray-500 rounded border border-gray-100 capitalize shrink-0">
                      {concept.difficulty}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full border ${badgeStyle}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${concept.status === "mastered" ? "bg-amber-500" : concept.status === "learning" ? "bg-teal-500" : "bg-gray-400"}`}
                    />
                    {statusLabel}
                  </span>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-50">
                  <Link
                    href={`/concepts/${concept.id}`}
                    className="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
