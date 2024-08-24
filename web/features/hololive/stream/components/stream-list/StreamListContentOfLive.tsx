import { PropsWithoutRef } from 'react'
import { CardContent } from '@/components/ui/card'
import { getChannels } from 'api/youtube/getChannels'
import { StreamsSchema } from 'api/youtube/schema/streamSchema'
import Stream from 'features/hololive/stream/components/Stream'
import StreamListContentContainer from 'features/hololive/stream/components/stream-list/StreamListContentContainer'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  compact?: boolean
}>

export default async function StreamListContentOfLive({
  streams,
  compact
}: Props) {
  const channels = await getChannels({
    ids: streams.map(stream => stream.snippet.channelId)
  })

  return (
    <CardContent>
      <StreamListContentContainer compact={compact}>
        {streams.map(stream => {
          const channel = channels.find(
            channel => channel.basicInfo.id === stream.snippet.channelId
          )
          if (!channel) return null

          return (
            <div key={stream.videoId} className="mb-6 last:mb-0">
              <Stream stream={stream} channel={channel} />
            </div>
          )
        })}
      </StreamListContentContainer>
    </CardContent>
  )
}
