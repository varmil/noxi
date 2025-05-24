import { PropsWithChildren } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { getSupersBundleSum } from 'apis/youtube/getSupersBundleSum'
import { getSupersRankings } from 'apis/youtube/getSupersRankings'
import { getSupersSummary } from 'apis/youtube/getSupersSummary'
import { getSupersSummaryHistories } from 'apis/youtube/getSupersSummaryHistories'
import { RealtimeStatusBadge } from 'components/styles/badge/RealtimeStatusBadge'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader
} from 'components/styles/card/StatsCard'
import { Period } from 'types/period'
import { formatMicrosAsRoundedAmount } from 'utils/amount'
import { calcPercentageChange } from 'utils/math/math'
import { rangeDatetimeForPreviousPeriod } from 'utils/period/period'
import { getStartOf } from 'utils/period/ranking'
import LinkToRanking from './link/LinkToRanking'

/**
 * SupersSummaryをまとめて表示するコンポーネント
 */
export default async function ChannelSupersCards({
  channelId
}: PropsWithChildren<{ channelId: string; className?: string }>) {
  const rankingsParams = (period: Period) => ({
    channelId,
    period,
    rankingType: 'overall' as const
  })
  const historiesParams = (period: Period) => ({
    channelId,
    createdAfter: rangeDatetimeForPreviousPeriod(period).gte,
    createdBefore: rangeDatetimeForPreviousPeriod(period).lte,
    limit: 1
  })
  const [
    format,
    global,
    last24HoursRank,
    last7DaysRank,
    last30DaysRank,
    sum,
    summary,
    // ↓ Previous Priod Data
    previousLast24HoursSum,
    [previousLast7DaysSummary] = [undefined],
    [previousLast30DaysSummary] = [undefined]
  ] = await Promise.all([
    getFormatter(),
    getTranslations('Global'),
    getSupersRankings(rankingsParams('last24Hours')),
    getSupersRankings(rankingsParams('last7Days')),
    getSupersRankings(rankingsParams('last30Days')),
    getSupersBundleSum({
      channelId,
      createdAfter: getStartOf('last24Hours').toDate()
    }),
    getSupersSummary(channelId),
    // ↓ Previous Priod Data
    getSupersBundleSum(historiesParams('last24Hours')),
    getSupersSummaryHistories(historiesParams('last7Days')),
    getSupersSummaryHistories(historiesParams('last30Days'))
  ])

  return (
    <>
      <StatsCard>
        <StatsCardHeader>
          <span>{global('period.last24Hours')}</span>
          <RealtimeStatusBadge date={new Date()} />
        </StatsCardHeader>
        <StatsCardContent
          className="flex gap-1 items-center"
          diff={calcPercentageChange(
            Number(sum.amountMicros),
            Number(previousLast24HoursSum.amountMicros)
          )}
          diffIsPercent
          period="last24Hours"
        >
          <JapaneseYen className="w-4 h-4" />
          <LinkToRanking
            period="last24Hours"
            rank={last24HoursRank?.rank}
            highlightedChannelId={channelId}
          >
            {formatMicrosAsRoundedAmount(sum.amountMicros)}
          </LinkToRanking>
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>
          <span>{global('period.last7Days')}</span>
          <span className="text-xs font-light text-muted-foreground">
            {format.relativeTime(summary.createdAt)}
          </span>
        </StatsCardHeader>
        <StatsCardContent
          className="flex gap-1 items-center"
          diff={calcPercentageChange(
            Number(summary.last7Days),
            Number(previousLast7DaysSummary?.last7Days ?? 0)
          )}
          diffIsPercent
          period="last7Days"
        >
          <JapaneseYen className="w-4 h-4" />
          <LinkToRanking
            period="last7Days"
            rank={last7DaysRank?.rank}
            highlightedChannelId={channelId}
          >
            {formatMicrosAsRoundedAmount(summary.last7Days)}
          </LinkToRanking>
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>
          <span>{global('period.last30Days')}</span>
          <span className="text-xs font-light text-muted-foreground">
            {format.relativeTime(summary.createdAt)}
          </span>
        </StatsCardHeader>
        <StatsCardContent
          className="flex gap-1 items-center"
          diff={calcPercentageChange(
            Number(summary.last30Days),
            Number(previousLast30DaysSummary?.last30Days ?? 0)
          )}
          diffIsPercent
          period="last30Days"
        >
          <JapaneseYen className="w-4 h-4" />
          <LinkToRanking
            period="last30Days"
            rank={last30DaysRank?.rank}
            highlightedChannelId={channelId}
          >
            {formatMicrosAsRoundedAmount(summary.last30Days)}
          </LinkToRanking>
        </StatsCardContent>
      </StatsCard>
    </>
  )
}
