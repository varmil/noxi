import { PropsWithoutRef } from 'react'
import { JapaneseYen } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getChannels } from 'apis/youtube/getChannels'
import { getSupersSummaries } from 'apis/youtube/getSupersSummaries'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import CountryFlag from 'components/styles/CountryFlag'
import { GroupString } from 'config/constants/Site'
import TableCellOfGroup from 'features/channels-ranking/components/table/cell/TableCellOfGroup'
import LinkCell from 'features/channels-ranking/components/table/cell/base/LinkCell'
import ChannelsRankingTableHeader from 'features/channels-ranking/components/table/header/ChannelsRankingTableHeader'
import Dimension from 'features/channels-ranking/components/table/styles/Dimension'
import {
  ChannelsRankingDimension,
  ChannelsRankingPeriod
} from 'features/channels-ranking/types/channels-ranking.type'
import { Link } from 'lib/navigation'
import { convertMicrosToAmount } from 'utils/amount'

type Props = PropsWithoutRef<{
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  channelIds: string[]
}>

export default async function ChannelsRankingTable({
  period,
  dimension,
  channelIds
}: Props) {
  const [tg, t, channels, supersSummaries] = await Promise.all([
    getTranslations('Global.ranking'),
    getTranslations('Features.channelsRanking'),
    getChannels({ ids: channelIds, limit: channelIds.length }),
    getSupersSummaries({ channelIds, limit: channelIds.length })
  ])

  console.log('supersSummaries', supersSummaries)

  /** Progress.valueで使用する */
  // TODO: period型をomitとかしてanyにならないようにしたい
  const topAmountMicros =
    supersSummaries.find(summary => summary.channelId === channelIds[0])?.[
      period
    ] ?? 0

  return (
    <Table>
      <ChannelsRankingTableHeader dimension={dimension} />
      <TableBody>
        {channelIds.map((channelId, i) => {
          const channel = channels.find(
            channel => channel.basicInfo.id === channelId
          )
          if (!channel) return null

          const summary = supersSummaries.find(
            summary => summary.channelId === channelId
          )?.[period]
          console.log('summary', summary)

          return (
            <TableRow key={channelId}>
              {/* Rank */}
              <TableCell className="align-top">
                <div className="text-center text-lg @lg:font-bold w-6 text-nowrap">
                  {i + 1}
                </div>
              </TableCell>

              {/* Channel Thumbnail */}
              <TableCell className="">
                <ChannelThumbnail
                  className=""
                  channel={channel}
                  group={channel.peakX?.group}
                />
              </TableCell>

              {/* Channel Title */}
              <LinkCell channelId={channelId} group={channel.peakX.group}>
                <div className="flex items-center font-light line-clamp-1">
                  {channel.basicInfo.title}
                </div>
              </LinkCell>

              {/* Supers */}
              <TableCell width={160} className="min-w-24">
                <Dimension
                  active={dimension === 'super-chat'}
                  dividend={convertMicrosToAmount(summary ?? BigInt(0))}
                  divisor={convertMicrosToAmount(topAmountMicros)}
                  icon={<JapaneseYen className="w-4 h-4" />}
                />
              </TableCell>

              {/* 3xl-: Group */}
              <TableCellOfGroup groupId={channel.peakX.group} />

              {/* 3xl-: Country */}
              <TableCell
                width={50}
                className="hidden @3xl:table-cell justify-items-center"
              >
                <CountryFlag countryCode={channel.peakX?.country} size={24} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

const ChannelThumbnail = ({
  className,
  channel,
  group
}: {
  className?: string
  channel: ChannelSchema
  group?: GroupString
}) => {
  return (
    <Link
      className={`flex items-center justify-center gap-2 ${className || ''}`}
      href={`/${group}/channels/${channel.basicInfo.id}`}
    >
      <Avatar className="w-7 h-7 @lg:w-12 @lg:h-12 transition-all hover:scale-105">
        <AvatarImage
          src={channel.basicInfo.thumbnails.medium?.url}
          alt={channel.basicInfo.title}
        />
        <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
      </Avatar>
    </Link>
  )
}
