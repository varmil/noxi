import { PropsWithChildren } from 'react'
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
import { Link } from 'lib/navigation'

export default async function StreamRankingTable({}: PropsWithChildren<{}>) {
  const streams = await getStreams({
    status: 'live',
    orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
    limit: 6
  })
  const [t, channels, liveStreamingDetailsList] = await Promise.all([
    getTranslations('Page.index.section.hero'),
    getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
    getLiveStreamingDetails({ videoIds: streams.map(stream => stream.videoId) })
  ])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="text-nowrap">{t('channel')}</TableHead>
          <TableHead className="text-right text-nowrap">
            {t('viewers')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {streams.map(stream => {
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
                  <Avatar className="w-6 h-6 lg:w-8 lg:h-8 transition-all hover:scale-105">
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

              <TableCell className="text-lg text-right tabular-nums">
                {liveStreamingDetails.concurrentViewers?.toLocaleString() ??
                  '--'}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
