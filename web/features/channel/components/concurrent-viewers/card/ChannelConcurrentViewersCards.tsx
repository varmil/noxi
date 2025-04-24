import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader,
  StatsCards
} from 'components/styles/card/StatsCard'

export default function ChannelConcurrentViewersCards({
  streams
}: PropsWithChildren<{ streams: StreamsSchema }>) {
  const feat = useTranslations('Features.channel.concurrentViewers.card')

  return (
    <StatsCards className={'grid-cols-2 sm:grid-cols-3'}>
      <StatsCard className="col-span-full sm:col-span-1">
        <StatsCardHeader>{feat('median')}</StatsCardHeader>
        <StatsCardContent>
          {median(streams)?.toLocaleString() ?? '---'}
        </StatsCardContent>
      </StatsCard>

      <StatsCard className="col-span-1">
        <StatsCardHeader>{feat('max')}</StatsCardHeader>
        <StatsCardContent>
          {max(streams)?.toLocaleString() ?? '---'}
        </StatsCardContent>
      </StatsCard>

      <StatsCard className="col-span-1">
        <StatsCardHeader>{feat('min')}</StatsCardHeader>
        <StatsCardContent>
          {min(streams)?.toLocaleString() ?? '---'}
        </StatsCardContent>
      </StatsCard>
    </StatsCards>
  )
}

const median = (streams: StreamsSchema) => {
  const viewers = streams
    .map(s => s.metrics.peakConcurrentViewers)
    .filter(v => typeof v === 'number')
  if (viewers.length === 0) return undefined
  viewers.sort((a, b) => a - b)
  const mid = Math.floor(viewers.length / 2)
  return viewers.length % 2 !== 0
    ? viewers[mid]
    : (viewers[mid - 1] + viewers[mid]) / 2
}

const max = (streams: StreamsSchema) => {
  const viewers = streams
    .map(s => s.metrics.peakConcurrentViewers)
    .filter(v => typeof v === 'number')
  if (viewers.length === 0) return undefined
  return Math.max(...viewers)
}

const min = (streams: StreamsSchema) => {
  const viewers = streams
    .map(s => s.metrics.peakConcurrentViewers)
    .filter(v => typeof v === 'number')
  if (viewers.length === 0) return undefined
  return Math.min(...viewers)
}
