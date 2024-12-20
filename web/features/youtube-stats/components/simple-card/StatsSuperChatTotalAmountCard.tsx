import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import {
  StatsCardHeader,
  StatsCardContent,
  StatsCard
} from 'components/styles/card/StatsCard'
import { calculateTotalInJPY } from '../../../../utils/exchange-rates'

type Props = {
  videoId: string
  className?: string
}

export default async function StatsSuperChatTotalAmountCard({
  videoId,
  className
}: PropsWithoutRef<Props>) {
  // TODO: 本当はサーバーサイドで計算したいかも
  const [chats, t, formatter] = await Promise.all([
    getSuperChats({
      videoId,
      orderBy: [{ field: 'amountMicros', order: 'desc' }],
      limit: 2000
    }),
    getTranslations('Features.youtube.stats.card'),
    getFormatter()
  ])
  const total = formatter.number(
    BigInt((await calculateTotalInJPY(chats)).toFixed(0))
    // {
    //   style: 'currency',
    //   currency: 'JPY'
    // }
  )

  if (!chats.length) {
    return null
  }

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
