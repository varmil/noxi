import { PropsWithoutRef } from 'react'
import { CardContent } from '@/components/ui/card'
import { getStatistics } from 'apis/youtube/data-api/getStatistics'
import { getChannels } from 'apis/youtube/getChannels'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import GridCardContainer from 'components/styles/GridCardContainer'
import Stream from 'features/group/stream/components/Stream'
import StreamListContentContainer from 'features/group/stream/components/stream-list/StreamListContentContainer'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  compact?: boolean
}>

export default async function StreamListContentOfEnded({
  streams,
  compact
}: Props) {
  const [channels, statisticsList] = await Promise.all([
    getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
    getStatistics({ videoIds: streams.map(stream => stream.videoId) })
  ])

  return (
    <CardContent>
      <StreamListContentContainer>
        <GridCardContainer>
          {streams
            .map(stream => {
              const channel = channels.find(
                channel => channel.basicInfo.id === stream.snippet.channelId
              )
              if (!channel) return null

              const video = statisticsList.find(
                stats => stats.id === stream.videoId
              )
              if (!video) return null

              return { stream, channel, video }
            })
            .filter(item => item !== null)
            .slice(0, compact ? 3 : undefined)
            .map(({ stream, channel, video }) => {
              return (
                <Stream
                  key={stream.videoId}
                  stream={stream}
                  channel={channel}
                  statistics={video.statistics}
                />
              )
            })}
        </GridCardContainer>
      </StreamListContentContainer>
    </CardContent>
  )
}
