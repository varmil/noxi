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

const scheduleData = {
  '10:00 AM': [
    {
      title:
        'Welcome to DevCon 2023 / Welcome to DevCon 2023 / Welcome to DevCon 2023',
      channel: 'DevCon Official',
      thumbnail: '/placeholder.svg?height=120&width=220',
      avatar: '/placeholder.svg?height=40&width=40',
      viewers: 1500
    },
    {
      title: 'Getting Started with Web3',
      channel: 'Blockchain Basics',
      thumbnail: '/placeholder.svg?height=120&width=220',
      avatar: '/placeholder.svg?height=40&width=40',
      viewers: 2200
    }
  ],
  '11:00 AM': [
    {
      title: 'The Future of AI in Web Development',
      channel: 'TechTalks',
      thumbnail: '/placeholder.svg?height=120&width=220',
      avatar: '/placeholder.svg?height=40&width=40',
      viewers: 3200
    }
  ],
  '12:00 PM': [
    {
      title: 'Building Scalable Microservices',
      channel: 'Cloud Experts',
      thumbnail: '/placeholder.svg?height=120&width=220',
      avatar: '/placeholder.svg?height=40&width=40',
      viewers: 2800
    }
  ],
  '1:00 PM': [
    {
      title: 'Lunch Break & Networking',
      channel: 'DevCon Official',
      thumbnail: '/placeholder.svg?height=120&width=220',
      avatar: '/placeholder.svg?height=40&width=40',
      viewers: 1000
    }
  ],
  '2:00 PM': [
    {
      title: "React 18: What's New and Exciting",
      channel: 'React Masters',
      thumbnail: '/placeholder.svg?height=120&width=220',
      avatar: '/placeholder.svg?height=40&width=40',
      viewers: 4500
    },
    {
      title: 'GraphQL vs REST: A Practical Comparison',
      channel: 'API Enthusiasts',
      thumbnail: '/placeholder.svg?height=120&width=220',
      avatar: '/placeholder.svg?height=40&width=40',
      viewers: 3800
    }
  ],
  '3:00 PM': [
    {
      title: 'Optimizing Performance in Large-Scale Apps',
      channel: 'Performance Gurus',
      thumbnail: '/placeholder.svg?height=120&width=220',
      avatar: '/placeholder.svg?height=40&width=40',
      viewers: 3800
    }
  ],
  '4:00 PM': [
    {
      title: 'The Art of Clean Code',
      channel: 'Code Aesthetics',
      thumbnail: '/placeholder.svg?height=120&width=220',
      avatar: '/placeholder.svg?height=40&width=40',
      viewers: 3100
    }
  ],
  '5:00 PM': [
    {
      title: 'Closing Keynote: The Road Ahead',
      channel: 'DevCon Official',
      thumbnail: '/placeholder.svg?height=120&width=220',
      avatar: '/placeholder.svg?height=40&width=40',
      viewers: 5000
    }
  ]
}

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
    limit: 100,
    scehduledAfter: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    // +24 hours from now
    scehduledBefore: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  })
  const channels = await getChannels({
    ids: streams.map(stream => stream.snippet.channelId)
  })

  const groupedStreams: Record<string, StreamsSchema> = {}
  streams.forEach(stream => {
    // `scheduledStartTime` を1時間に丸めた時間に変換
    const timeKey = dayjs(stream.streamTimes.scheduledStartTime).format(
      'hh:00 A'
    )

    if (!groupedStreams[timeKey]) {
      groupedStreams[timeKey] = []
    }
    groupedStreams[timeKey].push(stream)
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
          {Object.entries(groupedStreams).map(([time, events]) => (
            <div key={time} className="mb-8 last:mb-0">
              <div className="sticky top-0 bg-background py-2 z-10 flex items-center gap-4 mb-4">
                <div className={`text-xl sm:text-2xl font-bold`}>{time}</div>
                <Badge variant="outline">
                  {events.length > 1
                    ? `${events.length} events`
                    : `${events.length} event`}
                </Badge>
                <Separator className="flex-grow w-fit" />
                <div className="ml-auto text-muted-foreground">
                  {dayjs(events[0].streamTimes.scheduledStartTime).format(
                    'MM/DD'
                  )}
                </div>
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
          ))}
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
