import { Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import StatsCardHeader from 'features/youtube/components/stats/card/StatsCardHeader'
import StatsCardContent from 'features/youtube/components/stats/card/StatsCardContent'
import { PropsWithoutRef } from 'react'

type Props = {
  count: string
}

export default function StatsSubscriberCard({ count }: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StatsCardHeader Icon={Users}>Subscribers</StatsCardHeader>
      <StatsCardContent subText="+18.1% from last week">
        {count}
      </StatsCardContent>
    </Card>
  )
}
