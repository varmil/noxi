import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import { SuperChatsSchema } from 'apis/youtube/schema/superChatSchema'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'
import { calculateTotalInJPY } from '../../../../utils/exchange-rates'

type Props = {
  data: SuperChatsSchema
  className?: string
}

export default async function StatsSuperChatTotalAmountCard({
  data,
  className
}: PropsWithoutRef<Props>) {
  const [t, formatter] = await Promise.all([
    getTranslations('Features.youtube.stats.card'),
    getFormatter()
  ])
  const total = formatter.number(
    BigInt((await calculateTotalInJPY(data)).toFixed(0))
  )

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
