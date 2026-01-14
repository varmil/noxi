import { PropsWithoutRef } from 'react'
import { getCheeredRanking } from 'apis/cheer-ticket-usages/getCheeredRanking'
import { getGroupName } from 'apis/groups'
import { PageXSPX } from 'components/page'
import { MostCheeredPagination } from 'config/constants/Pagination'
import MostCheeredTable from 'features/cheer/most-cheered/components/table/MostCheeredTable'
import MostCheeredTableTitle from 'features/cheer/most-cheered/components/table/MostCheeredTableTitle'
import { MostCheeredSearchParams } from 'features/cheer/most-cheered/types/most-cheered.type'
import { MostCheeredPeriod } from 'types/period'
import { getStartOf } from 'utils/period/ranking'

type MostCheeredGalleryProps = MostCheeredSearchParams & {
  period: MostCheeredPeriod
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
export default async function MostCheeredGallery(
  props: PropsWithoutRef<MostCheeredGalleryProps>
) {
  const { period, group, gender, date, page, className } = props

  // Client Component に渡す日時を Server Component で確定させてハイドレーションエラーを防ぐ
  const titleDate = date || new Date().toISOString()

  const groupName = await getGroupName(group, {
    errorContext: 'most-cheered gallery'
  })

  const cheeredUsages = await getCheeredRanking({
    group,
    gender,
    usedAt: { gte: getStartOf(period).toDate() },
    limit: MostCheeredPagination.getLimit(),
    offset: MostCheeredPagination.getOffset(page)
  })

  return (
    <section className={`@container space-y-4 sm:space-y-6 ${className || ''}`}>
      <MostCheeredTableTitle
        period={period}
        groupName={groupName}
        gender={gender}
        date={titleDate}
        className={`${PageXSPX} sm:px-0`}
      />

      <MostCheeredTable
        cheeredUsages={cheeredUsages}
        period={period}
        group={group}
        gender={gender}
        date={date ? new Date(date) : undefined}
        page={Number(page) || 1}
      />

    </section>
  )
}
