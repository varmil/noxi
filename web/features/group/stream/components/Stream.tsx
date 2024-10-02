import { PropsWithChildren, PropsWithoutRef } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { LiveStreamingDetailsSchema } from 'apis/youtube/schema/data-api/liveStreamingDetailsSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import Image from 'components/styles/Image'
import LiveBadge from 'components/styles/LiveBadge'
import DurationBadge from 'features/group/stream/components/badge/DurationBadge'
import UpcomingBadge from 'features/group/stream/components/badge/UpcomingBadge'
import StreamFooter from 'features/group/stream/components/stream/StreamFooter'
import dayjs from 'lib/dayjs'
import { Link } from 'lib/navigation'

const SmallLiveBadge = () => (
  <div className="relative text-xs text-white bg-red-600 py-0.5 px-1 rounded -mt-1">
    LIVE
  </div>
)

/**
 * @note 関連動画を見せるUIとしてコメントアウト部分は使えそう
 */
const Container = ({ children }: PropsWithChildren) => (
  // <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">{children}</div>
  <div className="flex flex-col gap-2">{children}</div>
)

/**
 * @note 関連動画を見せるUIとしてコメントアウト部分は使えそう
 */
const ImgContainer = ({ children }: PropsWithChildren) => (
  // <div className="relative aspect-video w-full sm:w-[220px] rounded-lg overflow-hidden">
  <div className="relative aspect-video w-full rounded-lg overflow-hidden">
    {children}
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
  const {
    videoId,
    snippet: { title, thumbnails, channelId },
    streamTimes,
    group
  } = stream

  const isLive = stream.status === 'live'
  const isScheduled = stream.status === 'scheduled'

  return (
    <Container>
      <ImgContainer>
        <Link href={`/youtube/live/${videoId}`} prefetch={true}>
          <Image
            src={thumbnails.standard?.url ?? ''}
            alt={title}
            className="object-cover w-full h-full"
            width={348.8}
            height={196.2}
          />
          {isLive && <LiveBadge className="absolute bottom-2 left-2" />}
          {isScheduled && <UpcomingBadge />}
          {isLive && (
            <DurationBadge
              duration={dayjs
                .duration(dayjs(dayjs()).diff(streamTimes.actualStartTime))
                .toISOString()}
            />
          )}
        </Link>
      </ImgContainer>
      <div className="flex-1 grid grid-cols-[auto,1fr,auto] gap-x-3 gap-y-1">
        <div className="items-center text-center">
          <Link href={`/${group}/channels/${channelId}`} prefetch={true}>
            <Avatar className="w-9 h-9 sm:w-11 sm:h-11 transition-all hover:scale-105">
              <AvatarImage src={channel.basicInfo.thumbnails['medium']?.url} />
            </Avatar>
          </Link>
          {isLive && <SmallLiveBadge />}
        </div>
        <StreamFooter
          stream={stream}
          channel={channel}
          liveStreamingDetails={liveStreamingDetails}
        />
      </div>
    </Container>
  )
}
