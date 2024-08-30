import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { CardContent } from '@/components/ui/card'
import { getChannels } from 'api/youtube/getChannels'
import { StreamsSchema } from 'api/youtube/schema/streamSchema'
import Stream from 'features/group/stream/components/Stream'
import StreamListContentContainer from 'features/group/stream/components/stream-list/StreamListContentContainer'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  compact?: boolean
}>

export default async function StreamListContentOfLive({
  streams,
  compact
}: Props) {
  const t = await getTranslations('Features.stream')
  const channels = await getChannels({
    ids: streams.map(stream => stream.snippet.channelId)
  })

  return (
    <CardContent>
      <StreamListContentContainer compact={compact}>
        {streams.length === 0 && (
          <p className="text-muted-foreground">{t('noLive')}</p>
        )}
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
