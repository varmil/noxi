import { PropsWithChildren } from 'react'
import { ThumbsUp, MessageSquare } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getChannel } from 'apis/youtube/getChannel'
import { getLiveStreamingDetails } from 'apis/youtube/getLiveStreamingDetails'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import IntlNumberFormat from 'components/styles/IntlNumberFormat'
import { Link } from 'lib/navigation'

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

  const [t, { basicInfo, statistics }, [{ liveStreamingDetails }]] =
    await Promise.all([
      getTranslations('Features.stream'),
      getChannel(channelId),
      getLiveStreamingDetails({ videoIds: [stream.videoId] })
    ])

  const { concurrentViewers } = liveStreamingDetails || {}
  const isLive = stream.status === 'live'

  return (
    <section className="space-y-4">
      <h1 className="text-lg sm:text-xl font-bold">{title}</h1>

      {/* Channel */}
      <div className="flex items-center space-x-2">
        <Link href={`/${group}/channels/${basicInfo.id}`} prefetch={true}>
          <Avatar className="w-7 h-7 sm:w-11 sm:h-11 transition-all hover:scale-105">
            <AvatarImage
              src={basicInfo.thumbnails.medium?.url}
              alt={basicInfo.title}
            />
            <AvatarFallback>{basicInfo.title}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <p className="flex gap-x-1 items-center">
            <Link
              href={`/${group}/channels/${basicInfo.id}`}
              prefetch={true}
              className="flex-1 font-semibold hover:text-accent-foreground"
            >
              {basicInfo.title}
            </Link>
            <span className="w-16 text-sm text-muted-foreground">
              <IntlNumberFormat>{statistics.subscriberCount}</IntlNumberFormat>
            </span>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex space-x-4">
        {isLive && (
          <OnelineStats>
            <span>
              {concurrentViewers
                ? Number(concurrentViewers).toLocaleString()
                : '--'}{' '}
              {t('watching')}
            </span>
          </OnelineStats>
        )}
        <OnelineStats>
          <ThumbsUp className="h-4 w-4" />
          <span>
            <IntlNumberFormat>{likes}</IntlNumberFormat>
          </span>
        </OnelineStats>
        {/* <OnelineStats>
          <MessageSquare className="h-4 w-4" />
          <span>
            <IntlNumberFormat>{chatMessages}</IntlNumberFormat>
          </span>
        </OnelineStats> */}
      </div>
    </section>
  )
}

function OnelineStats({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center text-sm text-muted-foreground space-x-2 px-4 py-2 border rounded">
      {children}
    </div>
  )
}
