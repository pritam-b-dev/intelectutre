"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTopic, updateTopic } from "@/lib/api/topics";
import { Topic } from "@/types";

interface Props {
  mode: "create" | "edit";
  topic?: Topic;
}

export default function TopicForm({ mode, topic }: Props) {
  const router = useRouter();

  const [name, setName] = useState(topic?.name ?? "");
  const [description, setDescription] = useState(topic?.description ?? "");
  const [category, setCategory] = useState(topic?.category ?? "Programming");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Topic name is required");
      return;
    }

    try {
      setLoading(true);

      if (mode === "create") {
        const created = await createTopic({
          name,
          description,
          category,
        });

        router.push(`/topics/${created._id}`);
      } else {
        await updateTopic(topic!._id, {
          name,
          description,
          category,
        });

        router.push(`/topics/${topic!._id}`);
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-xl bg-white/80 dark:bg-zinc-900/50 shadow-xl backdrop-blur-sm transition-colors"
    >
      {/* Topic Name */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Topic Name
        </label>
        <input
          type="text"
          placeholder="e.g. Advanced React Patterns"
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Description
        </label>
        <textarea
          rows={5}
          placeholder="Describe what this topic covers..."
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Category
        </label>
        <select
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        >
          <option
            value="Programming"
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            Programming
          </option>
          <option
            value="AI"
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            AI
          </option>
          <option
            value="Machine Learning"
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            Machine Learning
          </option>
          <option
            value="Web Development"
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            Web Development
          </option>
          <option
            value="Database"
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            Database
          </option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-lg px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {loading
          ? "Saving..."
          : mode === "create"
            ? "Create Topic"
            : "Update Topic"}
      </button>
    </form>
  );
}
