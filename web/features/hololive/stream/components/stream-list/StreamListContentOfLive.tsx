import { PropsWithoutRef } from 'react'
import { CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getChannels } from 'api/youtube/getChannels'
import { StreamsSchema } from 'api/youtube/schema/streamSchema'
import Stream from 'features/hololive/stream/components/Stream'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
}>

export default async function StreamListContentOfLive({ streams }: Props) {
  const channels = await getChannels({
    ids: streams.map(stream => stream.snippet.channelId)
  })

  return (
    <CardContent>
      <ScrollArea className="h-[600px] sm:h-[750px] pr-4">
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
      </ScrollArea>
    </CardContent>
  )
}
