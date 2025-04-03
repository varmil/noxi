import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'
import { formatMicrosAsRoundedAmount } from 'utils/amount'

type Props = {
  amountMicros?: bigint
  className?: string
}

export default function StatsMembershipAmountCard({
  amountMicros,
  className
}: PropsWithoutRef<Props>) {
  const t = useTranslations('Features.youtube.stats.card')
  const total = formatMicrosAsRoundedAmount(amountMicros ?? BigInt(0))

  return (
    <StatsCard className={className}>
      <StatsCardHeader>Membership</StatsCardHeader>
      <StatsCardContent subText={t('membershipAmount')}>
        <div className="flex items-center space-x-0.5">
          <JapaneseYen className="h-4 w-4" />
          <span>{total}</span>
        </div>
      </StatsCardContent>
    </StatsCard>
  )
}
