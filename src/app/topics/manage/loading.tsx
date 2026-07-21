export default function Loading() {
  return (
    <div className="container mx-auto p-6 space-y-6 animate-pulse">
      <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl"
          />
        ))}
      </div>
      <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
    </div>
  );
}
