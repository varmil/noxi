import { ComponentProps, PropsWithChildren, PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getChannels } from 'apis/youtube/getChannels'
import { getSupersBundles } from 'apis/youtube/getSupersBundles'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { RANK_HIGHLIGHTER_ID_PREFIX } from 'components/ranking/highlighter/rank-highlighter'
import CountryCell from 'components/ranking/table/cell/CountryCell'
import GroupCell from 'components/ranking/table/cell/GroupCell'
import LinkToChannelCell from 'components/ranking/table/cell/LinkToChannelCell'
import ChannelThumbnail from 'components/ranking/table/styles/ChannelThumbnail'
import ChannelTitle from 'components/ranking/table/styles/ChannelTitle'
import Dimension from 'components/ranking/table/styles/Dimension'
import { StreamRankingPagination as Pagination } from 'config/constants/Pagination'
import StreamThumbnailCell from 'features/stream-ranking/components/table/cell/StreamThumbnailCell'
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
            snippet: { channelId },
            metrics: { peakConcurrentViewers }
          } = stream
          const bundle = bundles.find(
            bundle => bundle.videoId === stream.videoId
          )

          const LinkCell = (
            props: PropsWithChildren &
              Omit<
                ComponentProps<typeof LinkToChannelCell>,
                'channelId' | 'group'
              >
          ) => (
            <LinkToChannelCell
              channelId={channelId}
              group={channel.peakX.group}
              prefetch={i < 5}
              {...props}
            />
          )

          return (
            <TableRow
              key={`${videoId}-${i}`}
              id={`${RANK_HIGHLIGHTER_ID_PREFIX}${channel.basicInfo.id}`} // For Highlighter
              className="border-none"
            >
              {/* Rank */}
              <TableCell className="min-w-2 max-w-16">
                <div className="text-lg font-bold text-nowrap tracking-tight">
                  {Pagination.getRankFromPage(page, i)}
                </div>
              </TableCell>

              {/* Channel Thumbnail */}
              <LinkCell align="center">
                <ChannelThumbnail channel={channel} />
              </LinkCell>

              {/* Channel Title */}
              <LinkCell width={160}>
                <ChannelTitle channel={channel} className="min-w-[96px]" />
              </LinkCell>

              {/* xs- md: Concurrent Viewers */}
              {dimension === 'concurrent-viewer' && (
                <LinkCell width={160} className="min-w-[80px] @lg:hidden">
                  <Dimension
                    active={dimension === 'concurrent-viewer'}
                    dividend={peakConcurrentViewers}
                    divisor={topConcurrentViewers}
                  />
                </LinkCell>
              )}

              {/*  xs- md: Supers */}
              {dimension === 'super-chat' && (
                <TableCell width={160} className="min-w-[80px] @lg:hidden">
                  <Dimension
                    active={dimension === 'super-chat'}
                    dividend={convertMicrosToAmount(
                      bundle?.amountMicros ?? BigInt(0)
                    )}
                    divisor={convertMicrosToAmount(topAmountMicros)}
                    icon={<JapaneseYen className="w-4 h-4" />}
                  />
                </TableCell>
              )}

              {/* Stream Thumbnail */}
              <StreamThumbnailCell stream={stream} />

              {/* Stream Title */}
              <TableCell width={400} className="min-w-[144px]">
                <Link
                  className="text-sm text-muted-foreground line-clamp-2 break-anywhere"
                  href={`/youtube/live/${videoId}`}
                  prefetch={false}
                >
                  {stream.snippet.title}
                </Link>
              </TableCell>

              {/* lg-: Viewers */}
              <TableCell width={144} className="hidden @lg:table-cell min-w-24">
                <Dimension
                  active={dimension === 'concurrent-viewer'}
                  dividend={peakConcurrentViewers}
                  divisor={topConcurrentViewers}
                />
              </TableCell>

              {/* lg-: Supers */}
              <TableCell width={144} className="hidden @lg:table-cell min-w-24">
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
              <GroupCell groupId={stream.group} />

              {/* 3xl-: Country */}
              <CountryCell countryCode={channel.peakX.country} />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
