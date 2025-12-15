import { PropsWithChildren } from 'react'
import { getTranslations } from 'next-intl/server'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader,
  StatsCards
} from 'components/styles/card/StatsCard'
import { getTotalAndAverageDuration } from 'utils/stream/calculateStreamDuration'

/**
 * 配信回数や合計配信時間をまとめて表示するコンポーネント
 */
export default async function ChannelStreamTimesCards({
  streams
}: PropsWithChildren<{ streams: StreamsSchema; className?: string }>) {
  const feat = await getTranslations('Features.channel.streamTimes.card')
  const { totalDuration, averageDuration } = getTotalAndAverageDuration(streams)
  const totalHours = Math.floor(totalDuration.asHours())
  const totalMinutes = totalDuration.minutes()

  return (
    <StatsCards>
      <StatsCard>
        <StatsCardHeader>
          <span>{feat('count')}</span>
        </StatsCardHeader>
        <StatsCardContent>{streams.length}</StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{feat('totalDuration')}</StatsCardHeader>
        <StatsCardContent>
          <span>
            {totalHours}h {totalMinutes}m
          </span>
        </StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{feat('averageDuration')}</StatsCardHeader>
        <StatsCardContent>
          <span>{averageDuration.format('H[h] m[m]')}</span>
        </StatsCardContent>
      </StatsCard>
    </StatsCards>
  )
}
