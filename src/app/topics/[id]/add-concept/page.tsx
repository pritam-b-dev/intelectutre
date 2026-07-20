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
    <div className="container mx-auto p-6 max-w-lg min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Header */}
      <div className="mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Add Concept
        </h1>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          Add a new concept to build out this learning topic
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-xl bg-white/80 dark:bg-zinc-900/50 shadow-xl backdrop-blur-sm transition-colors"
      >
        {/* Name */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Concept Name
          </label>
          <input
            name="name"
            required
            placeholder="e.g. Wave-Particle Duality"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors disabled:opacity-50"
            disabled={loading}
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Description
          </label>
          <textarea
            name="description"
            required
            placeholder="Key notes and summary about this concept..."
            rows={3}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors disabled:opacity-50 resize-none"
            disabled={loading}
          />
        </div>

        {/* Difficulty */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Difficulty Level
          </label>
          <select
            name="difficulty"
            defaultValue="3"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors cursor-pointer disabled:opacity-50"
            disabled={loading}
          >
            {[1, 2, 3, 4, 5].map((d) => (
              <option
                key={d}
                value={d}
                className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
              >
                Difficulty {d}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-lg py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? "Adding..." : "Add Concept"}
        </button>
      </form>
    </div>
  );
}
