"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function FilterControls({
  currentCategory,
  currentSort,
  currentSearch,
}: {
  currentCategory: string;
  currentSort: string;
  currentSearch: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && updateParam("search", searchInput)
        }
        placeholder="Search topics..."
        className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-zinc-800 dark:text-zinc-200"
      />
      <select
        value={currentCategory}
        onChange={(e) => updateParam("category", e.target.value)}
        className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 cursor-pointer"
      >
        <option value="all">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
        <option value="Math">Mathematics</option>
        <option value="Design">Design</option>
      </select>
      <select
        value={currentSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 cursor-pointer"
      >
        <option value="newest">Newest</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
}
