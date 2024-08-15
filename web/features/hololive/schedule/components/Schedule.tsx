import { PropsWithoutRef } from 'react'
import { List } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { getStreams } from 'api/youtube/getStreams'
import Image from 'components/styles/Image'

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

const LiveBadge = () => (
  <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded flex items-center gap-1">
    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
    LIVE
  </div>
)

const SmallLiveBadge = () => (
  <div className="text-xs text-white bg-red-600 py-0.5 px-1 rounded -mt-1 z-10">
    LIVE
  </div>
)

type Props = {
  title: string
  description: string
}

export default async function Schedule({
  title,
  description
}: PropsWithoutRef<Props>) {
  const streams = await getStreams({ status: 'scheduled', limit: 100 })

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
          <Badge variant="destructive" className="flex items-center gap-1">
            LIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] sm:h-[750px] pr-4">
          {Object.entries(scheduleData).map(([time, events]) => (
            <div key={time} className="mb-8 last:mb-0">
              <div className="sticky top-0 bg-background py-2 z-10 flex items-center gap-4 mb-4">
                <div className={`text-xl sm:text-2xl font-bold`}>{time}</div>
                <Badge variant="outline">
                  {events.length > 1
                    ? `${events.length} events`
                    : `${events.length} event`}
                </Badge>
              </div>
              {events.map((item, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <div className="relative aspect-video w-full sm:w-[220px] rounded-lg overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                      {time === '10:00 AM' && <LiveBadge />}
                    </div>
                    <div className="flex-1 grid grid-cols-[auto,1fr,auto] gap-x-3 gap-y-1">
                      <div className="items-center text-center">
                        <Avatar className="w-9 h-9 sm:w-11 sm:h-11">
                          <AvatarImage src={item.avatar} />
                          <AvatarFallback>{item.channel[0]}</AvatarFallback>
                        </Avatar>
                        {time === '10:00 AM' && <SmallLiveBadge />}
                      </div>
                      <div>
                        <h3 className="text-sm line-clamp-2 mb-1">
                          {item.title}
                        </h3>
                        <div className="col-start-2 flex items-center gap-1">
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {item.channel} - {item.viewers.toLocaleString()}{' '}
                            watching
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
