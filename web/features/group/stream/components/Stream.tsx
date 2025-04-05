import { PropsWithoutRef } from 'react'
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

// const SmallLiveBadge = () => (
//   <div className="relative text-xs text-white bg-red-600 py-0.5 px-1 rounded -mt-1">
//     LIVE
//   </div>
// )

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
  const {
    streamTimes,
    metrics: { peakConcurrentViewers }
  } = stream
  const isLive = stream.status === 'live'
  const isScheduled = stream.status === 'scheduled'
  const isEnded = stream.status === 'ended'

  return (
    <StreamContainer>
      <StreamContent>
        <StreamImg stream={stream}>
          {isLive && <LiveBadge className="absolute bottom-1 left-1" />}
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
          {/* <StreamAvatarContainer stream={stream} channel={channel}>
          {isLive && <SmallLiveBadge />}
        </StreamAvatarContainer> */}
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
      <StreamFooter className="flex justify-between">
        <div>
          <div className="text-xs text-muted-foreground">最大同接数</div>
          <span>
            {peakConcurrentViewers > 0
              ? peakConcurrentViewers.toLocaleString()
              : '---'}
          </span>
        </div>
        <div className="">
          <div className="text-xs text-muted-foreground">スパチャ金額</div>
          <StreamTextOfEarnings
            className="flex justify-end"
            supersBundle={supersBundle}
          />
        </div>
      </StreamFooter>
    </StreamContainer>
  )
}
