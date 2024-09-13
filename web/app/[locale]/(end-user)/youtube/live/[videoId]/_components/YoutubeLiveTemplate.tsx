import { PropsWithChildren, PropsWithoutRef } from 'react'
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getChannel } from 'apis/youtube/getChannel'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { PageXSPX } from 'components/page'
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
    metrics: {
      peakConcurrentViewers,
      avgConcurrentViewers,
      chatMessages,
      views,
      likes
    },
    group
  } = stream

  const EMBED_QUERY = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    modestbranding: '1'
  }).toString()

  return (
    <div className="grid lg:gap-x-0 grid-cols-1 lg:grid-cols-[minmax(650px,100%),minmax(320px,1fr)]">
      <LgContainer className="space-y-4">
        {/* Stream */}
        <div className="flex order-1 aspect-video w-full max-h-[90svh] justify-center items-center bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?${EMBED_QUERY}`}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="aspect-video h-full max-h-[90svh] "
          ></iframe>
        </div>

        {/* タイトル、投稿者情報 */}
        <PadSection left className="order-3">
          <StreamBasicInfo stream={stream} />
        </PadSection>
      </LgContainer>

      <LgContainer className="space-y-4">
        {/* Chat */}
        <PadSection right className="order-2">
          <section className="min-h-80 h-[calc(100svh-24rem)] lg:h-[calc(100svh-10rem)]">
            <iframe
              src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${embed_domain}`}
              allow=""
              allowFullScreen
              className="w-full h-full rounded-lg lg:rounded-none"
            ></iframe>
          </section>
        </PadSection>

        {/* Related Videos */}
        <PadSection right className="order-4">
          <RelatedVideos />
        </PadSection>
      </LgContainer>
    </div>
  )
}

/** LG以上のブレークポイントでシンプルな２カラムを表現するために使用する */
function LgContainer({
  className,
  children
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`contents lg:block ${className ?? ''}`}>
      {children}
    </section>
  )
}

/** paddingなしページなので個別にpadding必要な場所はセット */
function PadSection({
  className,
  children,
  left,
  right
}: PropsWithChildren<{
  className?: string
  /** 2カラム表示時：左カラム */
  left?: boolean
  /** 2カラム表示時：右カラム */
  right?: boolean
}>) {
  const LG_LEFT_PX = 'lg:px-6'
  const LG_RIGHT_PX = 'lg:px-0'
  return (
    <section
      className={`${PageXSPX} ${left ? LG_LEFT_PX : ''} ${
        right ? LG_RIGHT_PX : ''
      } ${className ?? ''}`}
    >
      {children}
    </section>
  )
}

async function StreamBasicInfo({ stream }: { stream: StreamSchema }) {
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

function RelatedVideos() {
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
  )
}
