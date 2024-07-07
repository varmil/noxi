import { Play } from 'lucide-react'
import { Card } from '@/components/ui/card'
import StatsCardHeader from './StatsCardHeader'
import StatsCardContent from './StatsCardContent'
import { PropsWithoutRef } from 'react'

type Props = {
  count: number
}

export default function StatsCumulativeViewCard({
  count
}: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StatsCardHeader Icon={Play}>Cumulative Views</StatsCardHeader>
      <StatsCardContent subText="動画の累計再生回数">{count}</StatsCardContent>
    </Card>
  )
}
