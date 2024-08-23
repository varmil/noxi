import { PropsWithoutRef } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ChannelSchema } from 'api/youtube/schema/channelSchema'
import { StreamSchema } from 'api/youtube/schema/streamSchema'
import DurationBadge from 'features/hololive/stream/components/badge/DurationBadge'
import dayjs from 'lib/dayjs'

const LiveBadge = () => (
  <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded flex items-center gap-1">
    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
    LIVE
  </div>
)

const SmallLiveBadge = () => (
  <div className="relative text-xs text-white bg-red-600 py-0.5 px-1 rounded -mt-1 z-10">
    LIVE
  </div>
)

type Props = {
  /**
   * @example 10:00 AM
   */
  time: string
  stream: StreamSchema
  channel: ChannelSchema
}

export default async function Stream({
  time,
  stream,
  channel
}: PropsWithoutRef<Props>) {
  const {
    videoId,
    snippet: { title, thumbnails },
    streamTimes,
    maxViewerCount,
    likeCount
  } = stream

  const isLive = stream.status === 'live'

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="relative aspect-video w-full sm:w-[220px] rounded-lg overflow-hidden">
        <a href={`https://youtube.com/watch?v=${videoId}`} target="_blank">
          <img
            src={thumbnails['high']?.url}
            alt={title}
            className="object-cover w-full h-full"
          />
          {isLive && <LiveBadge />}
          {isLive && (
            <DurationBadge
              duration={dayjs
                .duration(dayjs(dayjs()).diff(streamTimes.actualStartTime))
                .toISOString()}
            />
          )}
        </a>
      </div>
      <div className="flex-1 grid grid-cols-[auto,1fr,auto] gap-x-3 gap-y-1">
        <div className="items-center text-center">
          <Avatar className="w-9 h-9 sm:w-11 sm:h-11">
            <AvatarImage src={channel.basicInfo.thumbnails['medium']?.url} />
          </Avatar>
          {isLive && <SmallLiveBadge />}
        </div>
        <div>
          <h3 className="text-sm line-clamp-2 mb-1">{title}</h3>
          <div className="col-start-2 flex items-center gap-1">
            <span className="text-xs sm:text-sm text-muted-foreground">
              {channel.basicInfo.title}
              {isLive && <> - {maxViewerCount.toLocaleString()} watching</>}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
