import { PropsWithoutRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { getCheeredRanking } from 'apis/cheer-ticket-usages/getCheeredRanking'
import { PageXSPX } from 'components/page'
import { MostCheeredPagination } from 'config/constants/Pagination'
import { MostCheeredDefaultUrl } from 'config/constants/RankingRoute'
import MostCheeredTable from 'features/cheer/most-cheered/components/table/MostCheeredTable'
import MostCheeredTableTitle from 'features/cheer/most-cheered/components/table/MostCheeredTableTitle'
import { MostCheeredSearchParams } from 'features/cheer/most-cheered/types/most-cheered.type'
import dayjs from 'lib/dayjs'
import { Link } from 'lib/navigation'

export type MostCheeredGalleryProps = MostCheeredSearchParams & {
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
  const feat = await getTranslations('Features.mostCheered')
  const { period, group, gender, date, page, compact, className } = props

  // Period --> usedAt.gte
  let gte: Date
  switch (period) {
    case 'last7Days':
      gte = dayjs().subtract(7, 'days').toDate()
      break
    case 'last30Days':
      gte = dayjs().subtract(30, 'days').toDate()
      break
    case 'all':
      gte = dayjs().startOf('year').toDate() // 便宜的にシーズンの始まり（01/01 09:00 JST）
      break
    default:
      throw new Error('Invalid period')
  }

  const cheeredUsages = await getCheeredRanking({
    group,
    usedAt: { gte },
    limit: MostCheeredPagination.getLimit(),
    offset: MostCheeredPagination.getOffset(page)
  })

  return (
    <section className={`@container space-y-4 sm:space-y-6 ${className || ''}`}>
      <MostCheeredTableTitle
        period={period}
        group={group}
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
