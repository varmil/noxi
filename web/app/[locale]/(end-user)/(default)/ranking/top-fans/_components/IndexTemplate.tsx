import { PropsWithoutRef } from 'react'
import { getFanRankingCount } from 'apis/cheer-ticket-usages/getFanRanking'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { TopFansPagination } from 'config/constants/Pagination'
import TopFansFilterGallery from 'features/cheer/top-fans/components/filter/TopFansFilterGallery'
import TopFansGallery from 'features/cheer/top-fans/components/gallery/TopFansGallery'
import { TopFansSearchParams } from 'features/cheer/top-fans/types/top-fans.type'
import { getStartOf } from 'utils/period/ranking'

type Props = {
  searchParams: TopFansSearchParams
}

export default async function IndexTemplate({
  searchParams
}: PropsWithoutRef<Props>) {
  const { period, group, gender } = searchParams
  const count = await getFanRankingCount({
    group,
    gender,
    usedAt: { gte: getStartOf(period).toDate() }
  })

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <TopFansFilterGallery className="max-w-6xl mx-auto" />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <TopFansGallery className="max-w-6xl mx-auto" {...searchParams} />
        <ResponsivePagination
          totalPages={TopFansPagination.getTotalPages(count)}
        />
      </section>
    </section>
  )
}
