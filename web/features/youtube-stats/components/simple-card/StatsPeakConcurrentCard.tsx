import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

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
    <Card className={className}>
      <StatsCardHeader>Peak Concurrent</StatsCardHeader>
      <StatsCardContent subText={t('peakConcurrent')}>
        {count.toLocaleString()}
      </StatsCardContent>
    </Card>
  )
}
