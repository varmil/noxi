import { Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PropsWithoutRef } from 'react'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsSubscriberCard({ count }: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StatsCardHeader Icon={Users}>Subscribers</StatsCardHeader>
      <StatsCardContent subText="チャンネル登録者数">{count}</StatsCardContent>
    </Card>
  )
}
