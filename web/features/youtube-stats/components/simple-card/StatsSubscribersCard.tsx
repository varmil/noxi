import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'

type Props = {
  count: number
}

export default function StatsSubscribersCard({
  count
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  return (
    <StatsCard>
      <StatsCardHeader>Subscribers</StatsCardHeader>
      <StatsCardContent subText={t('totalSubscribers')}>
        <IntlNumberFormat
          minimumSignificantDigits={1}
          maximumSignificantDigits={4}
        >
          {count}
        </IntlNumberFormat>
      </StatsCardContent>
    </StatsCard>
  )
}
