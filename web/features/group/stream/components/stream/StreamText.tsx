import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { LiveStreamingDetailsSchema } from 'apis/youtube/schema/data-api/liveStreamingDetailsSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import Bullet from 'components/styles/Bullet'
import ScheduledFor from 'components/styles/date/ScheduledFor'
import StreamedLive from 'components/styles/date/StreamedLive'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import Watching from 'components/styles/number/Watching'
import Views from 'components/youtube/statistics/Views'

type Props = {
  stream: StreamSchema
  channel: ChannelSchema
  /** 基本Live中しか参照されない */
  liveStreamingDetails?: LiveStreamingDetailsSchema['liveStreamingDetails']
}

export default async function StreamText({
  stream,
  channel,
  liveStreamingDetails
}: PropsWithoutRef<Props>) {
  const {
    streamTimes: { scheduledStartTime, actualEndTime },
    metrics: { views, likes }
  } = stream
  const { concurrentViewers } = liveStreamingDetails || {}
  const isLive = stream.status === 'live'
  const isScheduled = stream.status === 'scheduled'
  const isEnded = stream.status === 'ended'
  const t = useTranslations('Features.stream')

  return (
    <>
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
            <ScheduledFor date={scheduledStartTime} />
          </span>
        </>
      )}
      {/* TODO: use latest views from Videos Data API */}
      {isEnded && actualEndTime && (
        <>
          <span>
            <Views views={views} />
            <Bullet />
            <StreamedLive date={actualEndTime} />
          </span>
        </>
      )}
    </>
  )
}
