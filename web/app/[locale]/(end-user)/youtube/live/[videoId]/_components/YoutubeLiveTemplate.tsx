import { PropsWithoutRef } from 'react'
import { ThumbsUp, MessageSquare, Share2, MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'

const embed_domain =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || 'localhost'

type Props = {
  stream: StreamSchema
}

export default function YoutubeLiveTemplate({
  stream
}: PropsWithoutRef<Props>) {
  const {
    videoId,
    snippet: { title },
    metrics: {
      peakConcurrentViewers,
      avgConcurrentViewers,
      chatMessages,
      views,
      likes
    },
    group
  } = stream

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
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Channel Name"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Channel Name</p>
              <p className="text-sm text-gray-500">1.2M subscribers</p>
            </div>
          </div>
          <Button>Subscribe</Button>
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
          <Button variant="outline">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <section className="h-[600px] rounded-md border">
          <iframe
            src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${embed_domain}`}
            //   src={`https://www.youtube.com/live_chat_replay?continuation=op2w0wR1Gl5DaWtxSndvWVZVTXdWRmhsWDB4WldqUnpZMkZYTWxoTmVXazFYMnQzRWd0TFZrSk5SVTV5ZDNnNE1Cb1Q2cWpkdVFFTkNndExWa0pOUlU1eWQzZzRNQ0FCTUFBJTNEQAFaBRCQ28wBcggIBBgCIAAoAHgB&authuser=0`}
            allow=""
            allowFullScreen
            className="w-full h-full rounded-md "
          ></iframe>
        </section>
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
