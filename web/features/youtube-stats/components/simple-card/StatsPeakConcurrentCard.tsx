import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsPeakConcurrentCard({
  count
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  return (
    <Card>
      <StatsCardHeader>Peak Concurrent</StatsCardHeader>
      <StatsCardContent subText={t('peakConcurrent')}>
        {count.toLocaleString()}
      </StatsCardContent>
    </Card>
  )
}
