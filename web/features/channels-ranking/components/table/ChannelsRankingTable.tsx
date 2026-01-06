import { ComponentProps, PropsWithChildren, PropsWithoutRef } from 'react'
import { ChevronRight, JapaneseYen } from 'lucide-react'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { getSupersRankingHistories } from 'apis/supers/getSupersRankingHistories'
import { getSupersSummaries } from 'apis/supers/getSupersSummaries'
import { getSupersSnapshotRanking } from 'apis/supers-snapshots/getRanking'
import { getChannels } from 'apis/youtube/getChannels'
import { RANK_HIGHLIGHTER_ID_PREFIX } from 'components/ranking/highlighter/rank-highlighter'
import CountryCell from 'components/ranking/table/cell/CountryCell'
import GroupCell from 'components/ranking/table/cell/GroupCell'
import LinkToChannelCell from 'components/ranking/table/cell/LinkToChannelCell'
import ChannelThumbnail from 'components/ranking/table/styles/ChannelThumbnail'
import ChannelTitle from 'components/ranking/table/styles/ChannelTitle'
import Dimension from 'components/ranking/table/styles/Dimension'
import { ChannelsRankingPagination as Pagination } from 'config/constants/Pagination'
import { ChannelsRankingDimension } from 'features/channels-ranking/types/channels-ranking.type'
import {
  getSupersSnapshotParams,
  isSnapshotPeriod
} from 'features/channels-ranking/utils/gallery-params'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod, Period, SnapshotPeriod } from 'types/period'
import { convertMicrosToAmount } from 'utils/amount'
import { rangeDatetimeForPreviousPeriod } from 'utils/period/period'
import {
  getSupersRankingType,
  hasSupersRanking
} from 'utils/ranking/channels-ranking'
import ComparedToPreviousPeriod from './cell/ComparedToPreviousPeriod'
import ChannelsRankingTableHeader from './header/ChannelsRankingTableHeader'

type Props = PropsWithoutRef<{
  channelIds: string[]
  dimension: ChannelsRankingDimension
  period: ChannelsRankingPeriod
  group?: string
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
  const isSnapshot = isSnapshotPeriod(period)
  const isSuperChat = dimension === 'super-chat' && period !== 'wholePeriod'
  const isRegularSuperChat = isSuperChat && !isSnapshot

  const [channels, supersSummaries, supersRankingHistories, snapshotRanking] =
    await Promise.all([
      getChannels({ ids: channelIds, limit: channelIds.length }),
      isRegularSuperChat
        ? getSupersSummaries({
            channelIds,
            limit: channelIds.length,
            orderBy: [{ field: period as Period, order: 'desc' }],
            date
          })
        : Promise.resolve([]),
      isRegularSuperChat && hasSupersRanking({ dimension, group, gender })
        ? getSupersRankingHistories({
            channelIds,
            period: period as Period,
            rankingType: getSupersRankingType({ group, gender }),
            createdAfter: rangeDatetimeForPreviousPeriod(period as Period).gte,
            createdBefore: rangeDatetimeForPreviousPeriod(period as Period).lte,
            limit: channelIds.length
          })
        : Promise.resolve([]),
      isSnapshot && isSuperChat && group
        ? getSupersSnapshotRanking(
            getSupersSnapshotParams({
              period: period as SnapshotPeriod,
              group,
              gender,
              page: String(page)
            })
          )
        : Promise.resolve([])
    ])

  /** Progress.valueで使用する */
  const topAmountMicros = isSnapshot
    ? snapshotRanking[0]?.amountMicros ?? BigInt(0)
    : (supersSummaries[0]?.[period as Period] as bigint) ?? BigInt(0)
  const topSubscribers =
    channels.find(channel => channel.basicInfo.id === channelIds[0])?.statistics
      .subscriberCount ?? 0

  // スナップショットの金額マップを作成
  const snapshotAmountMap = new Map(
    snapshotRanking.map(s => [s.channelId, s.amountMicros])
  )

  return (
    <Table>
      <ChannelsRankingTableHeader dimension={dimension} />
      <TableBody>
        {channelIds.map((channelId, i) => {
          const channel = channels.find(
            channel => channel.basicInfo.id === channelId
          )
          if (!channel) return null

          const summary = isSnapshot
            ? snapshotAmountMap.get(channelId)
            : (supersSummaries.find(
                summary => summary.channelId === channelId
              )?.[period as Period] as bigint | undefined)

          /** prefetch=false */
          const LinkCell = (
            props: PropsWithChildren &
              Omit<
                ComponentProps<typeof LinkToChannelCell>,
                'channelId' | 'group'
              >
          ) => (
            <LinkToChannelCell
              channelId={channelId}
              group={channel.peakX.group}
              prefetch={false} // before: i < 5
              {...props}
            />
          )

          const rank = Pagination.getRankFromPage(page, i)

          return (
            <TableRow
              key={`${channelId}-${i}`}
              id={`${RANK_HIGHLIGHTER_ID_PREFIX}${channelId}`} // For Highlighter
            >
              {/* Rank */}
              <TableCell className="min-w-2 max-w-16 py-1">
                <div className="flex flex-col items-center gap-0 @lg:gap-0.5">
                  <div className="text-center text-lg @lg:text-xl text-nowrap tracking-tight">
                    {Pagination.getRankFromPage(page, i)}
                  </div>
                  {!isSnapshot &&
                    hasSupersRanking({ dimension, group, gender }) && (
                      <ComparedToPreviousPeriod
                        current={rank}
                        previous={
                          supersRankingHistories.find(
                            h => h.channelId === channelId
                          )?.rank
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
                <ChannelTitle channel={channel} />
              </LinkCell>

              {/* Supers */}
              {dimension === 'super-chat' && (
                <LinkCell className="min-w-[98px] max-w-[180px]">
                  <Dimension
                    dividend={convertMicrosToAmount(summary ?? BigInt(0))}
                    divisor={convertMicrosToAmount(topAmountMicros)}
                    icon={
                      <JapaneseYen className="size-3 text-muted-foreground" />
                    }
                    rtl
                  />
                </LinkCell>
              )}

              {/* Subscribers */}
              {dimension === 'subscriber' && (
                <LinkCell className="min-w-[98px] max-w-[180px]" align="right">
                  <Dimension
                    dividend={channel.statistics.subscriberCount}
                    divisor={topSubscribers}
                    rtl
                  />
                </LinkCell>
              )}

              {/* 3xl-: Group */}
              <GroupCell groupId={channel.peakX.group} />

              {/* 3xl-: Country */}
              <CountryCell countryCode={channel.peakX.country} />

              {/* xs - 2xl: Link Icon */}
              <LinkCell className="min-w-[32px] @3xl:hidden">
                <ChevronRight className="size-4" />
              </LinkCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
