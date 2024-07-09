import { PropsWithoutRef } from 'react'
import { Cake } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  date: string
}

export default function StatsBirthdayCard({ date }: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats')
  return (
    <Card>
      <StatsCardHeader Icon={Cake}>Birthday</StatsCardHeader>
      <StatsCardContent subText={t('birthday')}>{date}</StatsCardContent>
    </Card>
  )
}
