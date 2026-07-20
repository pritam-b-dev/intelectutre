import { getConcept } from "@/lib/api/concepts";
import { getNotesByConcept } from "@/lib/api/notes";
import { Concept } from "@/types"; //[cite: 3]
import ConceptDetailClient from "./ConceptDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const conceptId = resolvedParams.id;

  // ১. সমান্তরালভাবে (Parallel) কনসেপ্ট এবং নোটস ফেচ করা
  const [conceptResponse, notesResponse] = await Promise.all([
    getConcept(conceptId),
    getNotesByConcept(conceptId),
  ]);

  // 🌟 'any' এর বদলে টাইপ-সেফ অবজেক্ট স্ট্রাকচারে কাস্ট করা হলো
  const concept =
    (conceptResponse as unknown as { data?: Concept }).data || conceptResponse;

  // নোটস লিস্ট এবং টোটাল কাউন্ট সেফলি হ্যান্ডেল করা
  const notes = notesResponse?.items || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ConceptDetailClient concept={concept} initialNotes={notes} />
    </div>
  );
}
