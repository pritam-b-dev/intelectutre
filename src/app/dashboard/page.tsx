import Link from "next/link";
import {
  FaBookOpen,
  FaGraduationCap,
  FaClock,
  FaChevronRight,
} from "react-icons/fa6";
import { getMyTopics } from "@/lib/api/topics";
import { getRecommendations } from "@/lib/api/recommendations"; // 🌟 রিয়েল API ফাংশন ইম্পোর্ট
import { Topic, Recommendation } from "@/types";

export default async function DashboardPage() {
  let topics: Topic[] = [];
  let recommendations: Recommendation[] = [];

  // ১. এপিআই থেকে টপিকস এবং রিয়েল রেকমেন্ডেশন ডাটা ফেচ করা
  try {
    const [topicsResponse, recsResponse] = await Promise.all([
      getMyTopics(),
      getRecommendations(),
    ]);

    // টপিক রেসপন্স হ্যান্ডলিং
    if (topicsResponse) {
      if (Array.isArray(topicsResponse)) {
        topics = topicsResponse as Topic[];
      } else if (
        typeof topicsResponse === "object" &&
        "items" in topicsResponse
      ) {
        topics = (topicsResponse as { items: Topic[] }).items || [];
      }
    }

    // রেকমেন্ডেশন রেসপন্স হ্যান্ডলিং (F12B: রিয়েল কল ও ক্যাচিং)
    if (recsResponse && "items" in recsResponse) {
      recommendations = recsResponse.items || [];
    }
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }

  // ২. স্ট্যাটাস ক্যালকুলেশন
  const topicsStarted = topics.length;
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

  // ৩. B6 লজিক অনুযায়ী (1 = High, 2 = Medium, 3 = Low) ব্যাজ ও স্টাইল ডিটেইলস
  const getPriorityDetails = (priority: Recommendation["priority"]) => {
    if (priority === 1) {
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

        {/* ৪. রেকমেন্ডেশন খালি থাকলে ফ্রেণ্ডলি এম্পটি স্টেট শো করা */}
        {recommendations.length === 0 ? (
          <div className="p-10 bg-zinc-900 border border-zinc-800/80 rounded-2xl text-center shadow-sm flex flex-col items-center justify-center space-y-2">
            <p className="text-zinc-300 font-medium text-base">
              No recommendations available yet
            </p>
            <p className="text-zinc-500 text-sm max-w-md">
              Complete your first concept to unlock AI recommendations!
            </p>
          </div>
        ) : (
          /* রেকমেন্ডেশন গ্রিড (UI লেআউট অপরিবর্তিত রাখা হয়েছে) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec) => {
              const badge = getPriorityDetails(rec.priority);
              return (
                <div
                  key={rec.conceptId}
                  className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col justify-between gap-5 transition-all duration-300 hover:border-purple-brand/50 shadow-[0_0_15px_rgba(145,0,141,0.05)] hover:shadow-[0_0_20px_rgba(145,0,141,0.2)] group"
                >
                  <div className="space-y-3">
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

                    <div className="space-y-1.5">
                      <div className="text-xs text-purple-brand font-medium tracking-wide uppercase">
                        {rec.topicName || "Topic Plan"}
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
        )}
      </div>
    </div>
  );
}
