import { PropsWithoutRef } from 'react'
import { getFormatter } from 'next-intl/server'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import StreamTrendsTableHeader from 'features/channel/components/stream-trends/StreamTrendsTableHeader'
import { Link } from 'lib/navigation'
import { getLast30Streams } from 'utils/stream/getLast30Streams'

type Props = PropsWithoutRef<{
  channel: ChannelSchema
  className?: string
}>

/** @deprecated 使わないかも */
export default async function StreamTrendsTable({ channel }: Props) {
  const [format, streams] = await Promise.all([
    getFormatter(),
    getLast30Streams({ channelId: channel.basicInfo.id })
  ])
  // top 3 peakConcurrentViewers
  const top3 = streams
    .sort(
      (a, b) =>
        b.metrics.peakConcurrentViewers - a.metrics.peakConcurrentViewers
    )
    .slice(0, 3)

  return (
    <Table>
      <StreamTrendsTableHeader />
      <TableBody>
        {top3.map((stream, i) => {
          const {
            videoId,
            snippet: { title, thumbnails },
            metrics: { peakConcurrentViewers },
            streamTimes: { actualStartTime }
          } = stream

          return (
            <TableRow key={videoId}>
              {/* Rank */}
              <TableCell className="align-middle">
                <div className="text-lg @lg:font-bold text-nowrap">{i + 1}</div>
              </TableCell>

              {/* 同接数 */}
              <TableCell
                width={100}
                className="font-bold text-nowrap"
                align="right"
              >
                {peakConcurrentViewers.toLocaleString()}
              </TableCell>

              {/* Stream Thumbnail */}
              <TableCell
                width={200}
                className="min-w-[60px] max-w-[100px] relative"
                align="right"
              >
                <Link href={`/youtube/live/${videoId}`}>
                  <VideoThumbnail
                    size="high"
                    title={title}
                    thumbnails={thumbnails}
                    className="min-w-[60px] max-w-[100px] rounded-sm"
                  />
                </Link>
              </TableCell>

              {/* Title */}
              <TableCell width={800} className="min-w-[200px] max-w-[600px]">
                <Link
                  className="line-clamp-1 break-all"
                  href={`/youtube/live/${videoId}`}
                >
                  {title}
                </Link>
              </TableCell>

              {/* 日付 */}
              <TableCell width={70} className="text-nowrap" align="right">
                {actualStartTime ? (
                  <>{format.relativeTime(new Date(actualStartTime))}</>
                ) : (
                  <>--</>
                )}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
