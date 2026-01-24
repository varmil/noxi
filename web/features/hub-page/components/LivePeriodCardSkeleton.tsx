function StreamItemSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        {/* 順位バッジ */}
        <div className="absolute -left-1 -top-1 z-10 h-5 w-5 rounded-full bg-muted animate-pulse" />
        {/* サムネイル */}
        <div className="aspect-video rounded-md bg-muted animate-pulse" />
      </div>
      {/* タイトル */}
      <div className="h-4 w-full bg-muted rounded animate-pulse" />
    </div>
  )
}

function LivePeriodCardSkeleton() {
  return (
    <div
      className="rounded-xl border bg-card p-6"
      data-testid="live-period-card-skeleton"
    >
      <div className="flex flex-col gap-3">
        {/* ヘッダー: タイトル + サブタイトル */}
        <div className="h-5 w-40 bg-muted rounded animate-pulse" />

        <div className="flex flex-col gap-2">
          {/* 上段: Top1, Top2 (50%ずつ) */}
          <div className="grid grid-cols-2 gap-1.5">
            <StreamItemSkeleton />
            <StreamItemSkeleton />
          </div>

          {/* 下段: Top3, Top4, Top5 (33%ずつ) */}
          <div className="grid grid-cols-3 gap-1.5">
            <StreamItemSkeleton />
            <StreamItemSkeleton />
            <StreamItemSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}

function ArchiveSectionSkeleton() {
  return (
    <section className="@container mb-12">
      <div className="h-7 w-56 bg-muted rounded animate-pulse mb-4" />
      <div className="grid grid-cols-1 gap-3 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <LivePeriodCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

export function ArchiveSectionsSkeleton() {
  return (
    <>
      <ArchiveSectionSkeleton />
      <ArchiveSectionSkeleton />
    </>
  )
}
