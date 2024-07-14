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

export default function StatsViewsCard({ count }: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats')

  return (
    <Card>
      <StatsCardHeader Icon={Play}>Views</StatsCardHeader>
      <StatsCardContent subText={t('totalViews')}>
        <IntlNumberFormat>{count}</IntlNumberFormat>
      </StatsCardContent>
    </Card>
  )
}
