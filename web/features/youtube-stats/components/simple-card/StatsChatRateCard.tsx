import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number | string
}

export default function StatsChatRateCard({ count }: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  const c = typeof count === 'number' ? count.toFixed(1) : count
  return (
    <Card>
      <StatsCardHeader>Chat Rate</StatsCardHeader>
      <StatsCardContent subText={t('chatRate')}>{c}</StatsCardContent>
    </Card>
  )
}
