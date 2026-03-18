import { Skeleton } from '@/components/ui/skeleton'
import {
  ChartCard,
  ChartCardContent,
  ChartCardHeader
} from 'components/styles/card/ChartCard'

export function SubscriberRankTrendSkeleton() {
  return (
    <ChartCard>
      <ChartCardHeader>
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-24 mt-1" />
      </ChartCardHeader>
      <ChartCardContent>
        <Skeleton className="h-[192px] sm:h-[250px] w-full rounded-md" />
      </ChartCardContent>
    </ChartCard>
  )
}
