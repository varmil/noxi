import { ComponentProps, PropsWithChildren, PropsWithoutRef } from 'react'
import { ChevronRight, Tickets } from 'lucide-react'
import { Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { FanUsagesSchema } from 'apis/cheer-ticket-usages/cheerTicketUsageSchema'
import { getUserProfiles } from 'apis/user-profiles/getUserProfiles'
import { RANK_HIGHLIGHTER_ID_PREFIX } from 'components/ranking/highlighter/rank-highlighter'
import LinkToUserCell from 'components/ranking/table/cell/LinkToUserCell'
import Dimension from 'components/ranking/table/styles/Dimension'
import DisplayName from 'components/ranking/table/styles/DisplayName'
import UserThumbnail from 'components/ranking/table/styles/UserThumbnail'
import { GroupString } from 'config/constants/Group'
import { MostCheeredPagination as Pagination } from 'config/constants/Pagination'
import TopFansTableHeader from 'features/cheer/top-fans/components/table/header/TopFansTableHeader'
import { Gender } from 'types/gender'
import { MostCheeredPeriod } from 'types/period'

type Props = PropsWithoutRef<{
  fanUsages: FanUsagesSchema
  period: MostCheeredPeriod
  group?: GroupString
  gender?: Gender
  date?: Date
  page?: number
}>

export default async function TopFansTable({
  fanUsages,
  period,
  group,
  gender,
  date,
  page = 1
}: Props) {
  const userIds = fanUsages.map(e => e.userId)
  const [profiles] = await Promise.all([
    getUserProfiles({ userIds: userIds, limit: userIds.length })
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
  const topUsedCount = fanUsages[0]?.usedCount ?? 0

  return (
    <Table>
      <TopFansTableHeader />
      <TableBody>
        {fanUsages.map(({ userId, usedCount }, i) => {
          const profile = profiles.find(profile => profile.userId === userId)
          if (!profile) return null

          const LinkCell = (
            props: PropsWithChildren &
              Omit<ComponentProps<typeof LinkToUserCell>, 'username'>
          ) => (
            <LinkToUserCell
              username={profile.username}
              prefetch={false}
              {...props}
            />
          )

          return (
            <TableRow
              key={`${userId}-${i}`}
              id={`${RANK_HIGHLIGHTER_ID_PREFIX}${userId}`} // For Highlighter
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

              {/* User Thumbnail */}
              <LinkCell align="center">
                <UserThumbnail profile={profile} />
              </LinkCell>

              {/* Display Name */}
              <LinkCell>
                <DisplayName name={profile.name} />
              </LinkCell>

              {/* Used Count */}
              <LinkCell align="right" className="min-w-[98px] max-w-[180px]">
                <Dimension
                  dividend={usedCount}
                  divisor={topUsedCount}
                  icon={<Tickets className="size-3 text-muted-foreground" />}
                  rtl
                />
              </LinkCell>

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
