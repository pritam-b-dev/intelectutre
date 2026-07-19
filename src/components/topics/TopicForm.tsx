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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Topic Name</label>

        <input
          className="w-full rounded-lg border px-4 py-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>

        <textarea
          rows={5}
          className="w-full rounded-lg border px-4 py-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category</label>

        <select
          className="w-full rounded-lg border px-4 py-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Programming</option>
          <option>AI</option>
          <option>Machine Learning</option>
          <option>Web Development</option>
          <option>Database</option>
        </select>
      </div>

      <button
        disabled={loading}
        className="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 disabled:opacity-50"
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
