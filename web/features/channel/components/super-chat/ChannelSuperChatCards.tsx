import { PropsWithChildren } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
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
  const tg = await getTranslations('Global')
  const summary = await getSupersSummary(channelId)
  const sum = await getSupersBundleSum({ channelId })

  return (
    <section className={'grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4'}>
      <StatsCard>
        <StatsCardHeader>{tg('period.last24Hours')}</StatsCardHeader>
        <StatsCardContent className="flex gap-1 items-center">
          <JapaneseYen className="w-4 h-4" />
          {formatMicrosAsRoundedAmount(sum.amountMicros)}
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{tg('period.last7Days')}</StatsCardHeader>
        <StatsCardContent className="flex gap-1 items-center">
          <JapaneseYen className="w-4 h-4" />
          {formatMicrosAsRoundedAmount(summary.last7Days)}
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{tg('period.last30Days')}</StatsCardHeader>
        <StatsCardContent className="flex gap-1 items-center">
          <JapaneseYen className="w-4 h-4" />
          {formatMicrosAsRoundedAmount(summary.last30Days)}
        </StatsCardContent>
      </StatsCard>
    </section>
  )
}
