import { Play } from 'lucide-react'
import { Card } from '@/components/ui/card'
import StatsCardHeader from 'features/youtube/components/stats/card/StatsCardHeader'
import StatsCardContent from 'features/youtube/components/stats/card/StatsCardContent'
import { PropsWithoutRef } from 'react'

type Props = {
  count: string
}

export default function StatsCumulativeViewCard({
  count
}: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StatsCardHeader Icon={Play}>Cumulative Views</StatsCardHeader>
      <StatsCardContent subText="+18.1% from last week">
        {count}
      </StatsCardContent>
    </Card>
  )
}
