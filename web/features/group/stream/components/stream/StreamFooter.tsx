import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { LiveStreamingDetailsSchema } from 'apis/youtube/schema/data-api/liveStreamingDetailsSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import Bullet from 'components/styles/Bullet'
import ScheduledFor from 'components/styles/date/ScheduledFor'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import Watching from 'components/styles/number/Watching'
import { Link } from 'lib/navigation'

type Props = {
  stream: StreamSchema
  channel: ChannelSchema
  /** 基本Live中しか参照されない */
  liveStreamingDetails?: LiveStreamingDetailsSchema['liveStreamingDetails']
}

export default async function StreamFooter({
  stream,
  channel,
  liveStreamingDetails
}: PropsWithoutRef<Props>) {
  const {
    videoId,
    snippet: { title, channelId },
    streamTimes,
    metrics: {
      peakConcurrentViewers,
      avgConcurrentViewers,
      chatMessages,
      views,
      likes
    },
    group
  } = stream
  const { concurrentViewers } = liveStreamingDetails || {}

  const isLive = stream.status === 'live'
  const isScheduled = stream.status === 'scheduled'
  const t = useTranslations('Features.stream')

  return (
    <div>
      <h3 className="break-anywhere text-sm line-clamp-2 mb-1">{title}</h3>
      <div className="col-start-2 flex items-center gap-1">
        <div className="text-xs sm:text-sm text-muted-foreground">
          <Link href={`/${group}/channels/${channelId}`} prefetch={true}>
            <div className="hover:text-accent-foreground">
              {channel.basicInfo.title}
            </div>
          </Link>
          {isLive && (
            <div>
              <Watching count={concurrentViewers} compact />
            </div>
          )}
          {isScheduled && (
            <>
              <span>
                <IntlNumberFormat>{likes}</IntlNumberFormat> {t('likes')}
                <Bullet />
                <ScheduledFor date={streamTimes.scheduledStartTime} />
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
