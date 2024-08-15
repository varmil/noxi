import { PropsWithoutRef } from 'react'
import { Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'components/styles/Image'

const scheduleData = {
  '10:00 AM': [
    {
      title: 'Welcome to DevCon 2023',
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
  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded flex items-center gap-1">
    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
    LIVE
  </div>
)

type Props = {
  title: string
  description: string
}

export default function Schedule({
  title,
  description
}: PropsWithoutRef<Props>) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
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
        <ScrollArea className="h-[300px] sm:h-[500px] pr-4">
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
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-[220px] h-[120px] rounded-lg overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                      {time === '10:00 AM' && <LiveBadge />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={item.avatar} />
                          <AvatarFallback>{item.channel[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {item.channel}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {item.viewers.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
