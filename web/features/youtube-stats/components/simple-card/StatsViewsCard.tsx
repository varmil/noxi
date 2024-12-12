import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'

type Props = {
  count: bigint
}

export default function StatsViewsCard({ count }: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  return (
    <StatsCard>
      <StatsCardHeader>Views</StatsCardHeader>
      <StatsCardContent subText={t('totalViews')}>
        <IntlNumberFormat
          minimumSignificantDigits={1}
          maximumSignificantDigits={3}
        >
          {count}
        </IntlNumberFormat>
      </StatsCardContent>
    </StatsCard>
  )
}
