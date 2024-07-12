import { PropsWithoutRef } from 'react'
import { Play } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsCumulativeViewCard({
  count
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats')

  return (
    <Card>
      <StatsCardHeader Icon={Play}>Cumulative Views</StatsCardHeader>
      <StatsCardContent subText={t('totalVideoViews')}>
        <IntlNumberFormat>{count}</IntlNumberFormat>
      </StatsCardContent>
    </Card>
  )
}
