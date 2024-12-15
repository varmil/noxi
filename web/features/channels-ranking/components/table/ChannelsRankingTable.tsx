import { PropsWithoutRef } from 'react'
import { ChevronRight, JapaneseYen } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getChannels } from 'apis/youtube/getChannels'
import { getSupersSummaries } from 'apis/youtube/getSupersSummaries'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import TableCellOfCountry from 'components/ranking/table/cell/TableCellOfCountry'
import TableCellOfGroup from 'components/ranking/table/cell/TableCellOfGroup'
import Dimension from 'components/ranking/table/styles/Dimension'
import { GroupString } from 'config/constants/Site'
import LinkCell from 'features/channels-ranking/components/table/cell/base/LinkCell'
import ChannelsRankingTableHeader from 'features/channels-ranking/components/table/header/ChannelsRankingTableHeader'
import {
  ChannelsRankingDimension,
  ChannelsRankingPeriod
} from 'features/channels-ranking/types/channels-ranking.type'
import { Link } from 'lib/navigation'
import { convertMicrosToAmount } from 'utils/amount'

type Props = PropsWithoutRef<{
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  date?: Date
  channelIds: string[]
}>

export default async function ChannelsRankingTable({
  period,
  dimension,
  date,
  channelIds
}: Props) {
  const [channels, supersSummaries] = await Promise.all([
    getChannels({ ids: channelIds, limit: channelIds.length }),
    dimension === 'super-chat'
      ? getSupersSummaries({
          channelIds,
          limit: channelIds.length,
          orderBy: [{ field: period, order: 'desc' }], // 24Hours or それ以外で型が違うのでこのパラメタは必須
          date
        })
      : Promise.resolve([])
  ])

  /** Progress.valueで使用する */
  const topAmountMicros = (supersSummaries[0]?.[period] as bigint) ?? BigInt(0)
  const topSubscribers =
    channels.find(channel => channel.basicInfo.id === channelIds[0])?.statistics
      .subscriberCount ?? 0

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
          )?.[period] as bigint | undefined

          const { group, country } = channel.peakX

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
                  group={group}
                />
              </TableCell>

              {/* Channel Title */}
              <LinkCell channelId={channelId} group={group}>
                <div className="flex items-center line-clamp-1 hover:underline">
                  {channel.basicInfo.title}
                </div>
              </LinkCell>

              {/* Supers */}
              {dimension === 'super-chat' && (
                <TableCell className="min-w-[100px] max-w-[180px]">
                  <Dimension
                    active={true}
                    dividend={convertMicrosToAmount(summary ?? BigInt(0))}
                    divisor={convertMicrosToAmount(topAmountMicros)}
                    icon={<JapaneseYen className="w-3 h-3 @xl:w-4 @xl:h-4" />}
                    rtl
                  />
                </TableCell>
              )}

              {/* Subscribers */}
              {dimension === 'subscriber' && (
                <TableCell className="min-w-[100px] max-w-[180px]">
                  <Dimension
                    active={dimension === 'subscriber'}
                    dividend={channel.statistics.subscriberCount}
                    divisor={topSubscribers}
                    rtl
                  />
                </TableCell>
              )}

              {/* 3xl-: Group */}
              <TableCellOfGroup groupId={group} />

              {/* 3xl-: Country */}
              <TableCellOfCountry countryCode={country} />

              {/* xs - 2xl: Link Icon */}
              <LinkCell
                className="@3xl:hidden"
                channelId={channelId}
                group={group}
              >
                <ChevronRight className="w-4 h-4" />
              </LinkCell>
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
