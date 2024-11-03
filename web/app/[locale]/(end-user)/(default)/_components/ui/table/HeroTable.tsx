import { PropsWithChildren } from 'react'
import { useTranslations } from 'next-intl'
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

export function HeroTableTitle({}: PropsWithChildren<{}>) {
  const t = useTranslations('Page.index')
  return <h2 className="text-xl font-bold mb-4">{t('section.live.ranking')}</h2>
}

export default async function HeroTable({}: PropsWithChildren<{}>) {
  const streams = await getStreams({
    orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
    limit: 5
  })
  const [t, channels, liveStreamingDetailsList] = await Promise.all([
    getTranslations('Page.index'),
    getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
    getLiveStreamingDetails({ videoIds: streams.map(stream => stream.videoId) })
  ])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Channel</TableHead>
          <TableHead>Viewers</TableHead>
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
              <TableCell width={40} className="font-medium">
                <Avatar className="w-6 h-6 lg:w-8 lg:h-8 transition-all hover:scale-105">
                  <AvatarImage
                    src={channel.basicInfo.thumbnails.medium?.url}
                    alt={channel.basicInfo.title}
                  />
                  <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
                </Avatar>
              </TableCell>

              <TableCell className="">
                <div className="text-muted-foreground">
                  {channel.basicInfo.title}
                </div>
              </TableCell>

              <TableCell className="">
                <div className="text-muted-foreground">3.7K</div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
