import { PropsWithoutRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getLiveStreamingDetails } from 'apis/youtube/data-api/getLiveStreamingDetails'
import { getChannels } from 'apis/youtube/getChannels'
import { getStreams } from 'apis/youtube/getStreams'
import CountryFlag from 'components/styles/CountryFlag'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import TableGroupCell from 'features/stream-ranking/components/table/cell/TableGroupCell'
import LinkCell from 'features/stream-ranking/components/table/cell/base/LinkCell'
import StreamRankingTableHeader from 'features/stream-ranking/components/table/header/StreamRankingTableHeader'
import { getSortedStreams } from 'features/stream-ranking/utils/getSortedStreams'

type Props = PropsWithoutRef<{
  compact?: boolean
}>

export default async function StreamRankingTable({ compact }: Props) {
  const streams = await getStreams({
    status: 'live',
    orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
    limit: compact ? 6 : 100
  })
  const [channels, liveStreamingDetailsList] = await Promise.all([
    getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
    getLiveStreamingDetails({ videoIds: streams.map(stream => stream.videoId) })
  ])
  /** 現在の視聴者数で並び替え */
  const sortedStreams = getSortedStreams(streams, liveStreamingDetailsList)

  return (
    <Table>
      <StreamRankingTableHeader />
      <TableBody>
        {sortedStreams.map(stream => {
          const channel = channels.find(
            channel => channel.basicInfo.id === stream.snippet.channelId
          )
          if (!channel) return null
          const { liveStreamingDetails } =
            liveStreamingDetailsList.find(
              liveStreamingDetails => liveStreamingDetails.id === stream.videoId
            ) || {}
          if (!liveStreamingDetails) return null

          const { videoId } = stream

          return (
            <TableRow key={videoId}>
              {/* Flag */}
              <TableCell className="p-0 sm:p-2 justify-items-center w-8">
                <CountryFlag countryCode={channel.peakX?.country} size={20} />
              </TableCell>

              {/* Ch. Thumbnail */}
              <LinkCell width={40} videoId={videoId}>
                <Avatar className="w-6 h-6 @md:w-7 @md:h-7 transition-all hover:scale-105">
                  <AvatarImage
                    src={channel.basicInfo.thumbnails.medium?.url}
                    alt={channel.basicInfo.title}
                  />
                  <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
                </Avatar>
              </LinkCell>

              {/* Ch. Title */}
              <LinkCell width={150} videoId={videoId} className="min-w-28">
                <div className="line-clamp-1">{channel.basicInfo.title}</div>
              </LinkCell>

              {/* Viewers */}
              <TableCell width={80} className="text-lg tabular-nums">
                {liveStreamingDetails.concurrentViewers?.toLocaleString() ??
                  '--'}
              </TableCell>

              <TableCell width={56} className="hidden @lg:table-cell w-14">
                <VideoThumbnail
                  size="default"
                  title={stream.snippet.title}
                  thumbnails={stream.snippet.thumbnails}
                  className="rounded"
                />
              </TableCell>

              {/* Stream Title */}
              <LinkCell videoId={videoId}>
                <div className="line-clamp-1 text-muted-foreground text-xs">
                  {stream.snippet.title}
                </div>
              </LinkCell>

              {/* Group */}
              <TableGroupCell groupId={stream.group} />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
