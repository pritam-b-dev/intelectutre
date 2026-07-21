import { notFound } from "next/navigation";
import { getConcept } from "@/lib/api/concepts";
import { getNotesByConcept } from "@/lib/api/notes";
import ConceptDetailClient from "./ConceptDetailClient";

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const concept = await getConcept(id).catch(() => null);
  if (!concept) notFound();

  const { items: notes } = await getNotesByConcept(id).catch(() => ({
    items: [],
    total: 0,
  }));

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <ConceptDetailClient concept={concept} initialNotes={notes} />
    </div>
  );
}
