import { PropsWithoutRef } from 'react'
import { Cake } from 'lucide-react'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  date: string
}

export default function StatsBirthdayCard({ date }: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StatsCardHeader Icon={Cake}>Birthday</StatsCardHeader>
      <StatsCardContent subText="Youtubeを始めた日">{date}</StatsCardContent>
    </Card>
  )
}
