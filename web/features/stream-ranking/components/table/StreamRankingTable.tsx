import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { getLiveStreamingDetails } from 'apis/youtube/data-api/getLiveStreamingDetails'
import { getChannels } from 'apis/youtube/getChannels'
import { getStreams } from 'apis/youtube/getStreams'
import CountryFlag from 'components/styles/CountryFlag'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import { getSortedStreams } from 'features/stream-ranking/utils/getSortedStreams'
import { Link } from 'lib/navigation'

type Props = PropsWithoutRef<{
  compact?: boolean
}>

export default async function StreamRankingTable({ compact }: Props) {
  const streams = await getStreams({
    status: 'live',
    orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
    limit: compact ? 6 : 100
  })
  const [t, channels, liveStreamingDetailsList] = await Promise.all([
    getTranslations('Page.index.section.hero'),
    getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
    getLiveStreamingDetails({ videoIds: streams.map(stream => stream.videoId) })
  ])
  /** 現在の視聴者数で並び替え */
  const sortedStreams = getSortedStreams(streams, liveStreamingDetailsList)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="text-nowrap">{t('channel')}</TableHead>
          <TableHead className="hidden @lg:table-cell"></TableHead>
          <TableHead className="text-right text-nowrap">
            {t('viewers')}
          </TableHead>
          <TableHead className="hidden @lg:table-cell w-14"></TableHead>
        </TableRow>
      </TableHeader>
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
          return (
            <TableRow key={stream.videoId}>
              <TableCell width={40}>
                <Link href={`/youtube/live/${stream.videoId}`}>
                  <Avatar className="w-6 h-6 @md:w-8 @md:h-8 transition-all hover:scale-105">
                    <AvatarImage
                      src={channel.basicInfo.thumbnails.medium?.url}
                      alt={channel.basicInfo.title}
                    />
                    <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
                  </Avatar>
                </Link>
              </TableCell>

              <TableCell>
                <Link
                  className="space-y-1"
                  href={`/youtube/live/${stream.videoId}`}
                >
                  <div className="line-clamp-1">{channel.basicInfo.title}</div>
                  <div className="line-clamp-1 text-muted-foreground text-xs">
                    {stream.snippet.title}
                  </div>
                </Link>
              </TableCell>

              <TableCell className="hidden @lg:table-cell w-24">
                <VideoThumbnail
                  size="medium"
                  title={stream.snippet.title}
                  thumbnails={stream.snippet.thumbnails}
                  className="rounded"
                />
              </TableCell>

              <TableCell className="text-lg text-right tabular-nums">
                {liveStreamingDetails.concurrentViewers?.toLocaleString() ??
                  '--'}
              </TableCell>

              <TableCell className="hidden @lg:table-cell w-14">
                <CountryFlag countryCode={channel.peakX?.country} size={24} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
