import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getLiveStreamingDetails } from 'apis/youtube/data-api/getLiveStreamingDetails'
import { getChannels } from 'apis/youtube/getChannels'
import { getStreams } from 'apis/youtube/getStreams'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import GroupImageOrIcon from 'components/group/GroupImageOrIcon'
import VideoThumbnail from 'components/youtube/video/VideoThumbnail'
import { GroupString } from 'config/constants/Site'
import TableGroupCell from 'features/stream-ranking/components/table/cell/TableGroupCell'
import LinkCell from 'features/stream-ranking/components/table/cell/base/LinkCell'
import StreamRankingTableHeader from 'features/stream-ranking/components/table/header/StreamRankingTableHeader'
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
  const [tg, t, channels, liveStreamingDetailsList] = await Promise.all([
    getTranslations('Global.ranking'),
    getTranslations('Features.streamRanking'),
    getChannels({ ids: streams.map(stream => stream.snippet.channelId) }),
    getLiveStreamingDetails({ videoIds: streams.map(stream => stream.videoId) })
  ])
  /** 現在の視聴者数で並び替え */
  const sortedStreams = getSortedStreams(streams, liveStreamingDetailsList)
  /** Progress.valueで使用する */
  const topConcurrentViewers =
    liveStreamingDetailsList.find(
      video => video.id === sortedStreams[0].videoId
    )?.liveStreamingDetails?.concurrentViewers ?? 0

  return (
    <Table>
      <StreamRankingTableHeader />
      <TableBody>
        {sortedStreams.map((stream, i) => {
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
          const { concurrentViewers } = liveStreamingDetails

          return (
            <TableRow key={videoId}>
              {/* Rank */}
              <TableCell className="align-top">
                <div className="text-lg font-bold w-3 text-nowrap">{i + 1}</div>
              </TableCell>

              {/* Stream Thumbnail */}
              <LinkCell
                videoId={videoId}
                className="min-w-[150px] max-w-[170px] relative"
              >
                <VideoThumbnail
                  size="high"
                  title={stream.snippet.title}
                  thumbnails={stream.snippet.thumbnails}
                  className="min-w-[150px] max-w-[170px] rounded-sm"
                />
                <GroupImageOrIcon
                  className="@lg:hidden absolute bottom-0.5 right-0 bg-background p-1.5 w-7 h-7"
                  groupId={stream.group}
                />
              </LinkCell>

              {/* Stream Title & Ch. Thumbnail & Ch. Title */}
              <LinkCell
                videoId={videoId}
                className="@lg:min-w-[230px] @lg:max-w-[460px]"
              >
                <div className="flex flex-col gap-2 @lg:gap-4">
                  <div className="font-light line-clamp-2">
                    {stream.snippet.title}
                  </div>

                  <Dimension
                    className="@lg:hidden"
                    concurrentViewers={concurrentViewers}
                    topConcurrentViewers={topConcurrentViewers}
                  />

                  <SmallChannel className="@lg:hidden" channel={channel} />
                </div>
              </LinkCell>

              {/* lg-: Viewers */}
              <TableCell width={220} className="hidden @lg:table-cell">
                <Dimension
                  concurrentViewers={concurrentViewers}
                  topConcurrentViewers={topConcurrentViewers}
                />
              </TableCell>

              {/* lg-: Channel */}
              <TableCell width={130} className="hidden @lg:table-cell">
                <LargeChannel group={stream.group} channel={channel} />
              </TableCell>

              {/* lg-: Group */}
              <TableGroupCell
                className="hidden @lg:table-cell"
                width={50}
                groupId={stream.group}
              />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

const Dimension = ({
  className,
  concurrentViewers,
  topConcurrentViewers
}: {
  className?: string
  concurrentViewers?: number
  topConcurrentViewers: number
}) => {
  const t = useTranslations('Features.streamRanking')
  return (
    <div className={`max-w-60 tabular-nums ${className || ''}`}>
      <span className="font-bold">
        {concurrentViewers?.toLocaleString() ?? '--'}
      </span>
      <div>
        <Progress
          title={t('viewers')}
          className="h-1"
          value={Math.round(
            ((concurrentViewers ?? 0) / topConcurrentViewers) * 100
          )}
        />
      </div>
    </div>
  )
}

const SmallChannel = ({
  className,
  channel
}: {
  className?: string
  channel: ChannelSchema
}) => {
  return (
    <div className={`flex items-center gap-2 font-light ${className || ''}`}>
      <Avatar className="w-4 h-4 @md:w-5 @md:h-5 transition-all hover:scale-105">
        <AvatarImage
          src={channel.basicInfo.thumbnails.medium?.url}
          alt={channel.basicInfo.title}
        />
        <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
      </Avatar>
      <div className="line-clamp-1">{channel.basicInfo.title}</div>
    </div>
  )
}

const LargeChannel = ({
  group,
  channel
}: {
  group: GroupString
  channel: ChannelSchema
}) => {
  return (
    <Link
      className="flex flex-col items-center gap-1"
      href={`/${group}/channels/${channel.basicInfo.id}`}
    >
      <Avatar className="w-12 h-12 transition-all hover:scale-105">
        <AvatarImage
          src={channel.basicInfo.thumbnails.medium?.url}
          alt={channel.basicInfo.title}
        />
        <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
      </Avatar>
      <div className="line-clamp-1 break-all">{channel.basicInfo.title}</div>
    </Link>
  )
}
