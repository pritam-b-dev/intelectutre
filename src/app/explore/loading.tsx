import React from "react";

export default function ExploreLoading() {
  const placeholders = Array.from({ length: 8 });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-4 md:px-8 py-12 max-w-7xl mx-auto transition-colors duration-300">
      {/* Top Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-pulse">
        <div className="space-y-3 w-full md:w-1/3">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-36" />
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-36" />
        </div>
      </div>

      {/* Responsive Grid Skeleton (Desktop: 4, Tablet: 2, Mobile: 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {placeholders.map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-900/20 p-5 space-y-4 animate-pulse"
          >
            {/* Image Placeholder */}
            <div className="aspect-video w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
            {/* Title & Badge */}
            <div className="space-y-2">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
            </div>
            {/* Description */}
            <div className="space-y-1.5 pt-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6" />
            </div>
            {/* Button */}
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full pt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
