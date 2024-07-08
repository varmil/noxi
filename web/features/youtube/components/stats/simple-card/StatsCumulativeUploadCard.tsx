import { PropsWithoutRef } from 'react'
import { Upload } from 'lucide-react'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsCumulativeVideoCard({
  count
}: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StatsCardHeader Icon={Upload}>Cumulative Uploads</StatsCardHeader>
      <StatsCardContent subText="動画の累計アップロード数">
        {count}
      </StatsCardContent>
    </Card>
  )
}
