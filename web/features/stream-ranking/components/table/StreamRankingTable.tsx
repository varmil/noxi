import { ComponentProps, PropsWithChildren, PropsWithoutRef } from 'react'
import { ChevronRight, JapaneseYen } from 'lucide-react'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getSupersBundles } from 'apis/supers/getSupersBundles'
import { getChannels } from 'apis/youtube/getChannels'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { RANK_HIGHLIGHTER_ID_PREFIX } from 'components/ranking/highlighter/rank-highlighter'
import GroupCell from 'components/ranking/table/cell/GroupCell'
import LinkToChannelCell from 'components/ranking/table/cell/LinkToChannelCell'
import ChannelThumbnail from 'components/ranking/table/styles/ChannelThumbnail'
import ChannelTitle from 'components/ranking/table/styles/ChannelTitle'
import Dimension from 'components/ranking/table/styles/Dimension'
import { StreamRankingPagination as Pagination } from 'config/constants/Pagination'
import StreamThumbnailCell from 'features/stream-ranking/components/table/cell/StreamThumbnailCell'
import StreamLinkCell from 'features/stream-ranking/components/table/cell/base/LinkCell'
import StreamRankingTableHeader from 'features/stream-ranking/components/table/header/StreamRankingTableHeader'
import { StreamRankingDimension } from 'features/stream-ranking/types/stream-ranking.type'
import { convertMicrosToAmount } from 'utils/amount'

type Props = PropsWithoutRef<{
  streams: StreamsSchema
  dimension: StreamRankingDimension
  group?: string
  page: number
}>

export default async function StreamRankingTable({
  dimension,
  group,
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
      <TableBody>
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

          const ChannelLinkCell = (
            props: PropsWithChildren &
              Omit<
                ComponentProps<typeof LinkToChannelCell>,
                'channelId' | 'group'
              >
          ) => (
            <LinkToChannelCell
              channelId={channelId}
              group={channel.peakX.group}
              prefetch={false} // before: i < 5
              {...props}
            />
          )

          return (
            <TableRow
              key={`${videoId}-${i}`}
              id={`${RANK_HIGHLIGHTER_ID_PREFIX}${channel.basicInfo.id}`} // For Highlighter
            >
              {/* Rank */}
              <TableCell className="min-w-2 max-w-16">
                <div className="text-center text-lg @lg:text-xl text-nowrap tracking-tight">
                  {Pagination.getRankFromPage(page, i)}
                </div>
              </TableCell>

              {/* Channel Thumbnail */}
              <ChannelLinkCell
                align="center"
                className="@max-md:z-10 @max-md:sticky @max-md:bg-background @max-md:left-0"
              >
                <ChannelThumbnail channel={channel} />
              </ChannelLinkCell>

              {/* Channel Title */}
              <ChannelLinkCell width={400} className="min-w-[152px]">
                <ChannelTitle channel={channel} />
              </ChannelLinkCell>

              {/* xs- md: Concurrent Viewers */}
              {dimension === 'concurrent-viewer' && (
                <ChannelLinkCell width={160} className="min-w-24">
                  <Dimension
                    dividend={peakConcurrentViewers}
                    divisor={topConcurrentViewers}
                  />
                </ChannelLinkCell>
              )}

              {/*  xs- md: Supers */}
              {dimension === 'super-chat' && (
                <ChannelLinkCell width={160} className="min-w-24">
                  <Dimension
                    dividend={convertMicrosToAmount(
                      bundle?.amountMicros ?? BigInt(0)
                    )}
                    divisor={convertMicrosToAmount(topAmountMicros)}
                    icon={
                      <JapaneseYen className="size-3 text-muted-foreground" />
                    }
                    rtl
                  />
                </ChannelLinkCell>
              )}

              {/* Stream Thumbnail */}
              <StreamThumbnailCell stream={stream} />

              {/* Stream Title */}
              <StreamLinkCell
                width={500}
                videoId={videoId}
                className="min-w-[240px]"
              >
                <span className="hover:underline line-clamp-1 break-all">
                  {stream.snippet.title}
                </span>
              </StreamLinkCell>

              {/* 3xl-: Group */}
              <GroupCell groupId={stream.group} />

              {/* xs - 2xl: Link Icon */}
              <StreamLinkCell
                videoId={videoId}
                className="min-w-[32px] @3xl:hidden"
              >
                <ChevronRight className="size-4" />
              </StreamLinkCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
