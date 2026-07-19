"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function FilterControls({
  currentCategory,
  currentSort,
}: {
  currentCategory: string;
  currentSort: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 w-full md:w-auto">
      <select
        value={currentCategory}
        onChange={(e) => updateParam("category", e.target.value)}
        className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-200 cursor-pointer"
      >
        <option value="all">All Categories</option>
        <option value="tech">Technology</option>
        <option value="science">Science</option>
        <option value="math">Mathematics</option>
      </select>

      <select
        value={currentSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-200 cursor-pointer"
      >
        <option value="newest">Newest</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
}
