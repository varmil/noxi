import { PropsWithoutRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { getCheeredRanking } from 'apis/cheer-ticket-usages/getCheeredRanking'
import { getGroup } from 'apis/groups'
import { PageXSPX } from 'components/page'
import { MostCheeredPagination } from 'config/constants/Pagination'
import { MostCheeredDefaultUrl } from 'config/constants/RankingRoute'
import MostCheeredTable from 'features/cheer/most-cheered/components/table/MostCheeredTable'
import MostCheeredTableTitle from 'features/cheer/most-cheered/components/table/MostCheeredTableTitle'
import { MostCheeredSearchParams } from 'features/cheer/most-cheered/types/most-cheered.type'
import { Link } from 'lib/navigation'
import { MostCheeredPeriod } from 'types/period'
import { getStartOf } from 'utils/period/ranking'

type MostCheeredGalleryProps = MostCheeredSearchParams & {
  period: MostCheeredPeriod
  group: string
  compact?: boolean
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
  const [feat, groupData] = await Promise.all([
    getTranslations('Features.mostCheered'),
    getGroup(props.group)
  ])
  const { period, group, gender, date, page, compact, className } = props
  const groupName = groupData?.name ?? group

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
        date={date ? new Date(date) : undefined}
        className={`${!compact ? PageXSPX : ''} sm:px-0`}
      />

      <MostCheeredTable
        cheeredUsages={cheeredUsages}
        period={period}
        group={group}
        gender={gender}
        date={date ? new Date(date) : undefined}
        page={Number(page) || 1}
      />

      {compact && (
        <Button variant={'outline'} asChild className="w-full gap-1">
          <Link href={MostCheeredDefaultUrl}>
            {feat('viewAll')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </section>
  )
}
