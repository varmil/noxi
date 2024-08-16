import { PropsWithoutRef } from 'react'
import { List } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { getChannels } from 'api/youtube/getChannels'
import { getStreams } from 'api/youtube/getStreams'
import { StreamsSchema } from 'api/youtube/schema/streamSchema'
import Image from 'components/styles/Image'
import ScheduledStream from 'features/hololive/schedule/components/ScheduledStream'
import dayjs from 'lib/dayjs'

type Props = {
  title: string
  description: string
}

export default async function Schedule({
  title,
  description
}: PropsWithoutRef<Props>) {
  const streams = await getStreams({
    status: 'scheduled',
    scehduledAfter: new Date(),
    // +24 hours from now
    scehduledBefore: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    orderBy: [{ field: 'scheduledStartTime', order: 'asc' }],
    limit: 100
  })
  const channels = await getChannels({
    ids: streams.map(stream => stream.snippet.channelId)
  })

  const groupedStreams: Record<string, Record<string, StreamsSchema>> = {}

  streams.forEach(stream => {
    // 日付 (例: "08/16")
    const dateKey = dayjs(stream.streamTimes.scheduledStartTime).format('MM/DD')
    // 時間 (例: "10:00 PM")
    const timeKey = dayjs(stream.streamTimes.scheduledStartTime).format(
      'hh:00 A'
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
    <Card>
      <CardHeader className="p-4 pb-1 sm:p-6">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Image
              src={'/hololiveicon.png'}
              alt={`Hololive icon`}
              width={100}
              height={100}
              className="w-6 h-6"
            />
            <span className="inline">{title}</span>
            <span className="hidden">{description}</span>
          </span>
          <Badge variant="secondary" className="flex items-center gap-1">
            Scheduled
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] sm:h-[750px] pr-4">
          {Object.entries(groupedStreams).map(([date, record]) =>
            Object.entries(record).map(([time, events]) => (
              <div key={time} className="mb-8 last:mb-0">
                <div className="sticky top-0 bg-background py-2 z-10 flex items-center gap-4 mb-4">
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
                      <ScheduledStream
                        time={time}
                        stream={stream}
                        channel={channel}
                      />
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 pt-0">
        <Button variant="outline" className="w-full">
          <List className="mr-2 h-4 w-4" /> Go to full list
        </Button>
      </CardFooter>
    </Card>
  )
}
