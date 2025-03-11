import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getChannels } from 'apis/youtube/getChannels'
import { getSupersBundles } from 'apis/youtube/getSupersBundles'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { RANK_HIGHLIGHTER_ID_PREFIX } from 'components/ranking/highlighter/rank-highlighter'
import TableCellOfCountry from 'components/ranking/table/cell/TableCellOfCountry'
import TableCellOfGroup from 'components/ranking/table/cell/TableCellOfGroup'
import Dimension from 'components/ranking/table/styles/Dimension'
import { GroupString } from 'config/constants/Group'
import { StreamRankingPagination as Pagination } from 'config/constants/Pagination'
import TableCellOfStreamForSmallContainer from 'features/stream-ranking/components/table/cell/TableCellOfStreamForSmallContainer'
import TableCellOfStreamThumbnail from 'features/stream-ranking/components/table/cell/TableCellOfStreamThumbnail'
import StreamRankingTableHeader from 'features/stream-ranking/components/table/header/StreamRankingTableHeader'
import { StreamRankingDimension } from 'features/stream-ranking/types/stream-ranking.type'
import { Link } from 'lib/navigation'
import { convertMicrosToAmount } from 'utils/amount'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  dimension: StreamRankingDimension
  page: number
}>

export default async function StreamRankingTable({
  dimension,
  page,
  streams
}: Props) {
  const [channels, bundles] = await Promise.all([
    getChannels({
      ids: streams.map(stream => stream.snippet.channelId),
      limit: streams.length
    }),
    getSupersBundles({
      videoIds: streams.map(stream => stream.videoId),
      orderBy: [{ field: 'amountMicros', order: 'desc' }],
      limit: streams.length
    })
  ])
  /** Progress.valueで使用する */
  const topConcurrentViewers = streams[0]?.metrics.peakConcurrentViewers ?? 0
  const topAmountMicros = bundles[0]?.amountMicros ?? 0

  return (
    <Table>
      <StreamRankingTableHeader dimension={dimension} />
      <TableBody zebraStripes>
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
            <TableRow
              key={videoId}
              id={`${RANK_HIGHLIGHTER_ID_PREFIX}${channel.basicInfo.id}`} // For Highlighter
              className="border-none"
            >
              {/* Rank */}
              <TableCell className="align-top">
                <div className="text-lg font-bold w-4 @lg:w-5 text-nowrap tracking-tight">
                  {Pagination.getRankFromPage(page, i)}
                </div>
              </TableCell>

              {/* Stream Thumbnail */}
              <TableCellOfStreamThumbnail stream={stream} />

              {/* xs-md: Stream Title & Dimension & Ch. Thumbnail & Ch. Title */}
              <TableCellOfStreamForSmallContainer
                bundle={bundle}
                channel={channel}
                stream={stream}
                dimension={dimension}
                topConcurrentViewers={topConcurrentViewers}
                topAmountMicros={topAmountMicros}
              />

              {/* lg-: Channel + Title */}
              <TableCell className="hidden @lg:table-cell @lg:min-w-[230px] @lg:max-w-[400px]">
                <div className="flex flex-col gap-4">
                  <SmallChannel channel={channel} group={stream.group} />
                  <Link
                    className="text-sm text-muted-foreground line-clamp-2 break-anywhere"
                    href={`/youtube/live/${videoId}`}
                    prefetch={false}
                  >
                    {stream.snippet.title}
                  </Link>
                </div>
              </TableCell>

              {/* lg-: Viewers */}
              <TableCell width={150} className="hidden @lg:table-cell min-w-24">
                <Dimension
                  active={dimension === 'concurrent-viewer'}
                  dividend={peakConcurrentViewers}
                  divisor={topConcurrentViewers}
                />
              </TableCell>

              {/* lg-: Supers */}
              <TableCell width={150} className="hidden @lg:table-cell min-w-24">
                <Dimension
                  active={dimension === 'super-chat'}
                  dividend={convertMicrosToAmount(
                    bundle?.amountMicros ?? BigInt(0)
                  )}
                  divisor={convertMicrosToAmount(topAmountMicros)}
                  icon={<JapaneseYen className="w-4 h-4" />}
                />
              </TableCell>

              {/* 3xl-: Group */}
              <TableCellOfGroup groupId={stream.group} />

              {/* 3xl-: Country */}
              <TableCellOfCountry countryCode={channel.peakX.country} />
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
      prefetch={false}
    >
      <Avatar className="size-8 transition-all hover:scale-105">
        <AvatarImage src={channel.basicInfo.thumbnails.medium?.url} alt={''} />
        <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
      </Avatar>
      <div className="line-clamp-1">{channel.basicInfo.title}</div>
    </Link>
  )
}
