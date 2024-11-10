import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Card } from '@/components/ui/card'
import { getSuperChats } from 'apis/youtube/getSuperChats'
import { calculateTotalInJPY } from '../../../../utils/exchange-rates'
import StatsCardContent from './StatsCardContent'
import StatsCardHeader from './StatsCardHeader'

type Props = {
  videoId: string
  className?: string
}

export default async function StatsSuperChatTotalAmountCard({
  videoId,
  className
}: PropsWithoutRef<Props>) {
  // TODO: 本当はサーバーサイドで計算したいかも
  const [chats, t] = await Promise.all([
    getSuperChats({
      videoId,
      orderBy: [{ field: 'tier', order: 'desc' }],
      limit: 2000
    }),
    getTranslations('Features.youtube.stats.card')
  ])

  return (
    <Card className={className}>
      <StatsCardHeader>Super Chat</StatsCardHeader>
      <StatsCardContent subText={t('totalSuperChats')}>
        <div className="flex items-center space-x-0.5">
          <JapaneseYen className="h-4 w-4" />
          <span>
            {Math.round(await calculateTotalInJPY(chats)).toLocaleString()}
          </span>
        </div>
      </StatsCardContent>
    </Card>
  )
}
