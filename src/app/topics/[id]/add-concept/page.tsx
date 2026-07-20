"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createConcept } from "@/lib/api/concepts";

export default function AddConceptPage() {
  const router = useRouter();
  const params = useParams();
  const topicId = params.id as string;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createConcept({
        topicId,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        difficulty: Number(formData.get("difficulty")),
      });
      router.push(`/topics/${topicId}`);
    } catch {
      alert("Failed to create concept");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg text-zinc-100">
      <h1 className="text-2xl font-bold mb-6">Add Concept</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          required
          placeholder="Concept name"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2"
        />
        <textarea
          name="description"
          required
          placeholder="Description"
          rows={3}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2"
        />
        <select
          name="difficulty"
          defaultValue="3"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2"
        >
          {[1, 2, 3, 4, 5].map((d) => (
            <option key={d} value={d}>
              Difficulty {d}
            </option>
          ))}
        </select>
        <button
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2.5 rounded-lg font-medium"
        >
          {loading ? "Adding..." : "Add Concept"}
        </button>
      </form>
    </div>
  );
}
