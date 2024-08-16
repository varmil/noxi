import { PropsWithoutRef } from 'react'
import { getFormatter } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { getChannels } from 'api/youtube/getChannels'
import { StreamsSchema } from 'api/youtube/schema/streamSchema'
import Stream from 'features/hololive/stream/components/Stream'
import dayjs from 'lib/dayjs'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  // TODO: removeme after impl 本当はstream.status から取得すべき
  showLiveBadges?: boolean
}>

export default async function StreamListContent({
  streams,
  showLiveBadges
}: Props) {
  const channels = await getChannels({
    ids: streams.map(stream => stream.snippet.channelId)
  })

  const format = await getFormatter()

  const groupedStreams: Record<string, Record<string, StreamsSchema>> = {}

  streams.forEach(stream => {
    // 日付 (例: "08/16")
    const dateKey = format.dateTime(
      new Date(stream.streamTimes.scheduledStartTime),
      {
        month: '2-digit',
        day: '2-digit'
      }
    )

    // 時間 (例: "10:00 PM")
    const timeKey = format.dateTime(
      new Date(stream.streamTimes.scheduledStartTime),
      {
        hour: '2-digit',
        minute: '2-digit'
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

  return (
    <CardContent>
      <ScrollArea className="h-[500px] sm:h-[750px] pr-4">
        {Object.entries(groupedStreams).map(([date, record]) =>
          Object.entries(record).map(([time, events]) => (
            <div key={time} className="mb-8 last:mb-0">
              <div className="sticky -top-px bg-background py-2 z-20 flex items-center gap-4 mb-4">
                <div className={`text-xl sm:text-2xl font-bold`}>{time}</div>
                <Badge variant="outline">
                  {events.length > 1
                    ? `${events.length} events`
                    : `${events.length} event`}
                </Badge>
                <Separator className="flex-grow w-fit" />
                <div className="ml-auto text-muted-foreground">{date}</div>
              </div>
              {events.map(stream => {
                const channel = channels.find(
                  channel => channel.basicInfo.id === stream.snippet.channelId
                )
                if (!channel) return null

                return (
                  <div key={stream.videoId} className="mb-6 last:mb-0">
                    <Stream
                      time={time}
                      stream={stream}
                      channel={channel}
                      showLiveBadges={showLiveBadges}
                    />
                  </div>
                )
              })}
            </div>
          ))
        )}
      </ScrollArea>
    </CardContent>
  )
}
