import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { CardContent } from '@/components/ui/card'
import { getLiveStreamingDetails } from 'apis/youtube/data-api/getLiveStreamingDetails'
import { getChannels } from 'apis/youtube/getChannels'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  GridCardGalleryContent,
  GridCardGalleryFirstView
} from 'components/styles/GridCardContainer'
import Stream from 'features/group/stream/components/Stream'
import { STREAM_GALLERY_COMPACT_LIMIT } from 'features/group/types/stream-gallery'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  compact?: boolean
}>

export default async function LiveStreamGalleryContent({
  streams,
  compact
}: Props) {
  const [t, channels, liveStreamingDetailsList] = await Promise.all([
    getTranslations('Features.stream'),
    getChannels({
      ids: streams.map(stream => stream.snippet.channelId),
      limit: streams.length
    }),
    getLiveStreamingDetails({ videoIds: streams.map(stream => stream.videoId) })
  ])

  const displayedStreams = compact
    ? streams.slice(0, STREAM_GALLERY_COMPACT_LIMIT)
    : streams

  return (
    <CardContent>
      <GridCardGalleryContent>
        {streams.length === 0 && (
          <p className="text-muted-foreground">{t('noLive')}</p>
        )}

        <GridCardGalleryFirstView>
          {displayedStreams.map(stream => {
            const channel = channels.find(
              channel => channel.basicInfo.id === stream.snippet.channelId
            )
            if (!channel) return null

            const { liveStreamingDetails } =
              liveStreamingDetailsList.find(
                liveStreamingDetails =>
                  liveStreamingDetails.id === stream.videoId
              ) || {}

            return (
              <Stream
                key={stream.videoId}
                stream={stream}
                channel={channel}
                liveStreamingDetails={liveStreamingDetails}
              />
            )
          })}
        </GridCardGalleryFirstView>
      </GridCardGalleryContent>
    </CardContent>
  )
}
