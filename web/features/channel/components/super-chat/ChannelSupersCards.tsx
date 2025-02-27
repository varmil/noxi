import { PropsWithChildren } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { getSupersBundleSum } from 'apis/youtube/getSupersBundleSum'
import { getSupersRankings } from 'apis/youtube/getSupersRankings'
import { getSupersSummary } from 'apis/youtube/getSupersSummary'
import { getSupersSummaryHistories } from 'apis/youtube/getSupersSummaryHistories'
import { RANK_HIGHLIGHTER_QS_KEY } from 'components/ranking/highlighter/rank-highlighter'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader,
  StatsCards
} from 'components/styles/card/StatsCard'
import Underline from 'components/styles/string/Underline'
import { ChannelsRankingPagination } from 'config/constants/Pagination'
import { Link } from 'lib/navigation'
import { Period } from 'types/period'
import { formatMicrosAsRoundedAmount } from 'utils/amount'
import { calcPercentageChange } from 'utils/math/math'
import { rangeDatetimeForPreviousPeriod } from 'utils/period/period'
import { getStartOf, getUpdatedAt } from 'utils/period/ranking'
import { createSearchParams } from 'utils/ranking/channels-ranking'

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
    <StatsCards>
      <StatsCard>
        <StatsCardHeader>
          <span>{global('period.last24Hours')}</span>
          <Badge variant="destructive" className="flex items-center gap-1">
            Realtime
          </Badge>
        </StatsCardHeader>
        <StatsCardContent
          className="flex gap-1 items-center"
          diff={calcPercentageChange(
            Number(sum.amountMicros),
            Number(previousLast24HoursSum.amountMicros)
          )}
          diffIsPercent
          subText={global('datetime.updatedAt', {
            updatedAt: format.relativeTime(
              getUpdatedAt('last24Hours', new Date()).toDate()
            )
          })}
        >
          <JapaneseYen className="w-4 h-4" />
          <LinkToRanking
            period="last24Hours"
            rank={last24HoursRank?.rank}
            channelId={channelId}
          >
            {formatMicrosAsRoundedAmount(sum.amountMicros)}
          </LinkToRanking>
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{global('period.last7Days')}</StatsCardHeader>
        <StatsCardContent
          className="flex gap-1 items-center"
          diff={calcPercentageChange(
            Number(summary.last7Days),
            Number(previousLast7DaysSummary?.last7Days ?? 0)
          )}
          diffIsPercent
          subText={global('datetime.updatedAt', {
            updatedAt: createdAtText
          })}
        >
          <JapaneseYen className="w-4 h-4" />
          <LinkToRanking
            period="last7Days"
            rank={last7DaysRank?.rank}
            channelId={channelId}
          >
            {formatMicrosAsRoundedAmount(summary.last7Days)}
          </LinkToRanking>
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{global('period.last30Days')}</StatsCardHeader>
        <StatsCardContent
          className="flex gap-1 items-center"
          diff={calcPercentageChange(
            Number(summary.last30Days),
            Number(previousLast30DaysSummary?.last30Days ?? 0)
          )}
          diffIsPercent
          subText={global('datetime.updatedAt', {
            updatedAt: createdAtText
          })}
        >
          <JapaneseYen className="w-4 h-4" />
          <LinkToRanking
            period="last30Days"
            rank={last30DaysRank?.rank}
            channelId={channelId}
          >
            {formatMicrosAsRoundedAmount(summary.last30Days)}
          </LinkToRanking>
        </StatsCardContent>
      </StatsCard>
    </StatsCards>
  )
}

/** rankが圏内ならばランキングページへリンク。圏外ならばリンクしない */
const LinkToRanking = ({
  period,
  rank,
  channelId,
  children
}: PropsWithChildren<{
  period: Period
  rank?: number
  channelId?: string
}>) => {
  if (!rank) {
    return <>{children}</>
  }

  const page = ChannelsRankingPagination.getPageFromRank(rank)
  const searchParams = createSearchParams({
    dimension: 'super-chat',
    period,
    page,
    channelId
  })
  return (
    <Link
      href={`/youtube/channels/ranking?${searchParams.toString()}`}
      prefetch={true}
    >
      <Underline>{children}</Underline>
    </Link>
  )
}
