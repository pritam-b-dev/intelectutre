import Link from "next/link";
import {
  FaBookOpen,
  FaGraduationCap,
  FaClock,
  FaChevronRight,
} from "react-icons/fa6";
import { getMyTopics } from "@/lib/api/topics";
import { Recommendation, Topic } from "@/types";

// ১. আপনার types/index.ts ফাইলের সাথে ১০০% ম্যাচ করা মক রেকমেন্ডেশন ডাটা
const fakeRecommendations: Recommendation[] = [
  {
    conceptId: "concept_async_javascript",
    conceptName: "Asynchronous JS & Event Loop",
    topicId: "topic_js_advanced",
    topicName: "Advanced JavaScript",
    reason:
      "You recently reviewed Promises. Mastering the Event Loop will unify your core runtime understanding.",
    priority: 3, // 3 = High Priority
    difficulty: 4,
    aiGenerated: true,
  },
  {
    conceptId: "concept_mongodb_indexing",
    conceptName: "MongoDB Indexing Strategies",
    topicId: "topic_mongodb",
    topicName: "MongoDB Developer Guide",
    reason:
      "Based on your active backend setup, query performance can be optimized up to 10x using compound indexes.",
    priority: 2, // 2 = Medium Priority
    difficulty: 3,
    aiGenerated: true,
  },
];

export default async function DashboardPage() {
  let topics: Topic[] = [];

  try {
    const response = await getMyTopics();

    // এপিআই রেসপন্স টাইপ সেফলি চেক করা (ListResponse ফরম্যাট অথবা ডিরেক্ট অ্যারে)
    if (response) {
      if (Array.isArray(response)) {
        topics = response as Topic[];
      } else if (typeof response === "object" && "items" in response) {
        topics = (response as { items: Topic[] }).items || [];
      }
    }
  } catch (error) {
    console.error("Failed to fetch topics for dashboard stats:", error);
  }

  // ২. আপনার টপিক ইন্টারফেসের প্রোপার্টি ব্যবহার করে স্ট্যাটাস ক্যালকুলেশন
  const topicsStarted = topics.length;

  // সরাসরি topic.masteredCount যোগ করা হচ্ছে, কোনো nested লুপের প্রয়োজন নেই
  const conceptsMastered = topics.reduce(
    (acc, topic) => acc + (topic.masteredCount || 0),
    0,
  );

  let lastStudiedDate = "No activity yet";
  if (topics.length > 0) {
    const latestTopic = [...topics].sort(
      (a, b) =>
        new Date(b.updatedAt || 0).getTime() -
        new Date(a.updatedAt || 0).getTime(),
    )[0];

    if (latestTopic?.updatedAt) {
      lastStudiedDate = new Date(latestTopic.updatedAt).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
      );
    }
  }

  // ৩. RecommendationPriority (1 | 2 | 3) অনুযায়ী স্টাইল ও লেবেল নির্ধারণকারী হেল্পার
  const getPriorityDetails = (priority: Recommendation["priority"]) => {
    if (priority === 3) {
      return {
        label: "High",
        className: "bg-red-500/10 text-red-400 border-red-500/30",
      };
    }
    if (priority === 2) {
      return {
        label: "Medium",
        className: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      };
    }
    return {
      label: "Low",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Welcome Back!
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Here is a summary of your learning progress and AI recommendations.
        </p>
      </div>

      {/* --- Stats Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Topics Started */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
            <FaBookOpen size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Topics Started
            </p>
            <p className="text-2xl font-bold text-white mt-0.5">
              {topicsStarted}
            </p>
          </div>
        </div>

        {/* Card 2: Concepts Mastered */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-teal-brand/10 text-teal-brand rounded-xl border border-teal-brand/20">
            <FaGraduationCap size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Concepts Mastered
            </p>
            <p className="text-2xl font-bold text-white mt-0.5">
              {conceptsMastered}
            </p>
          </div>
        </div>

        {/* Card 3: Last Studied */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-gold-brand/10 text-gold-brand rounded-xl border border-gold-brand/20">
            <FaClock size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Last Studied
            </p>
            <p className="text-xl font-bold text-white mt-0.5 max-w-45 truncate">
              {lastStudiedDate}
            </p>
          </div>
        </div>
      </div>

      {/* --- AI Recommendations Section --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          AI Recommendations
        </h2>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TODO: replace with real getRecommendations() call once B6/B8 are done — see F12B */}
          {fakeRecommendations.map((rec) => {
            const badge = getPriorityDetails(rec.priority);
            return (
              <div
                key={rec.conceptId}
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col justify-between gap-5 transition-all duration-300 hover:border-purple-brand/50 shadow-[0_0_15px_rgba(145,0,141,0.05)] hover:shadow-[0_0_20px_rgba(145,0,141,0.2)] group"
              >
                <div className="space-y-3">
                  {/* Top Badge Info */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-md border capitalize ${badge.className}`}
                    >
                      {badge.label} Priority
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      Difficulty:{" "}
                      <span className="text-teal-brand font-semibold">
                        {rec.difficulty}/5
                      </span>
                    </span>
                  </div>

                  {/* Concept Title, Topic Context & Reason */}
                  <div className="space-y-1.5">
                    <div className="text-xs text-purple-brand font-medium tracking-wide uppercase">
                      {rec.topicName}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-brand transition-colors">
                      {rec.conceptName}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      <span className="text-zinc-300 font-medium">
                        Why recommended:
                      </span>{" "}
                      {rec.reason}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-zinc-800/60 flex justify-end">
                  <Link
                    href={`/concepts/${rec.conceptId}`}
                    className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-purple-brand text-zinc-300 hover:text-white border border-zinc-800 px-4 py-2 rounded-xl text-xs font-semibold transition-all group-hover:scale-[1.02]"
                  >
                    Start Learning <FaChevronRight size={10} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
