import { PropsWithoutRef } from 'react'
import { Play } from 'lucide-react'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

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
