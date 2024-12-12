import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'

type Props = {
  count: number | string
  className?: string
}

export default function StatsChatRateCard({
  count,
  className
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  const c = typeof count === 'number' ? count.toFixed(1) : count
  return (
    <StatsCard className={className}>
      <StatsCardHeader>Chat Rate</StatsCardHeader>
      <StatsCardContent subText={t('chatRate')}>{c}</StatsCardContent>
    </StatsCard>
  )
}
