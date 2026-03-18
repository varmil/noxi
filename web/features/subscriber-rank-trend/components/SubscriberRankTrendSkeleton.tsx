import { Skeleton } from '@/components/ui/skeleton'
import { ChartCard } from 'components/styles/card/ChartCard'

export function SubscriberRankTrendSkeleton() {
  return (
    <ChartCard>
      <div className="flex items-center gap-6">
        <div className="shrink-0 min-w-[100px] text-center">
          <Skeleton className="h-14 w-full rounded-md" />
        </div>
        <div className="min-w-0 flex-1">
          <Skeleton className="h-[120px] sm:h-[220px] w-full rounded-md" />
        </div>
      </div>
    </ChartCard>
  )
}
