import { PropsWithoutRef } from 'react'
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getChannel } from 'apis/youtube/getChannel'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'

const embed_domain =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || 'localhost'

type Props = {
  stream: StreamSchema
}

export default async function YoutubeLiveTemplate({
  stream
}: PropsWithoutRef<Props>) {
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

  const relatedVideos = [
    {
      id: 1,
      title: 'Related Video 1',
      channel: 'Channel A',
      views: '1M views',
      thumbnail: '/placeholder.svg?height=94&width=168'
    },
    {
      id: 2,
      title: 'Related Video 2',
      channel: 'Channel B',
      views: '500K views',
      thumbnail: '/placeholder.svg?height=94&width=168'
    },
    {
      id: 3,
      title: 'Related Video 3',
      channel: 'Channel C',
      views: '750K views',
      thumbnail: '/placeholder.svg?height=94&width=168'
    },
    {
      id: 4,
      title: 'Related Video 4',
      channel: 'Channel D',
      views: '2M views',
      thumbnail: '/placeholder.svg?height=94&width=168'
    },
    {
      id: 5,
      title: 'Related Video 5',
      channel: 'Channel E',
      views: '1.5M views',
      thumbnail: '/placeholder.svg?height=94&width=168'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* タイトル、投稿者情報 */}
        <section className="hidden md:block space-y-4">
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
                <span className="col-span-4 font-semibold">
                  {basicInfo.title}
                </span>
                <span className="col-span-1 text-sm text-muted-foreground">
                  <IntlNumberFormat>
                    {statistics.subscriberCount}
                  </IntlNumberFormat>
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
      </div>

      <div className="space-y-4">
        {/* Chat */}
        <section className="h-[400px] rounded-md border">
          <iframe
            src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${embed_domain}`}
            allow=""
            allowFullScreen
            className="w-full h-full rounded-md"
          ></iframe>
        </section>
        {/* Related Videos */}
        <div className="bg-secondary rounded-lg p-4 space-y-4">
          <h2 className="text-xl font-semibold">Related Videos</h2>
          <ScrollArea className="h-[400px]">
            {relatedVideos.map(video => (
              <div key={video.id} className="flex space-x-2 mb-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-40 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.channel}</p>
                  <p className="text-sm text-gray-500">{video.views}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
