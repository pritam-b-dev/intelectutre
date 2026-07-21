import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBrain } from "react-icons/fa6";

import { getTopics } from "../../lib/api/topics";
import { FilterControls } from "./FilterControls";

function TopicSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/20 rounded-xl p-5 space-y-4 animate-pulse"
        >
          <div className="w-full h-32 bg-zinc-200 dark:bg-zinc-800/50 rounded-lg" />
          <div className="h-5 bg-zinc-200 dark:bg-zinc-800/50 rounded w-2/3" />
          <div className="space-y-2">
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800/50 rounded" />
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800/50 rounded w-5/6" />
          </div>
          <div className="h-9 bg-zinc-200 dark:bg-zinc-800/50 rounded-lg w-full" />
        </div>
      ))}
    </div>
  );
}

async function TopicsGrid({
  category,
  sort,
  search,
  page,
}: {
  category: string;
  sort: string;
  search: string;
  page: number;
}) {
  const data = await getTopics({ category, sort, search, page });
  const topics = data.items || [];
  const totalPages = Math.ceil((data.total || 0) / (data.perPage || 8));

  if (topics.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
        <p className="text-zinc-500 dark:text-zinc-400">
          No topics found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((topic) => (
          <div
            key={topic._id}
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white dark:bg-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/70 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="relative w-full h-32 bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg mb-4 overflow-hidden">
                {topic.imageUrl ? (
                  <Image
                    src={topic.imageUrl}
                    alt={topic.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-500 dark:text-zinc-600 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/10 px-2 py-0.5 rounded">
                  {topic.category}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {topic.conceptCount || 0} Concepts
                </span>
              </div>
              <h3 className="text-base font-semibold mb-1 text-zinc-900 dark:text-zinc-200 line-clamp-1">
                {topic.name}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs line-clamp-3 mb-4">
                {topic.description}
              </p>
            </div>
            <Link
              href={`/topics/${topic._id}`}
              className="flex items-center justify-center w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-zinc-800 dark:text-zinc-200 hover:text-white text-xs font-medium py-2 rounded-lg transition-colors"
            >
              View
            </Link>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`?category=${category}&sort=${sort}&search=${search}&page=${p}`}
              className={`px-3 py-1.5 rounded-lg text-sm ${p === page ? "bg-purple-600 text-white" : "border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"}`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default async function ExploreTopicsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  const sort = params.sort || "newest";
  const search = params.search || "";
  const page = Number(params.page) || 1;

  return (
    <div className="container mx-auto p-6 min-h-screen text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaBrain className="text-purple-600 dark:text-purple-500" /> Explore
            Topics
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1">
            Browse and learn from available AI-curated topics
          </p>
        </div>
        <FilterControls
          currentCategory={category}
          currentSort={sort}
          currentSearch={search}
        />
      </div>

      <Suspense
        key={category + sort + search + page}
        fallback={<TopicSkeletonGrid />}
      >
        <TopicsGrid
          category={category}
          sort={sort}
          search={search}
          page={page}
        />
      </Suspense>
    </div>
  );
}
