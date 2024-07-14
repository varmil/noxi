import { PropsWithoutRef } from 'react'
import { Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  count: number
}

export default function StatsSubscribersCard({
  count
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats')
  return (
    <Card>
      <StatsCardHeader Icon={Users}>Subscribers</StatsCardHeader>
      <StatsCardContent subText={t('totalSubscribers')}>
        <IntlNumberFormat>{count}</IntlNumberFormat>
      </StatsCardContent>
    </Card>
  )
}
