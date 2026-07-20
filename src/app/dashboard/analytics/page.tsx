export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  FaChartPie,
  FaTriangleExclamation,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa6";
import { getMyTopics } from "@/lib/api/topics";
import { getUserNotes } from "@/lib/api/notes";
import { Topic, Note } from "@/types";
import {
  TopicProgressChart,
  MasteryTimelineChart,
  TopicChartData,
  TimelineChartData,
} from "./analytics-charts";

export default async function AnalyticsPage() {
  let topics: Topic[] = [];
  let notes: Note[] = [];

  // ১. ড্যাশবোর্ড ডাটা ফেচ করা
  try {
    const [topicsRes, notesRes] = await Promise.all([
      getMyTopics(),
      getUserNotes(),
    ]);

    if (topicsRes) {
      if (Array.isArray(topicsRes)) {
        topics = topicsRes;
      } else if (typeof topicsRes === "object" && "items" in topicsRes) {
        topics = topicsRes.items || [];
      }
    }

    if (notesRes && "items" in notesRes) {
      notes = notesRes.items || [];
    }
  } catch (error) {
    console.error("Failed to load analytics data:", error);
  }

  // ২. Overall Progress হিসাব
  const totalConcepts = topics.reduce(
    (acc, t) => acc + (t.conceptCount || 0),
    0,
  );
  const masteredConcepts = topics.reduce(
    (acc, t) => acc + (t.masteredCount || 0),
    0,
  );
  const overallPercentage =
    totalConcepts > 0
      ? Math.round((masteredConcepts / totalConcepts) * 100)
      : 0;

  // ৩. Topic-wise Stacked Bar Chart এর জন্য ডাটা প্রিপেয়ার করা
  const topicChartData: TopicChartData[] = topics.map((t) => {
    const total = t.conceptCount || 0;
    const mastered = t.masteredCount || 0;
    const inProgress = Math.max(0, total - mastered);
    return {
      name: t.name,
      mastered,
      inProgress,
    };
  });

  // ৪. Mastery Timeline (গত ৭ দিনের প্রতিদিন সম্পন্ন করা কনসেপ্টের সংখ্যা)
  const last7Days: { dateStr: string; displayLabel: string; count: number }[] =
    [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const displayLabel = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    last7Days.push({ dateStr, displayLabel, count: 0 });
  }

  // নোটসের updatedAt অনুযায়ী ম্যাচিং
  notes.forEach((note) => {
    if (note.status === "mastered" && note.updatedAt) {
      const noteDateStr = new Date(note.updatedAt).toISOString().split("T")[0];
      const dayMatch = last7Days.find((day) => day.dateStr === noteDateStr);
      if (dayMatch) {
        dayMatch.count += 1;
      }
    }
  });

  const timelineChartData: TimelineChartData[] = last7Days.map((d) => ({
    date: d.displayLabel,
    completed: d.count,
  }));

  // ৫. Weak Areas (যেসব টপিকের Mastery % < 50%)
  const weakTopics = topics.filter((t) => {
    const total = t.conceptCount || 0;
    if (total === 0) return false;
    const percentage = ((t.masteredCount || 0) / total) * 100;
    return percentage < 50;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* হেডার */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Progress Analytics
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Detailed insights into your learning velocity and topic mastery.
        </p>
      </div>

      {/* Overview Progress Banner */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-2">
            <FaGraduationCap size={16} /> Overall Completion
          </p>
          <h2 className="text-2xl font-bold text-white">
            {masteredConcepts} / {totalConcepts} concepts mastered (
            {overallPercentage}%)
          </h2>
          <p className="text-sm text-zinc-400">
            Keep completing concepts to boost your overall mastery level!
          </p>
        </div>

        {/* Progress Circle / Bar */}
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-zinc-400">Mastery Progress</span>
            <span className="text-teal-400">{overallPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Topic Breakdown Chart */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaChartPie className="text-teal-400" /> Topic Progress Breakdown
            </h3>
          </div>
          <p className="text-xs text-zinc-400">
            Comparing mastered vs in-progress concepts per topic.
          </p>
          <TopicProgressChart data={topicChartData} />
        </div>

        {/* 7-Day Mastery Timeline */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaGraduationCap className="text-teal-400" /> Mastery Timeline
              (Last 7 Days)
            </h3>
          </div>
          <p className="text-xs text-zinc-400">
            Concepts mastered per day over the past week.
          </p>
          <MasteryTimelineChart data={timelineChartData} />
        </div>
      </div>

      {/* Weak Areas Section */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <FaTriangleExclamation size={18} />
          <h3 className="text-lg font-bold text-white">
            Weak Areas (Mastery &lt; 50%)
          </h3>
        </div>
        <p className="text-xs text-zinc-400">
          Topics that need more attention to reach complete understanding.
        </p>

        {weakTopics.length === 0 ? (
          <div className="p-6 bg-zinc-950 border border-zinc-800/80 rounded-xl text-center text-zinc-400 text-sm">
            🎉 Great job! None of your active topics have less than 50% mastery.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weakTopics.map((topic) => {
              const total = topic.conceptCount || 0;
              const mastered = topic.masteredCount || 0;
              const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

              return (
                <div
                  key={topic._id}
                  className="p-4 bg-zinc-950 border border-zinc-800/80 rounded-xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Needs Focus
                    </span>
                    <h4 className="text-base font-bold text-white pt-1">
                      {topic.name}
                    </h4>
                    <p className="text-xs text-zinc-400">{topic.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-zinc-900">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Progress</span>
                      <span className="text-amber-400 font-bold">
                        {pct}% ({mastered}/{total})
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <Link
                      href={`/topics/${topic._id}`}
                      className="inline-flex items-center justify-between w-full mt-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 p-2 rounded-lg border border-zinc-800 transition-colors"
                    >
                      Review Topic <FaArrowRight size={10} />
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
