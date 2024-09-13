import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getChannel } from 'apis/youtube/getChannel'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'

export default async function StreamBasicInfo({
  stream
}: {
  stream: StreamSchema
}) {
  const {
    videoId,
    snippet: { title, channelId },
    metrics: {
      peakConcurrentViewers,
      avgConcurrentViewers,
      chatMessages,
      views,
      likes
    },
    group
  } = stream
  const { basicInfo, statistics } = await getChannel(channelId)

  return (
    <section className="space-y-4">
      <h1 className="text-lg sm:text-xl font-bold">{title}</h1>
      <div className="flex items-center space-x-2">
        <Avatar className="w-7 h-7 sm:w-11 sm:h-11">
          <AvatarImage
            src={basicInfo.thumbnails.medium?.url}
            alt={basicInfo.title}
          />
          <AvatarFallback>{basicInfo.title}</AvatarFallback>
        </Avatar>
        <div>
          <p className="grid grid-cols-5 gap-x-0.5 items-center">
            <span className="col-span-4 font-semibold">{basicInfo.title}</span>
            <span className="col-span-1 text-sm text-muted-foreground">
              <IntlNumberFormat>{statistics.subscriberCount}</IntlNumberFormat>
            </span>
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline">
          <ThumbsUp className="mr-2 h-4 w-4" />
          <IntlNumberFormat>{likes}</IntlNumberFormat>
        </Button>
        <Button variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          <IntlNumberFormat>{chatMessages}</IntlNumberFormat>
        </Button>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </div>
    </section>
  )
}
