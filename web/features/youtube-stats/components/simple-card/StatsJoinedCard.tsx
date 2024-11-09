import { PropsWithoutRef } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = PropsWithoutRef<{
  date: string
  className?: string
}>

export default function StatsJoinedCard({ date, className }: Props) {
  const format = useFormatter()
  const t = useTranslations('Features.youtube.stats')
  return (
    <Card className={className}>
      <StatsCardHeader>Joined</StatsCardHeader>
      <StatsCardContent subText={t('joinedDescription')}>
        {format.dateTime(new Date(date), {
          dateStyle: 'medium'
        })}
      </StatsCardContent>
    </Card>
  )
}
