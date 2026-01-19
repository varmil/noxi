import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import LiveBadge from 'components/styles/badge/LiveBadge'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import dayjs from 'lib/dayjs'
import { Link } from 'lib/navigation'

function EndedBadge() {
  return (
    <div className="bg-muted text-muted-foreground text-xs font-medium px-1.5 py-0.5 rounded">
      ENDED
    </div>
  )
}

type Props = {
  stream: StreamSchema
  channel: ChannelSchema
}

export default function ScheduledStreamItem({ stream, channel }: Props) {
  const scheduledTime = stream.streamTimes.scheduledStartTime
  const timeLabel = scheduledTime
    ? dayjs(scheduledTime).tz('Asia/Tokyo').format('HH:mm')
    : '--:--'
  const isLive = stream.status === 'live'
  const isEnded = stream.status === 'ended'

  return (
    <Link
      href={`/youtube/live/${stream.videoId}`}
      prefetch={false}
      data-testid="scheduled-stream-item"
    >
      <Card className="py-3 overflow-hidden transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer">
        <div className="flex p-3 md:p-4">
          {/* 時刻 + ステータスバッジ */}
          <div className="shrink-0 w-16 mr-4 md:mr-6 text-center flex flex-col items-center gap-1">
            <time className="text-2xl font-bold tabular-nums text-foreground">
              {timeLabel}
            </time>
            {isLive && <LiveBadge />}
            {isEnded && <EndedBadge />}
          </div>

          {/* サムネイル */}
          <div className="shrink-0 w-34 md:w-44 mr-2 md:mr-3">
            <div className="relative aspect-video overflow-hidden rounded-sm bg-muted">
              <VideoThumbnail
                size="medium"
                title={stream.snippet.title}
                thumbnails={stream.snippet.thumbnails}
              />
            </div>
          </div>

          {/* 配信情報 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-base font-semibold leading-snug line-clamp-2 break-all mb-3">
              {stream.snippet.title}
            </h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={channel.basicInfo.thumbnails.default?.url}
                  alt={channel.basicInfo.title}
                />
                <AvatarFallback>
                  {channel.basicInfo.title.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground truncate">
                {channel.basicInfo.title}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
