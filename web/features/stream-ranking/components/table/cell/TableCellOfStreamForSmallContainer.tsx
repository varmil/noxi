import { PropsWithoutRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import LinkCell from 'features/stream-ranking/components/table/cell/base/LinkCell'
import Dimension from 'features/stream-ranking/components/table/styles/Dimension'

type Props = PropsWithoutRef<{
  stream: StreamSchema
  channel: ChannelSchema
  topConcurrentViewers: number
}>

export default function TableCellOfStreamForSmallContainer({
  stream,
  channel,
  topConcurrentViewers
}: Props) {
  const {
    videoId,
    snippet: { title },
    metrics: { peakConcurrentViewers }
  } = stream

  return (
    <LinkCell videoId={videoId} className="@lg:hidden">
      <div className="flex flex-col gap-2 @lg:gap-4">
        <div className="font-light line-clamp-2">{title}</div>

        <Dimension
          className="@lg:hidden"
          dividend={peakConcurrentViewers}
          divisor={topConcurrentViewers}
        />

        <SmallChannel className="@lg:hidden" channel={channel} />
      </div>
    </LinkCell>
  )
}

const SmallChannel = ({
  className,
  channel
}: {
  className?: string
  channel: ChannelSchema
}) => {
  return (
    <div className={`flex items-center gap-2 font-light ${className || ''}`}>
      <Avatar className="w-4 h-4 @md:w-5 @md:h-5 transition-all hover:scale-105">
        <AvatarImage
          src={channel.basicInfo.thumbnails.medium?.url}
          alt={channel.basicInfo.title}
        />
        <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
      </Avatar>
      <div className="line-clamp-1">{channel.basicInfo.title}</div>
    </div>
  )
}
