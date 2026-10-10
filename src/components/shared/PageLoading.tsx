export default function PageLoading({ rows = 3 }: { rows?: number }) {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-8">
      <div className="h-8 w-48 rounded bg-muted" />
      <div className="mt-2 h-4 w-72 rounded bg-muted" />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="rounded-lg border bg-card p-4">
            <div className="h-40 w-full rounded bg-muted" />
            <div className="mt-4 h-5 w-3/4 rounded bg-muted" />
            <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
