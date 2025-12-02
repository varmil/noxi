import { getTranslations } from 'next-intl/server'
import { getSupersBundleSum } from 'apis/supers/getSupersBundleSum'
import { getStreams } from 'apis/youtube/getStreams'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader
} from 'components/styles/card/StatsCard'
import dayjs from 'lib/dayjs'
import { getTotalAndAverageDuration } from 'utils/stream/calculateStreamDuration'
import { calculateMedian } from 'utils/stream/calculateStreamStats'

type Props = {
  channelId: string
}

export default async function ChannelOverviewStatsCards({
  channelId
}: Props) {
  const feat = await getTranslations('Features.channel.overview.stats')

  // 過去30日間のデータを並列で取得
  const thirtyDaysAgo = dayjs().subtract(30, 'days').toDate()

  const [superChatSum, streams] = await Promise.all([
    getSupersBundleSum({
      channelId,
      createdAfter: thirtyDaysAgo
    }),
    getStreams({
      status: 'ended',
      channelId,
      endedAfter: thirtyDaysAgo
    })
  ])

  // 中央値計算
  const medianViewers = calculateMedian(streams, 'avgConcurrentViewers')

  // 合計配信時間計算
  const { totalDuration } = getTotalAndAverageDuration(streams)
  const totalHours = Math.floor(totalDuration.asHours())
  const totalMinutes = totalDuration.minutes()

  // スパチャ収入をフォーマット（BigIntをNumberに変換）
  const superChatAmount = Number(superChatSum.amountMicros) / 1_000_000

  return (
    <>
      <StatsCard>
        <StatsCardHeader>{feat('superChatRevenue')}</StatsCardHeader>
        <StatsCardContent>
          {superChatAmount > 0
            ? `¥${superChatAmount.toLocaleString()}`
            : '---'}
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{feat('medianViewers')}</StatsCardHeader>
        <StatsCardContent>
          {medianViewers !== undefined
            ? Math.floor(medianViewers).toLocaleString()
            : '---'}
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{feat('totalStreamTime')}</StatsCardHeader>
        <StatsCardContent>
          {totalHours > 0 || totalMinutes > 0
            ? `${totalHours}h ${totalMinutes}m`
            : '---'}
        </StatsCardContent>
      </StatsCard>
    </>
  )
}
