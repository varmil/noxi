import { PropsWithoutRef } from 'react'
import { getFormatter } from 'next-intl/server'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import StreamTrendsTableHeader from 'features/channel/components/stream-trends/StreamTrendsTableHeader'
import { Link } from 'lib/navigation'
import { getLast50Streams } from 'utils/stream/getLast50Streams'

type Props = PropsWithoutRef<{
  channel: ChannelSchema
  className?: string
}>

export default async function StreamTrendsTable({ channel, className }: Props) {
  const [format, streams] = await Promise.all([
    getFormatter(),
    getLast50Streams({ channelId: channel.basicInfo.id })
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
              <TableCell className="align-top">
                <div className="text-lg font-bold text-nowrap">{i + 1}</div>
              </TableCell>

              {/* Stream Thumbnail */}
              <TableCell
                width={250}
                className="min-w-[100px] max-w-[150px] relative"
                align="center"
              >
                <Link href={`/youtube/live/${videoId}`}>
                  <VideoThumbnail
                    size="high"
                    title={title}
                    thumbnails={thumbnails}
                    className="min-w-[100px] max-w-[150px] rounded-sm"
                  />
                </Link>
              </TableCell>

              {/* Title */}
              <TableCell width={800} className="min-w-[200px] max-w-[400px]">
                <Link
                  className="line-clamp-2 break-anywhere"
                  href={`/youtube/live/${videoId}`}
                >
                  {title}
                </Link>
              </TableCell>

              {/* 同接数 */}
              <TableCell
                width={100}
                className="text-lg font-bold text-nowrap"
                align="center"
              >
                {peakConcurrentViewers}
              </TableCell>

              {/* 日付 */}
              <TableCell width={70} className="text-nowrap" align="center">
                {actualStartTime ? (
                  <>
                    {format.dateTime(new Date(actualStartTime), {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </>
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
