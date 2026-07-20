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
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 text-zinc-100">
      <div>
        <span className="text-xs text-purple-400">
          Difficulty {concept.difficulty}/5
        </span>
        <h1 className="text-2xl font-bold mb-2">{concept.name}</h1>
        <p className="text-zinc-400">{concept.description}</p>
      </div>
      <div className="border border-purple-500/30 rounded-xl p-4 bg-zinc-900/40">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          🧠 Ask AI about this
        </h2>
        <ChatBox conceptId={id} initialHistory={history} />
      </div>
    </div>
  );
}
