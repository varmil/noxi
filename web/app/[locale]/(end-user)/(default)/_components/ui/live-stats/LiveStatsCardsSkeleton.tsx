import { Skeleton } from '@/components/ui/skeleton'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader,
  StatsCards
} from 'components/styles/card/StatsCard'

export function LiveStatsCardsSkeleton() {
  return (
    <StatsCards className="grid-cols-3 lg:grid-cols-3">
      <StatsCard>
        <StatsCardHeader>
          <Skeleton className="h-4 w-16" />
        </StatsCardHeader>
        <StatsCardContent>
          <Skeleton className="h-8 w-12" />
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>
          <Skeleton className="h-4 w-24" />
        </StatsCardHeader>
        <StatsCardContent>
          <Skeleton className="h-8 w-20" />
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>
          <Skeleton className="h-4 w-28" />
        </StatsCardHeader>
        <StatsCardContent>
          <Skeleton className="h-8 w-16" />
        </StatsCardContent>
      </StatsCard>
    </StatsCards>
  )
}
