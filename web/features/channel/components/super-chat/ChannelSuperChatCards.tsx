import { PropsWithChildren } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { getSupersBundleSum } from 'apis/youtube/getSupersBundleSum'
import { getSupersSummary } from 'apis/youtube/getSupersSummary'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader
} from 'components/styles/card/StatsCard'
import { formatMicrosAsRoundedAmount } from 'utils/amount'

/**
 * SupersSummaryをまとめて表示するコンポーネント
 */
export default async function ChannelSuperChatCards({
  channelId,
  className
}: PropsWithChildren<{ channelId: string; className?: string }>) {
  const format = await getFormatter()
  const tg = await getTranslations('Global')
  const t = await getTranslations('Features.channel.superChat')
  const summary = await getSupersSummary(channelId)
  const sum = await getSupersBundleSum({ channelId })

  const createdAtText = `${format.relativeTime(
    summary.createdAt
  )}, ${format.dateTime(summary.createdAt, {
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  })}`

  return (
    <section className={'grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4'}>
      <StatsCard>
        <StatsCardHeader>
          <span>{tg('period.last24Hours')}</span>
          <Badge variant="destructive" className="flex items-center gap-1">
            Realtime
          </Badge>
        </StatsCardHeader>
        <StatsCardContent
          className="flex gap-1 items-center"
          subText={t('realtimeDescription')}
        >
          <JapaneseYen className="w-4 h-4" />
          {formatMicrosAsRoundedAmount(sum.amountMicros)}
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{tg('period.last7Days')}</StatsCardHeader>
        <StatsCardContent
          className="flex gap-1 items-center"
          subText={t('createdAt', { date: createdAtText })}
        >
          <JapaneseYen className="w-4 h-4" />
          {formatMicrosAsRoundedAmount(summary.last7Days)}
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{tg('period.last30Days')}</StatsCardHeader>
        <StatsCardContent
          className="flex gap-1 items-center"
          subText={t('createdAt', { date: createdAtText })}
        >
          <JapaneseYen className="w-4 h-4" />
          {formatMicrosAsRoundedAmount(summary.last30Days)}
        </StatsCardContent>
      </StatsCard>
    </section>
  )
}
