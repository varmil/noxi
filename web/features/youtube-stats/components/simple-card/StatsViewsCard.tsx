import { PropsWithoutRef } from 'react'
import { TrendingUp } from 'lucide-react'
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
      <StatsCardHeader Icon={TrendingUp}>Views</StatsCardHeader>
      <StatsCardContent subText={t('totalViews')}>
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
