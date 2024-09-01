import { PropsWithoutRef } from 'react'
import { headers } from 'next/headers'
import { getFormatter, getTranslations } from 'next-intl/server'
import { CardContent } from '@/components/ui/card'
import { getChannels } from 'api/youtube/getChannels'
import { StreamsSchema } from 'api/youtube/schema/streamSchema'
import DynamicClockIcon from 'components/icons/DynamicClockIcon'
import GridCardContainer from 'components/styles/GridCardContainer'
import Stream from 'features/group/stream/components/Stream'
import StreamListContentContainer from 'features/group/stream/components/stream-list/StreamListContentContainer'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  compact?: boolean
}>

export default async function StreamListContentOfScheduled({
  streams,
  compact
}: Props) {
  const t = await getTranslations('Features.stream')
  const channels = await getChannels({
    ids: streams.map(stream => stream.snippet.channelId)
  })
  const groupedStreams = await getGroupedStreams({
    streams,
    compact
  })

  return (
    <CardContent>
      <StreamListContentContainer compact={compact}>
        {streams.length === 0 && (
          <p className="text-muted-foreground">{t('noScheduled')}</p>
        )}
        {Object.entries(groupedStreams).map(([date, record]) =>
          Object.entries(record).map(([time, events]) => (
            <div key={time} className="mb-8 last:mb-0">
              <div className="sticky -top-px bg-background py-0 z-20 flex items-center gap-4 pb-3">
                <DynamicClockIcon hour={parseInt(time)} />
                <div className={`text-xl sm:text-2xl font-bold`}>{time}</div>
                <div className="ml-auto text-muted-foreground">{date}</div>
              </div>

              <GridCardContainer>
                {events.map(stream => {
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
              </GridCardContainer>
            </div>
          ))
        )}
      </StreamListContentContainer>
    </CardContent>
  )
}

/**
 * compact表示の場合、最初のいくつかの時間帯のみ表示
 * streamsは下記でソート済
 * orderBy: [{ field: 'scheduledStartTime', order: 'asc' }]
 */
async function getGroupedStreams({
  streams,
  compact
}: {
  streams: StreamsSchema
  compact?: boolean
}) {
  const format = await getFormatter()
  const timezone = headers().get('x-vercel-ip-timezone')
  let groupedStreams: Record<string, Record<string, StreamsSchema>> = {}

  const displayedStreams = compact ? streams.slice(0, 4) : streams
  displayedStreams.forEach(stream => {
    // 相対時間 (例: "19時間前")
    const dateKey = format.relativeTime(
      new Date(stream.streamTimes.scheduledStartTime)
    )

    // 時刻 (例: "10:00 PM")
    const timeKey = format.dateTime(
      new Date(stream.streamTimes.scheduledStartTime),
      {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone ?? 'Asia/Tokyo'
      }
    )

    if (!groupedStreams[dateKey]) {
      groupedStreams[dateKey] = {}
    }
    if (!groupedStreams[dateKey][timeKey]) {
      groupedStreams[dateKey][timeKey] = []
    }
    groupedStreams[dateKey][timeKey].push(stream)
  })

  return groupedStreams
}
