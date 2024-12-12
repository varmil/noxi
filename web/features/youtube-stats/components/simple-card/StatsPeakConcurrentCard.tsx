import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'

type Props = {
  count: number
  className?: string
}

export default function StatsPeakConcurrentCard({
  count,
  className
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  return (
    <StatsCard className={className}>
      <StatsCardHeader>Peak Concurrent</StatsCardHeader>
      <StatsCardContent subText={t('peakConcurrent')}>
        {count.toLocaleString()}
      </StatsCardContent>
    </StatsCard>
  )
}
