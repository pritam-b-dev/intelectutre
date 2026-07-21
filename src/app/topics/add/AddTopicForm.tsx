"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTopic } from "@/lib/api/topics";

export default function AddTopicForm() {
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
        imageUrl: formData.get("imageUrl") as string,
      });
      router.push(`/topics/${topic._id}`);
    } catch {
      alert("Failed to create topic");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg text-zinc-900 dark:text-zinc-100">
      <h1 className="text-2xl font-bold mb-6">Add New Topic</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          required
          placeholder="Topic name (e.g. Physics)"
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />
        <textarea
          name="description"
          required
          placeholder="Description"
          rows={4}
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />
        <select
          name="category"
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option
            value="Technology"
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            Technology
          </option>
          <option
            value="Science"
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            Science
          </option>
          <option
            value="Math"
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            Mathematics
          </option>
          <option
            value="Design"
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          >
            Design
          </option>
        </select>
        <input
          name="imageUrl"
          placeholder="Image URL (optional)"
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />
        <button
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Topic"}
        </button>
      </form>
    </div>
  );
}
