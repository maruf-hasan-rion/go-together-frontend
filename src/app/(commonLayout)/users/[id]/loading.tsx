export default function PublicProfileLoading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse space-y-6 px-4 py-12 mt-16 lg:mt-20">
      <div className="rounded-lg border bg-card p-8">
        <div className="mx-auto h-24 w-24 rounded-full bg-muted" />
        <div className="mx-auto mt-4 h-6 w-40 rounded bg-muted" />
        <div className="mx-auto mt-2 h-4 w-24 rounded bg-muted" />
        <div className="mx-auto mt-4 h-4 w-56 rounded bg-muted" />
      </div>
      <div className="rounded-lg border bg-card p-6">
        <div className="h-5 w-24 rounded bg-muted" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-3 w-full rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
