import { PropsWithoutRef } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'

type Props = PropsWithoutRef<{
  date: string
  className?: string
}>

export default function StatsJoinedCard({ date, className }: Props) {
  const format = useFormatter()
  const t = useTranslations('Features.youtube.stats')
  return (
    <StatsCard className={className}>
      <StatsCardHeader>Joined</StatsCardHeader>
      <StatsCardContent subText={t('joinedDescription')}>
        {format.dateTime(new Date(date), {
          dateStyle: 'medium'
        })}
      </StatsCardContent>
    </StatsCard>
  )
}
