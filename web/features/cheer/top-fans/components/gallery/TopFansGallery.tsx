import { PropsWithoutRef } from 'react'
import { getFanRanking } from 'apis/cheer-ticket-usages/getFanRanking'
import { getGroupName } from 'apis/groups'
import { PageXSPX } from 'components/page'
import { TopFansPagination } from 'config/constants/Pagination'
import TopFansTable from 'features/cheer/top-fans/components/table/TopFansTable'
import TopFansTableTitle from 'features/cheer/top-fans/components/table/TopFansTableTitle'
import { TopFansSearchParams } from 'features/cheer/top-fans/types/top-fans.type'
import { TopFansPeriod } from 'types/period'
import { getStartOf } from 'utils/period/ranking'

type TopFansGalleryProps = TopFansSearchParams & {
  period: TopFansPeriod
  group: string
  className?: string
}

/**
 * 役割
 * Gallery：Orderを決める（ランキングの順番を決める）
 * Table  ：各列で表示する内容を決める（各列をfetchする）
 *
 * 両者で似たようなFetchになるのは許容する
 **/
export default async function TopFansGallery(
  props: PropsWithoutRef<TopFansGalleryProps>
) {
  const { period, group, gender, date, page, className } = props

  // Client Component（TableTitle）に渡す日時を Server Component で確定させる
  const titleDate = (date ? new Date(date) : new Date()).toISOString()

  const groupName = await getGroupName(group, {
    errorContext: 'top-fans gallery'
  })

  const fanUsages = await getFanRanking({
    group,
    gender,
    usedAt: { gte: getStartOf(period).toDate() },
    limit: TopFansPagination.getLimit(),
    offset: TopFansPagination.getOffset(page)
  })

  return (
    <section className={`@container space-y-4 sm:space-y-6 ${className || ''}`}>
      <TopFansTableTitle
        period={period}
        groupName={groupName}
        gender={gender}
        date={titleDate}
        className={`${PageXSPX} sm:px-0`}
      />

      <TopFansTable
        fanUsages={fanUsages}
        period={period}
        group={group}
        gender={gender}
        date={date ? new Date(date) : undefined}
        page={Number(page) || 1}
      />

    </section>
  )
}
