import { Skeleton } from '@/components/ui/skeleton'

export function StatisticsHistorySkeleton() {
  return (
    <div className="space-y-6">
      {/* Filters skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Skeleton className="h-10 w-[260px] rounded-md" />
        <Skeleton className="h-10 w-[200px] rounded-md" />
      </div>
      {/* Chart skeleton */}
      <Skeleton className="h-[250px] sm:h-[350px] w-full rounded-md" />
      {/* Table skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-full rounded-md" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full rounded-md" />
        ))}
      </div>
    </div>
  )
}
