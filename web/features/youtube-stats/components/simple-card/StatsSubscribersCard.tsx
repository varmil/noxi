import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsSubscribersCard({
  count
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  return (
    <Card>
      <StatsCardHeader>Subscribers</StatsCardHeader>
      <StatsCardContent subText={t('totalSubscribers')}>
        <IntlNumberFormat
          minimumSignificantDigits={1}
          maximumSignificantDigits={4}
        >
          {count}
        </IntlNumberFormat>
      </StatsCardContent>
    </Card>
  )
}
