import { PropsWithoutRef } from 'react'
import BigNumber from 'bignumber.js'
import { getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getChannels } from 'apis/youtube/getChannels'
import { getSupersBundles } from 'apis/youtube/getSupersBundles'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { GroupString } from 'config/constants/Site'
import TableCellOfGroup from 'features/stream-ranking/components/table/cell/TableCellOfGroup'
import TableCellOfStreamThumbnail from 'features/stream-ranking/components/table/cell/TableCellOfStreamThumbnail'
import LinkCell from 'features/stream-ranking/components/table/cell/base/LinkCell'
import StreamRankingTableHeader from 'features/stream-ranking/components/table/header/StreamRankingTableHeader'
import Dimension from 'features/stream-ranking/components/table/styles/Dimension'
import { StreamRankingDimension } from 'features/stream-ranking/types/stream-ranking.type'
import { Link } from 'lib/navigation'

type Props = PropsWithoutRef<{
  dimension: StreamRankingDimension
  streams: StreamsSchema
}>

export default async function StreamRankingTable({
  dimension,
  streams
}: Props) {
  const [tg, t, channels, bundles] = await Promise.all([
    getTranslations('Global.ranking'),
    getTranslations('Features.streamRanking'),
    getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
    getSupersBundles({
      videoIds: streams.map(stream => stream.videoId),
      orderBy: [{ field: 'amountMicros', order: 'desc' }]
    })
  ])
  /** Progress.valueで使用する */
  const topConcurrentViewers = streams[0]?.metrics.peakConcurrentViewers ?? 0
  const topAmountMicros = bundles[0]?.amountMicros ?? 0

  return (
    <Table>
      <StreamRankingTableHeader dimension={dimension} />
      <TableBody>
        {streams.map((stream, i) => {
          const channel = channels.find(
            channel => channel.basicInfo.id === stream.snippet.channelId
          )
          if (!channel) return null

          const {
            videoId,
            metrics: { peakConcurrentViewers }
          } = stream
          const bundle = bundles.find(
            bundle => bundle.videoId === stream.videoId
          )

          return (
            <TableRow key={videoId}>
              {/* Rank */}
              <TableCell className="align-top">
                <div className="text-lg font-bold w-3 text-nowrap">{i + 1}</div>
              </TableCell>

              {/* Stream Thumbnail */}
              <TableCellOfStreamThumbnail stream={stream} />

              {/* Stream Title & Ch. Thumbnail & Ch. Title */}
              <LinkCell
                videoId={videoId}
                className="@lg:min-w-[230px] @lg:max-w-[400px]"
              >
                <div className="flex flex-col gap-2 @lg:gap-4">
                  <div className="font-light line-clamp-2">
                    {stream.snippet.title}
                  </div>

                  <Dimension
                    className="@lg:hidden"
                    dividend={peakConcurrentViewers}
                    divisor={topConcurrentViewers}
                  />

                  <SmallChannel className="@lg:hidden" channel={channel} />
                </div>
              </LinkCell>

              {/* lg-: Viewers */}
              <TableCell width={170} className="hidden @lg:table-cell">
                <Dimension
                  active={dimension === 'concurrent-viewer'}
                  dividend={peakConcurrentViewers}
                  divisor={topConcurrentViewers}
                />
              </TableCell>

              {/* lg-: Supers */}
              <TableCell width={170} className="hidden @lg:table-cell">
                <Dimension
                  active={dimension === 'super-chat'}
                  dividend={Math.round(
                    BigNumber(bundle?.amountMicros.toString() ?? 0)
                      .div(1_000_000)
                      .toNumber()
                  )}
                  divisor={Number(topAmountMicros / BigInt(1_000_000))}
                />
              </TableCell>

              {/* lg-: Channel */}
              <TableCell width={150} className="hidden @lg:table-cell">
                <LargeChannel group={stream.group} channel={channel} />
              </TableCell>

              {/* lg-: Group */}
              <TableCellOfGroup groupId={stream.group} />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
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

const LargeChannel = ({
  group,
  channel
}: {
  group: GroupString
  channel: ChannelSchema
}) => {
  return (
    <Link
      className="flex flex-col items-center gap-1"
      href={`/${group}/channels/${channel.basicInfo.id}`}
    >
      <Avatar className="w-9 h-9 @3xl:w-12 @3xl:h-12 transition-all hover:scale-105">
        <AvatarImage
          src={channel.basicInfo.thumbnails.medium?.url}
          alt={channel.basicInfo.title}
        />
        <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
      </Avatar>
      <div className="text-sm line-clamp-1 break-all">
        {channel.basicInfo.title}
      </div>
    </Link>
  )
}
