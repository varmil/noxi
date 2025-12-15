import { ComponentProps, PropsWithChildren, PropsWithoutRef } from 'react'
import { ChevronRight, Tickets } from 'lucide-react'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { CheeredUsagesSchema } from 'apis/cheer-ticket-usages/cheerTicketUsageSchema'
import { getChannels } from 'apis/youtube/getChannels'
import { RANK_HIGHLIGHTER_ID_PREFIX } from 'components/ranking/highlighter/rank-highlighter'
import CountryCell from 'components/ranking/table/cell/CountryCell'
import GroupCell from 'components/ranking/table/cell/GroupCell'
import LinkToChannelCell from 'components/ranking/table/cell/LinkToChannelCell'
import ChannelThumbnail from 'components/ranking/table/styles/ChannelThumbnail'
import ChannelTitle from 'components/ranking/table/styles/ChannelTitle'
import Dimension from 'components/ranking/table/styles/Dimension'
import { MostCheeredPagination as Pagination } from 'config/constants/Pagination'
import { Gender } from 'types/gender'
import { MostCheeredPeriod } from 'types/period'
import MostCheeredTableHeader from './header/MostCheeredTableHeader'

type Props = PropsWithoutRef<{
  cheeredUsages: CheeredUsagesSchema
  period: MostCheeredPeriod
  group?: string
  gender?: Gender
  date?: Date
  page?: number
}>

export default async function MostCheeredTable({
  cheeredUsages,
  period,
  group,
  gender,
  date,
  page = 1
}: Props) {
  const channelIds = cheeredUsages.map(e => e.channelId)
  const [channels] = await Promise.all([
    getChannels({ ids: channelIds, limit: channelIds.length })
    //   hasRank({ group, gender })
    //     ? getSupersRankingHistories({
    //         channelIds,
    //         period,
    //         rankingType: getSupersRankingType({ group, gender }),
    //         createdAfter: rangeDatetimeForPreviousPeriod(period).gte,
    //         createdBefore: rangeDatetimeForPreviousPeriod(period).lte,
    //         limit: channelIds.length
    //       })
    //     : Promise.resolve([])
  ])

  /** Progress.valueで使用する */
  const topUsedCount = cheeredUsages[0]?.usedCount ?? 0

  return (
    <Table>
      <MostCheeredTableHeader />
      <TableBody>
        {cheeredUsages.map(({ channelId, usedCount }, i) => {
          const channel = channels.find(
            channel => channel.basicInfo.id === channelId
          )
          if (!channel) return null

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
                  {/* {hasRank({ group, gender }) && (
                    <ComparedToPreviousPeriod
                      current={rank}
                      previous={
                        supersRankingHistories.find(
                          h => h.channelId === channelId
                        )?.rank
                      }
                    />
                  )} */}
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

              {/* Used Count */}
              <LinkCell className="min-w-[98px] max-w-[180px]" align="right">
                <Dimension
                  dividend={usedCount}
                  divisor={topUsedCount}
                  icon={<Tickets className="size-3 text-muted-foreground" />}
                  rtl
                />
              </LinkCell>

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
