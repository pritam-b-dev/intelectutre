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
    <div className="container mx-auto p-6 max-w-lg text-zinc-100">
      <h1 className="text-2xl font-bold mb-6">Add New Topic</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          required
          placeholder="Topic name (e.g. Physics)"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2"
        />
        <textarea
          name="description"
          required
          placeholder="Description"
          rows={4}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2"
        />
        <select
          name="category"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2"
        >
          <option value="tech">Technology</option>
          <option value="science">Science</option>
          <option value="math">Mathematics</option>
        </select>
        <button
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2.5 rounded-lg font-medium"
        >
          {loading ? "Creating..." : "Create Topic"}
        </button>
      </form>
    </div>
  );
}
