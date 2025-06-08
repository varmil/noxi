import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getSupersBundles } from 'apis/supers/getSupersBundles'
import { getLiveStreamingDetails } from 'apis/youtube/data-api/getLiveStreamingDetails'
import { getChannels } from 'apis/youtube/getChannels'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import {
  GridCardGalleryContainer,
  GridCardGalleryContent
} from 'components/styles/GridCardContainer'
import { StreamGalleryPagination } from 'config/constants/Pagination'
import Stream from 'features/group/stream/components/Stream'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  compact?: boolean
}>

export default async function LiveStreamGalleryContent({
  streams,
  compact
}: Props) {
  const [t, channels, liveStreamingDetailsList, supersBundles] =
    await Promise.all([
      getTranslations('Features.stream'),
      getChannels({
        ids: streams.map(stream => stream.snippet.channelId),
        limit: streams.length
      }),
      getLiveStreamingDetails({
        videoIds: streams.map(stream => stream.videoId)
      }),
      getSupersBundles({
        videoIds: streams.map(stream => stream.videoId),
        limit: streams.length
      })
    ])

  const displayedStreams = compact
    ? streams.slice(0, StreamGalleryPagination.COMPACT_PAGE_SIZE)
    : streams

  return (
    <GridCardGalleryContainer>
      {streams.length === 0 && (
        <p className="text-muted-foreground">{t('noLive')}</p>
      )}

      <GridCardGalleryContent force1Row={compact}>
        {displayedStreams.map(stream => {
          const channel = channels.find(
            channel => channel.basicInfo.id === stream.snippet.channelId
          )
          if (!channel) return null

          const { liveStreamingDetails } =
            liveStreamingDetailsList.find(
              liveStreamingDetails => liveStreamingDetails.id === stream.videoId
            ) || {}

          const bundle = supersBundles.find(
            bundle => bundle.videoId === stream.videoId
          )

          return (
            <Stream
              key={stream.videoId}
              stream={stream}
              channel={channel}
              liveStreamingDetails={liveStreamingDetails}
              supersBundle={bundle}
            />
          )
        })}
      </GridCardGalleryContent>
    </GridCardGalleryContainer>
  )
}
