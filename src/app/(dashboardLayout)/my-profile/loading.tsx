export default function MyProfileLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-40 rounded bg-muted" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="mx-auto h-32 w-32 rounded-full bg-muted" />
          <div className="mx-auto mt-4 h-5 w-32 rounded bg-muted" />
        </div>
        <div className="rounded-lg border bg-card p-6 lg:col-span-2">
          <div className="h-5 w-40 rounded bg-muted" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-10 w-full rounded bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
