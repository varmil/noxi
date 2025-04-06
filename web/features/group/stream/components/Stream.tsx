import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { Separator } from '@/components/ui/separator'
import { LiveStreamingDetailsSchema } from 'apis/youtube/data-api/schema/liveStreamingDetailsSchema'
import { StatisticsSchema } from 'apis/youtube/data-api/schema/statisticsSchema'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { SupersBundleSchema } from 'apis/youtube/schema/supersBundleSchema'
import LiveBadge from 'components/styles/badge/LiveBadge'
import DurationBadge from 'features/group/stream/components/badge/DurationBadge'
import UpcomingBadge from 'features/group/stream/components/badge/UpcomingBadge'
import {
  StreamContainer,
  StreamInfo,
  StreamFooter,
  StreamTextContainer,
  StreamContent
} from 'features/group/stream/components/stream/StreamContainer'
import StreamImg from 'features/group/stream/components/stream/StreamImg'
import StreamTextOfEarnings from 'features/group/stream/components/stream/text/StreamTextOfEarnings'
import StreamTextOfEnded from 'features/group/stream/components/stream/text/StreamTextOfEnded'
import StreamTextOfLive from 'features/group/stream/components/stream/text/StreamTextOfLive'
import StreamTextOfScheduled from 'features/group/stream/components/stream/text/StreamTextOfScheduled'
import dayjs from 'lib/dayjs'

type Props = {
  stream: StreamSchema
  /** Batch取得したもの */
  channel: ChannelSchema
  /** Batch取得したもの。Live中しか参照されない */
  liveStreamingDetails?: LiveStreamingDetailsSchema
  /** Batch取得したもの */
  statistics?: StatisticsSchema
  /** Batch取得したもの */
  supersBundle?: SupersBundleSchema
}

export default async function Stream({
  stream,
  channel,
  liveStreamingDetails,
  statistics,
  supersBundle
}: PropsWithoutRef<Props>) {
  const supersTrans = await getTranslations('Features.supers')
  const streamTrans = await getTranslations('Features.stream')

  const {
    videoId,
    streamTimes,
    metrics: { peakConcurrentViewers }
  } = stream
  const isLive = stream.status === 'live'
  const isScheduled = stream.status === 'scheduled'
  const isEnded = stream.status === 'ended'

  return (
    <StreamContainer videoId={videoId}>
      <StreamContent>
        <StreamImg className="w-[clamp(200px,60%,400px)]" stream={stream}>
          {isLive && <LiveBadge className="absolute bottom-0 left-0" />}
          {isScheduled && <UpcomingBadge />}
          {isLive && (
            <DurationBadge
              duration={dayjs
                .duration(dayjs(dayjs()).diff(streamTimes.actualStartTime))
                .toISOString()}
            />
          )}
        </StreamImg>
        <StreamInfo>
          <StreamTextContainer stream={stream} channel={channel}>
            {isLive && (
              <StreamTextOfLive liveStreamingDetails={liveStreamingDetails} />
            )}
            {isScheduled && <StreamTextOfScheduled stream={stream} />}
            {isEnded && (
              <StreamTextOfEnded stream={stream} statistics={statistics} />
            )}
          </StreamTextContainer>
        </StreamInfo>
      </StreamContent>
      <StreamFooter className="flex justify-end gap-4">
        <div className="flex flex-col items-end">
          <div className="text-xs text-muted-foreground">
            {streamTrans('viewersLabel')}
          </div>
          <span className="text-base">
            {peakConcurrentViewers > 0
              ? peakConcurrentViewers.toLocaleString()
              : '---'}
          </span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-end">
          <div className="text-xs text-muted-foreground">
            {supersTrans('label')}
          </div>
          <StreamTextOfEarnings supersBundle={supersBundle} />
        </div>
      </StreamFooter>
    </StreamContainer>
  )
}
