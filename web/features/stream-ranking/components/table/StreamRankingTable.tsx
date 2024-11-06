import { PropsWithChildren, PropsWithoutRef } from 'react'
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
          {/* Flag */}
          <TableHead />
          {/* Ch. Thumbnail */}
          <TableHead />
          {/* Ch. Title */}
          <TableHead className="text-nowrap">{t('channel')}</TableHead>
          {/* Viewers */}
          <TableHead className="text-nowrap">{t('viewers')}</TableHead>
          {/* Stream Thumbnail */}
          <TableHead className="hidden @lg:table-cell"></TableHead>
          {/* Stream Title */}
          <TableHead className="text-nowrap">{t('streamTitle')}</TableHead>
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

          const { videoId } = stream

          return (
            <TableRow key={videoId}>
              {/* Flag */}
              <TableCell className="p-0 sm:p-2 justify-items-center w-8">
                <CountryFlag countryCode={channel.peakX?.country} size={20} />
              </TableCell>

              {/* Ch. Thumbnail */}
              <LinkCell videoId={videoId} width={40}>
                <Avatar className="w-6 h-6 @md:w-7 @md:h-7 transition-all hover:scale-105">
                  <AvatarImage
                    src={channel.basicInfo.thumbnails.medium?.url}
                    alt={channel.basicInfo.title}
                  />
                  <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
                </Avatar>
              </LinkCell>

              {/* Ch. Title */}
              <LinkCell videoId={videoId} width={150}>
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
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

const LinkCell = ({
  videoId,
  className,
  width,
  children
}: PropsWithChildren<{
  videoId: string
  className?: string
  width?: number
}>) => {
  return (
    <TableCell width={width} className={className ?? ''}>
      <Link href={`/youtube/live/${videoId}`}>{children}</Link>
    </TableCell>
  )
}
