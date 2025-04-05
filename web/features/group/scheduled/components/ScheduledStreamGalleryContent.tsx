import { PropsWithoutRef } from 'react'
import { getFormatter, getTranslations } from 'next-intl/server'
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

export default async function ScheduledStreamGalleryContent({
  streams,
  compact
}: Props) {
  const t = await getTranslations('Features.stream')
  const channels = await getChannels({
    ids: streams.map(stream => stream.snippet.channelId),
    limit: streams.length
  })
  const groupedStreams = compact
    ? await getCompactGroupedStreams({ streams })
    : await getGroupedStreams({ streams })

  return (
    <GridCardGalleryContainer>
      {streams.length === 0 && (
        <p className="text-muted-foreground">{t('noScheduled')}</p>
      )}
      {/* Loop by date */}
      {Object.entries(groupedStreams).map(([date, events]) => {
        return (
          <GridCardGalleryContent key={date}>
            {events.map(stream => {
              const channel = channels.find(
                channel => channel.basicInfo.id === stream.snippet.channelId
              )
              if (!channel) return null
              return (
                <Stream
                  key={stream.videoId}
                  stream={stream}
                  channel={channel}
                />
              )
            })}
          </GridCardGalleryContent>
        )
      })}
    </GridCardGalleryContainer>
  )
}

/**
 * compact表示の場合、すべてのStreamsをlikeCountの降順でソートして
 * 最初のいくつかのみ表示。dateKeyは使わないので適当
 */
async function getCompactGroupedStreams({
  streams
}: {
  streams: StreamsSchema
}) {
  return {
    xxx: streams
      .sort((a, b) => {
        if (a.metrics.likes > b.metrics.likes) return -1
        if (a.metrics.likes < b.metrics.likes) return 1
        return 0
      })
      .slice(0, StreamGalleryPagination.COMPACT_PAGE_SIZE)
  }
}

/**
 * not-compact表示の場合、dateKeyごとに表示
 * dateKeyの中はstatistics.likeCountの降順
 */
async function getGroupedStreams({ streams }: { streams: StreamsSchema }) {
  const format = await getFormatter()
  let groupedStreams: Record<string, StreamsSchema> = {}

  streams.forEach(stream => {
    const scheduledStartTime = stream.streamTimes.scheduledStartTime
    if (!scheduledStartTime) return

    // 日付 (例: 9/1, 9/15)
    const dateKey = format.dateTime(new Date(scheduledStartTime), {
      month: 'numeric',
      day: 'numeric'
    })

    if (!groupedStreams[dateKey]) {
      groupedStreams[dateKey] = []
    }
    groupedStreams[dateKey].push(stream)
  })

  for (const dateKey in groupedStreams) {
    groupedStreams[dateKey].sort((a, b) => {
      if (a.metrics.likes > b.metrics.likes) return -1
      if (a.metrics.likes < b.metrics.likes) return 1
      return 0
    })
  }

  return groupedStreams
}
