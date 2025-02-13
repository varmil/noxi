import { ComponentProps, PropsWithChildren, PropsWithoutRef } from 'react'
import { ChevronRight, JapaneseYen } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getChannels } from 'apis/youtube/getChannels'
import { getSupersSummaries } from 'apis/youtube/getSupersSummaries'
import { ChannelSchema } from 'apis/youtube/schema/channelSchema'
import TableCellOfCountry from 'components/ranking/table/cell/TableCellOfCountry'
import TableCellOfGroup from 'components/ranking/table/cell/TableCellOfGroup'
import Dimension from 'components/ranking/table/styles/Dimension'
import BaseLinkCell from 'features/channels-ranking/components/table/cell/base/LinkCell'
import ChannelsRankingTableHeader from 'features/channels-ranking/components/table/header/ChannelsRankingTableHeader'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'
import { ChannelsRankingPeriod } from 'types/period'
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
    dimension === 'super-chat' && period !== 'all'
      ? getSupersSummaries({
          channelIds,
          limit: channelIds.length,
          orderBy: [{ field: period, order: 'desc' }],
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

          const LinkCell = (
            props: PropsWithChildren &
              Omit<ComponentProps<typeof BaseLinkCell>, 'channelId' | 'group'>
          ) => <BaseLinkCell channelId={channelId} group={group} {...props} />

          return (
            <TableRow key={channelId}>
              {/* Rank */}
              <TableCell className="align-top">
                <div className="text-center text-lg @lg:font-bold w-6 text-nowrap">
                  {i + 1}
                </div>
              </TableCell>

              {/* Channel Thumbnail */}
              <LinkCell align="center">
                <ChannelThumbnail channel={channel} />
              </LinkCell>

              {/* Channel Title */}
              <LinkCell>
                <div className="flex items-center line-clamp-1 hover:underline">
                  {channel.basicInfo.title}
                </div>
              </LinkCell>

              {/* Supers */}
              {dimension === 'super-chat' && (
                <LinkCell className="min-w-[102px] max-w-[180px]">
                  <Dimension
                    active={true}
                    dividend={convertMicrosToAmount(summary ?? BigInt(0))}
                    divisor={convertMicrosToAmount(topAmountMicros)}
                    icon={<JapaneseYen className="w-3 h-3 @lg:w-4 @lg:h-4" />}
                    rtl
                  />
                </LinkCell>
              )}

              {/* Subscribers */}
              {dimension === 'subscriber' && (
                <LinkCell className="min-w-[102px] max-w-[180px]" align="right">
                  <Dimension
                    active={dimension === 'subscriber'}
                    dividend={channel.statistics.subscriberCount}
                    divisor={topSubscribers}
                    rtl
                  />
                </LinkCell>
              )}

              {/* 3xl-: Group */}
              <TableCellOfGroup groupId={group} />

              {/* 3xl-: Country */}
              <TableCellOfCountry countryCode={country} />

              {/* xs - 2xl: Link Icon */}
              <LinkCell className="@3xl:hidden">
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
  channel
}: {
  className?: string
  channel: ChannelSchema
}) => {
  return (
    <Avatar
      className={`w-7 h-7 @lg:w-12 @lg:h-12 transition-all hover:scale-105 ${
        className || ''
      }`}
    >
      <AvatarImage
        src={channel.basicInfo.thumbnails.medium?.url}
        alt={channel.basicInfo.title}
      />
      <AvatarFallback>{channel.basicInfo.title}</AvatarFallback>
    </Avatar>
  )
}
