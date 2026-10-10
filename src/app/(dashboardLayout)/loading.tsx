export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6 p-2">
      <div className="h-8 w-56 rounded bg-muted" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-lg border bg-card p-4">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="mt-3 h-7 w-16 rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border bg-card p-4">
        <div className="h-5 w-40 rounded bg-muted" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-10 w-full rounded bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
