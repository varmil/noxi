import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader,
  StatsCards
} from 'components/styles/card/StatsCard'
import {
  calculateMedian,
  calculateMax,
  calculateMin
} from 'utils/stream/calculateStreamStats'

export default function ChannelConcurrentViewersCards({
  streams
}: PropsWithChildren<{ streams: StreamsSchema }>) {
  const feat = useTranslations('Features.channel.concurrentViewers.card')

  return (
    <StatsCards className={'grid-cols-2 sm:grid-cols-3'}>
      <StatsCard className="col-span-full sm:col-span-1">
        <StatsCardHeader>{feat('median')}</StatsCardHeader>
        <StatsCardContent>
          {calculateMedian(streams, 'peakConcurrentViewers')?.toLocaleString() ??
            '---'}
        </StatsCardContent>
      </StatsCard>

      <StatsCard className="col-span-1">
        <StatsCardHeader>{feat('max')}</StatsCardHeader>
        <StatsCardContent>
          {calculateMax(streams, 'peakConcurrentViewers')?.toLocaleString() ??
            '---'}
        </StatsCardContent>
      </StatsCard>

      <StatsCard className="col-span-1">
        <StatsCardHeader>{feat('min')}</StatsCardHeader>
        <StatsCardContent>
          {calculateMin(streams, 'peakConcurrentViewers')?.toLocaleString() ??
            '---'}
        </StatsCardContent>
      </StatsCard>
    </StatsCards>
  )
}
