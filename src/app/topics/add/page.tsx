"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTopic } from "@/lib/api/topics";

export default function AddTopicPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const topic = await createTopic({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
      });
      router.push(`/topics/${topic._id}`);
    } catch {
      alert("Failed to create topic");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Header */}
      <div className="mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Add New Topic
        </h1>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          Create a new topic to organize your learning concepts
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-xl bg-white/80 dark:bg-zinc-900/50 shadow-xl backdrop-blur-sm transition-colors"
      >
        {/* Name Input */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Topic Name
          </label>
          <input
            name="name"
            required
            placeholder="e.g. Quantum Physics"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors disabled:opacity-50"
            disabled={loading}
          />
        </div>

        {/* Description Textarea */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Description
          </label>
          <textarea
            name="description"
            required
            placeholder="Brief description of what this topic covers..."
            rows={4}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors disabled:opacity-50 resize-none"
            disabled={loading}
          />
        </div>

        {/* Category Select */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Category
          </label>
          <select
            name="category"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors cursor-pointer disabled:opacity-50"
            disabled={loading}
          >
            <option
              value="tech"
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              Technology
            </option>
            <option
              value="science"
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              Science
            </option>
            <option
              value="math"
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            >
              Mathematics
            </option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-lg py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? "Creating..." : "Create Topic"}
        </button>
      </form>
    </div>
  );
}
