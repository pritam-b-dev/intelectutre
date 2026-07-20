import { notFound } from "next/navigation";
import { getConcept } from "@/lib/api/concepts";
import { getHistory } from "@/lib/api/chat";
import ChatBox from "./ChatBox";

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const concept = await getConcept(id).catch(() => null);
  if (!concept) notFound();

  const history = await getHistory(id).catch(() => []);

  return (
    <div className="container mx-auto p-6 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Concept Info Card */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white/80 dark:bg-zinc-900/40 shadow-sm transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50">
              Difficulty: {concept.difficulty}/5
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">
            {concept.name}
          </h1>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {concept.description}
          </p>
        </div>

        {/* Right Column: Interactive AI Chat Box Wrapper */}
        <div className="border border-purple-200 dark:border-purple-500/30 rounded-xl p-5 bg-purple-50/40 dark:bg-zinc-900/40 shadow-sm transition-colors">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
            🧠 Ask AI about this
          </h2>
          <ChatBox conceptId={id} initialHistory={history} />
        </div>
      </div>
    </div>
  );
}
