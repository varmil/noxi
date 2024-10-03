import { PropsWithoutRef } from 'react'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { LiveStreamingDetailsSchema } from 'apis/youtube/schema/data-api/liveStreamingDetailsSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import LiveBadge from 'components/styles/LiveBadge'
import DurationBadge from 'features/group/stream/components/badge/DurationBadge'
import UpcomingBadge from 'features/group/stream/components/badge/UpcomingBadge'
import {
  StreamAvatar,
  StreamContainer,
  StreamContentContainer
} from 'features/group/stream/components/stream/StreamContainer'
import StreamImg from 'features/group/stream/components/stream/StreamImg'
import StreamText from 'features/group/stream/components/stream/StreamText'
import dayjs from 'lib/dayjs'

const SmallLiveBadge = () => (
  <div className="relative text-xs text-white bg-red-600 py-0.5 px-1 rounded -mt-1">
    LIVE
  </div>
)

type Props = {
  stream: StreamSchema
  channel: ChannelSchema
  /** 基本Live中しか参照されない */
  liveStreamingDetails?: LiveStreamingDetailsSchema['liveStreamingDetails']
}

export default async function Stream({
  stream,
  channel,
  liveStreamingDetails
}: PropsWithoutRef<Props>) {
  const { streamTimes, group } = stream
  const isLive = stream.status === 'live'
  const isScheduled = stream.status === 'scheduled'

  return (
    <StreamContainer>
      <StreamImg stream={stream}>
        {isLive && <LiveBadge className="absolute bottom-2 left-2" />}
        {isScheduled && <UpcomingBadge />}
        {isLive && (
          <DurationBadge
            duration={dayjs
              .duration(dayjs(dayjs()).diff(streamTimes.actualStartTime))
              .toISOString()}
          />
        )}
      </StreamImg>
      <StreamContentContainer>
        <StreamAvatar group={group} channel={channel}>
          {isLive && <SmallLiveBadge />}
        </StreamAvatar>
        <StreamText
          stream={stream}
          channel={channel}
          liveStreamingDetails={liveStreamingDetails}
        />
      </StreamContentContainer>
    </StreamContainer>
  )
}
