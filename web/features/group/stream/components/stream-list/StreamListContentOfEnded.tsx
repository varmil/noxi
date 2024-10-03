import { PropsWithoutRef } from 'react'
import { CardContent } from '@/components/ui/card'
import { getChannels } from 'apis/youtube/getChannels'
import { getStatistics } from 'apis/youtube/getStatistics'
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

  const displayedStreams = compact ? streams.slice(0, 3) : streams

  return (
    <CardContent>
      <StreamListContentContainer>
        <GridCardContainer>
          {displayedStreams.map(stream => {
            const channel = channels.find(
              channel => channel.basicInfo.id === stream.snippet.channelId
            )
            if (!channel) return null

            const video = statisticsList.find(
              stats => stats.id === stream.videoId
            )
            if (!video) return null

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
