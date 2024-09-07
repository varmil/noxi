import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { CardContent } from '@/components/ui/card'
import { getChannels } from 'apis/youtube/getChannels'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import GridCardContainer from 'components/styles/GridCardContainer'
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
  const displayedStreams = compact ? streams.slice(0, 3) : streams

  return (
    <CardContent>
      <StreamListContentContainer compact={compact}>
        {streams.length === 0 && (
          <p className="text-muted-foreground">{t('noLive')}</p>
        )}

        <GridCardContainer>
          {displayedStreams.map(stream => {
            const channel = channels.find(
              channel => channel.basicInfo.id === stream.snippet.channelId
            )
            if (!channel) return null

            return (
              <Stream key={stream.videoId} stream={stream} channel={channel} />
            )
          })}
        </GridCardContainer>
      </StreamListContentContainer>
    </CardContent>
  )
}
