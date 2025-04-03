import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'

type Props = {
  count: number
  className?: string
}

export default function StatsMembershipCountCard({
  count,
  className
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  return (
    <StatsCard className={className}>
      <StatsCardHeader>Membership Count</StatsCardHeader>
      <StatsCardContent subText={t('membershipCount')}>
        {count.toLocaleString()}
      </StatsCardContent>
    </StatsCard>
  )
}
