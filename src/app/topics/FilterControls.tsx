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
      {/* Category Dropdown */}
      <select
        value={currentCategory}
        onChange={(e) => updateParam("category", e.target.value)}
        className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-zinc-800 dark:text-zinc-200 cursor-pointer transition-colors"
      >
        <option
          value="all"
          className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
        >
          All Categories
        </option>
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

      {/* Sort Dropdown */}
      <select
        value={currentSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-zinc-800 dark:text-zinc-200 cursor-pointer transition-colors"
      >
        <option
          value="newest"
          className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
        >
          Newest
        </option>
        <option
          value="popularity"
          className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
        >
          Popularity
        </option>
      </select>
    </div>
  );
}
