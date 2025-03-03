import { ComponentProps, PropsWithChildren, PropsWithoutRef } from 'react'
import { ChevronRight, JapaneseYen } from 'lucide-react'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getChannels } from 'apis/youtube/getChannels'
import { getSupersRankingHistories } from 'apis/youtube/getSupersRankingHistories'
import { getSupersSummaries } from 'apis/youtube/getSupersSummaries'
import { RANK_HIGHLIGHTER_ID_PREFIX } from 'components/ranking/highlighter/rank-highlighter'
import TableCellOfCountry from 'components/ranking/table/cell/TableCellOfCountry'
import TableCellOfGroup from 'components/ranking/table/cell/TableCellOfGroup'
import Dimension from 'components/ranking/table/styles/Dimension'
import { GroupString } from 'config/constants/Group'
import { ChannelsRankingPagination as Pagination } from 'config/constants/Pagination'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod } from 'types/period'
import { convertMicrosToAmount } from 'utils/amount'
import { rangeDatetimeForPreviousPeriod } from 'utils/period/period'
import {
  getSupersRankingType,
  hasSupersRanking
} from 'utils/ranking/channels-ranking'
import ChannelThumbnail from './cell/ChannelThumbnail'
import ComparedToPreviousPeriod from './cell/ComparedToPreviousPeriod'
import BaseLinkCell from './cell/base/LinkCell'
import ChannelsRankingTableHeader from './header/ChannelsRankingTableHeader'

type Props = PropsWithoutRef<{
  channelIds: string[]
  dimension: ChannelsRankingDimension
  period: ChannelsRankingPeriod
  group?: GroupString
  gender?: Gender
  date?: Date
  page?: number
}>

export default async function ChannelsRankingTable({
  channelIds,
  dimension,
  period,
  group,
  gender,
  date,
  page = 1
}: Props) {
  const isSuperChat = dimension === 'super-chat' && period !== 'all'
  const [channels, supersSummaries, supersRankingHistories] = await Promise.all(
    [
      getChannels({ ids: channelIds, limit: channelIds.length }),
      isSuperChat
        ? getSupersSummaries({
            channelIds,
            limit: channelIds.length,
            orderBy: [{ field: period, order: 'desc' }],
            date
          })
        : Promise.resolve([]),
      isSuperChat && hasSupersRanking({ dimension, group, gender })
        ? getSupersRankingHistories({
            channelIds,
            period,
            rankingType: getSupersRankingType({ group, gender }),
            createdAfter: rangeDatetimeForPreviousPeriod(period).gte,
            createdBefore: rangeDatetimeForPreviousPeriod(period).lte,
            limit: channelIds.length
          })
        : Promise.resolve([])
    ]
  )

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

          /** Top 5まではCTRが高いのでprefetch=true */
          const LinkCell = (
            props: PropsWithChildren &
              Omit<ComponentProps<typeof BaseLinkCell>, 'channelId' | 'group'>
          ) => (
            <BaseLinkCell
              channelId={channelId}
              group={channel.peakX.group}
              prefetch={i < 5}
              {...props}
            />
          )

          const rank = Pagination.getRankFromPage(page, i)

          return (
            <TableRow
              key={channelId}
              id={`${RANK_HIGHLIGHTER_ID_PREFIX}${channelId}`} // For Highlighter
            >
              {/* Rank */}
              <TableCell className="py-1">
                <div className="flex flex-col items-center gap-0 @lg:gap-0.5">
                  <div className="text-center text-lg @lg:font-bold w-6 text-nowrap">
                    {Pagination.getRankFromPage(page, i)}
                  </div>
                  {hasSupersRanking({ dimension, group, gender }) && (
                    <ComparedToPreviousPeriod
                      current={rank}
                      previous={
                        supersRankingHistories.find(
                          h => h.channelId === channelId
                        )?.rank
                      }
                      // TODO: データが溜まったら消す
                      counting={
                        !(period === 'last24Hours' || period === 'last7Days')
                      }
                    />
                  )}
                </div>
              </TableCell>

              {/* Channel Thumbnail */}
              <LinkCell align="center">
                <ChannelThumbnail channel={channel} />
              </LinkCell>

              {/* Channel Title */}
              <LinkCell>
                <div className="flex items-center hover:underline">
                  <span className="line-clamp-2 break-anywhere">
                    {channel.basicInfo.title}
                  </span>
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
              <TableCellOfGroup groupId={channel.peakX.group} />

              {/* 3xl-: Country */}
              <TableCellOfCountry countryCode={channel.peakX.country} />

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
