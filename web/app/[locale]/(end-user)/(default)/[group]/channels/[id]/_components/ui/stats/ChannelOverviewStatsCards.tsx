import { getTranslations } from 'next-intl/server'
import { getSupersSummary } from 'apis/supers/getSupersSummary'
import { getStreams } from 'apis/youtube/getStreams'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader
} from 'components/styles/card/StatsCard'
import dayjs from 'lib/dayjs'
import { formatMicrosAsRoundedAmount } from 'utils/amount'
import { getTotalAndAverageDuration } from 'utils/stream/calculateStreamDuration'
import { calculateMedian } from 'utils/stream/calculateStreamStats'

type Props = {
  channelId: string
}

export default async function ChannelOverviewStatsCards({
  channelId
}: Props) {
  const feat = await getTranslations('Features.channel.overview.stats')
  const [summary, streams] = await Promise.all([
    getSupersSummary(channelId),
    getStreams({
      status: 'ended',
      channelId,
      endedAfter:  dayjs().subtract(30, 'days').toDate()
    })
  ])

  // 中央値計算
  const medianViewers = calculateMedian(streams, 'peakConcurrentViewers')

  // 合計配信時間計算
  const { totalDuration } = getTotalAndAverageDuration(streams)
  const totalHours = Math.floor(totalDuration.asHours())
  const totalMinutes = totalDuration.minutes()

  // スパチャ収入をフォーマット（BigIntをNumberに変換）
  const superChatAmount = formatMicrosAsRoundedAmount(summary.last30Days)

  return (
    <>
      <StatsCard>
        <StatsCardHeader>{feat('superChatRevenue')}</StatsCardHeader>
        <StatsCardContent>
          {superChatAmount
            ? `¥${superChatAmount.toLocaleString()}`
            : '---'}
        </StatsCardContent>
      </StatsCard>

      <div className='flex gap-2'>
        <StatsCard className='flex-1'>
          <StatsCardHeader>{feat('medianViewers')}</StatsCardHeader>
          <StatsCardContent>
            {medianViewers !== undefined
              ? Math.floor(medianViewers).toLocaleString()
              : '---'}
          </StatsCardContent>
        </StatsCard>

        <StatsCard className='flex-1'>
          <StatsCardHeader>{feat('totalStreamTime')}</StatsCardHeader>
          <StatsCardContent>
            {totalHours > 0 || totalMinutes > 0
              ? `${totalHours}h ${totalMinutes}m`
              : '---'}
          </StatsCardContent>
        </StatsCard>
      </div>
    </>
  )
}
