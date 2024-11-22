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
import TableCellOfStreamForSmallContainer from 'features/stream-ranking/components/table/cell/TableCellOfStreamForSmallContainer'
import TableCellOfStreamThumbnail from 'features/stream-ranking/components/table/cell/TableCellOfStreamThumbnail'
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

              {/* xs-md: Stream Title & Dimension & Ch. Thumbnail & Ch. Title */}
              <TableCellOfStreamForSmallContainer
                stream={stream}
                channel={channel}
                topConcurrentViewers={topConcurrentViewers}
              />

              {/* lg-: Channel + Title */}
              <TableCell className="hidden @lg:table-cell @lg:min-w-[230px] @lg:max-w-[400px]">
                <div className="flex flex-col gap-4">
                  <SmallChannel
                    className=""
                    channel={channel}
                    group={stream.group}
                  />
                  <Link
                    className="font-light line-clamp-2"
                    href={`/youtube/live/${videoId}`}
                  >
                    {stream.snippet.title}
                  </Link>
                </div>
              </TableCell>

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
  channel,
  group
}: {
  className?: string
  channel: ChannelSchema
  group: GroupString
}) => {
  return (
    <Link
      className={`flex items-center gap-2 ${className || ''}`}
      href={`/${group}/channels/${channel.basicInfo.id}`}
    >
      <Avatar className="w-5 h-5 transition-all hover:scale-105">
        <AvatarImage
          src={channel.basicInfo.thumbnails.medium?.url}
          alt={channel.basicInfo.title}
        />
        <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
      </Avatar>
      <div className="line-clamp-1">{channel.basicInfo.title}</div>
    </Link>
  )
}
