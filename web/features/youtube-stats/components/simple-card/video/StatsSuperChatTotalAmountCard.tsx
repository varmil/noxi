import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
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

export default async function StatsSuperChatTotalAmountCard({
  amountMicros,
  className
}: PropsWithoutRef<Props>) {
  const [t] = await Promise.all([
    getTranslations('Features.youtube.stats.card')
  ])
  const total = formatMicrosAsRoundedAmount(amountMicros ?? BigInt(0))

  return (
    <StatsCard className={className}>
      <StatsCardHeader>Super Chat</StatsCardHeader>
      <StatsCardContent subText={t('totalSuperChats')}>
        <div className="flex items-center space-x-0.5">
          <JapaneseYen className="h-4 w-4" />
          <span>{total}</span>
        </div>
      </StatsCardContent>
    </StatsCard>
  )
}
