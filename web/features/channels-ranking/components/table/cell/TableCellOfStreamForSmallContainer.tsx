import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { SupersBundleSchema } from 'apis/youtube/schema/supersBundleSchema'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'
import { convertMicrosToAmount } from 'utils/amount'
import Dimension from '../styles/Dimension'
import LinkCell from './base/LinkCell'

type Props = PropsWithoutRef<{
  bundle?: SupersBundleSchema
  channel: ChannelSchema
  stream: StreamSchema
  dimension: ChannelsRankingDimension
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
        <div className="font-light line-clamp-2">{title}</div>

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

        <SmallChannel channel={channel} />
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
