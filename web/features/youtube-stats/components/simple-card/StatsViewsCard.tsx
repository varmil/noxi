import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsViewsCard({ count }: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  return (
    <Card>
      <StatsCardHeader>Views</StatsCardHeader>
      <StatsCardContent subText={t('totalViews')}>
        <IntlNumberFormat
          minimumSignificantDigits={1}
          maximumSignificantDigits={3}
        >
          {count}
        </IntlNumberFormat>
      </StatsCardContent>
    </Card>
  )
}
