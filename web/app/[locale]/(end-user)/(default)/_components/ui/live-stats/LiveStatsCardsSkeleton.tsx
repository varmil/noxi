import { Radio } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader,
  StatsCards
} from 'components/styles/card/StatsCard'

export function LiveStatsCardsSkeleton() {
  return (
    <StatsCards className="grid-cols-2 sm:grid-cols-3">
      <StatsCard className="col-span-full sm:col-span-1 bg-white dark:bg-gray-900 shadow-xs">
        <StatsCardHeader className="justify-start gap-2 ">
          <Radio className="stroke-red-600 animate-pulse" />
          <Skeleton className="h-4 w-16" />
        </StatsCardHeader>
        <StatsCardContent>
          <Skeleton className="h-8 w-12" />
        </StatsCardContent>
      </StatsCard>

      <StatsCard className="col-span-1 bg-white dark:bg-gray-900 shadow-xs">
        <StatsCardHeader className="">
          <Skeleton className="h-5 w-24" />
        </StatsCardHeader>
        <StatsCardContent>
          <Skeleton className="h-8 w-16" />
        </StatsCardContent>
      </StatsCard>

      <StatsCard className="col-span-1 bg-white dark:bg-gray-900 shadow-xs">
        <StatsCardHeader className="">
          <Skeleton className="h-5 w-24" />
        </StatsCardHeader>
        <StatsCardContent>
          <Skeleton className="h-8 w-16" />
        </StatsCardContent>
      </StatsCard>
    </StatsCards>
  )
}
