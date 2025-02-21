import { PropsWithChildren } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { getSupersBundleSum } from 'apis/youtube/getSupersBundleSum'
import { getSupersRankings } from 'apis/youtube/getSupersRankings'
import { getSupersSummary } from 'apis/youtube/getSupersSummary'
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
import { rangeDatetimeForPreviousPeriod } from 'utils/period/period'
import { getStartOf, getUpdatedAt } from 'utils/period/ranking'

/**
 * SupersSummaryをまとめて表示するコンポーネント
 */
export default async function ChannelSupersCards({
  channelId
}: PropsWithChildren<{ channelId: string; className?: string }>) {
  const baseParams = (period: Period) => ({
    channelId,
    period,
    rankingType: 'overall' as const
  })
  const [
    format,
    global,
    last24HoursRank,
    last7DaysRank,
    last30DaysRank,
    summary,
    sum,
    // ↓ Previous Priod Data
    previousLast24HoursSum
  ] = await Promise.all([
    getFormatter(),
    getTranslations('Global'),
    getSupersRankings(baseParams('last24Hours')),
    getSupersRankings(baseParams('last7Days')),
    getSupersRankings(baseParams('last30Days')),
    getSupersSummary(channelId),
    getSupersBundleSum({
      channelId,
      createdAtGTE: getStartOf('last24Hours').toDate()
    }),
    // ↓ Previous Priod Data
    getSupersBundleSum({
      channelId,
      createdAtGTE: rangeDatetimeForPreviousPeriod('last24Hours').gte,
      createdAtLTE: rangeDatetimeForPreviousPeriod('last24Hours').lte
    })
  ])

  console.log({ previousLast24HoursSum })

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
  const searchParams = new URLSearchParams({
    dimension: 'super-chat',
    period,
    ...(page && page >= 2 && { page: page.toString() }),
    ...(channelId && { [RANK_HIGHLIGHTER_QS_KEY]: channelId })
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
