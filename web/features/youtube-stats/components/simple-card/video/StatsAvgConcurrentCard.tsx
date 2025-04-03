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

export default function StatsAvgConcurrentCard({
  count,
  className
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  return (
    <StatsCard className={className}>
      <StatsCardHeader>Average Concurrent</StatsCardHeader>
      <StatsCardContent subText={t('avgConcurrent')}>
        {count.toLocaleString()}
      </StatsCardContent>
    </StatsCard>
  )
}
