import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { SupersBundleSchema } from 'apis/youtube/schema/supersBundleSchema'
import Dimension from 'components/ranking/table/styles/Dimension'
import LinkCell from 'features/stream-ranking/components/table/cell/base/LinkCell'
import { StreamRankingDimension } from 'features/stream-ranking/types/stream-ranking.type'
import { convertMicrosToAmount } from 'utils/amount'

type Props = PropsWithoutRef<{
  bundle?: SupersBundleSchema
  channel: ChannelSchema
  stream: StreamSchema
  dimension: StreamRankingDimension
  topConcurrentViewers: number
  topAmountMicros: bigint
}>

export default function TableCellOfStreamForSmallContainer({
  bundle,
  channel,
  stream,
  dimension,
  topConcurrentViewers,
  topAmountMicros
}: Props) {
  const {
    videoId,
    snippet: { title },
    metrics: { peakConcurrentViewers }
  } = stream

  return (
    <LinkCell videoId={videoId} className="@lg:hidden">
      <div className="flex flex-col gap-2">
        <SmallChannel channel={channel} />

        <span className="text-muted-foreground line-clamp-1 break-all">
          {title}
        </span>

        {dimension === 'concurrent-viewer' ? (
          <Dimension
            active={true}
            dividend={peakConcurrentViewers}
            divisor={topConcurrentViewers}
          />
        ) : null}

        {dimension === 'super-chat' ? (
          <Dimension
            active={true}
            dividend={convertMicrosToAmount(bundle?.amountMicros ?? BigInt(0))}
            divisor={convertMicrosToAmount(topAmountMicros)}
            icon={<JapaneseYen className="w-3 h-3" />}
          />
        ) : null}
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
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <Avatar className="size-6 @md:size-6 transition-all hover:scale-105">
        <AvatarImage
          src={channel.basicInfo.thumbnails.medium?.url}
          alt={channel.basicInfo.title}
        />
        <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
      </Avatar>
      <div className="line-clamp-1 break-all">{channel.basicInfo.title}</div>
    </div>
  )
}
