import { PropsWithoutRef, Suspense } from 'react'
import { PageSMPX } from 'components/page'
import ChannelsRankingFilterGallery from 'features/channels-ranking/components/filter/ChannelsRankingFilterGallery'
import ChannelsRankingGallery from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import ChannelsRankingGallerySkeleton from 'features/channels-ranking/components/gallery/ChannelsRankingGallerySkeleton'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
import { ChannelsRankingPeriod } from 'types/period'

type Props = {
  period: ChannelsRankingPeriod
  dimension: ChannelsRankingDimension
  group: string
  searchParams: ChannelsRankingSearchParams
}

export default async function IndexTemplate({
  period,
  dimension,
  group,
  searchParams
}: PropsWithoutRef<Props>) {
  const { gender, date, page } = searchParams

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <ChannelsRankingFilterGallery
          className="max-w-6xl mx-auto"
          dimension={dimension}
        />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <Suspense
          key={`${period}-${dimension}-${group}-${gender}-${date}-${page}`}
          fallback={<ChannelsRankingGallerySkeleton />}
        >
          <ChannelsRankingGallery
            className="max-w-6xl mx-auto"
            period={period}
            dimension={dimension}
            group={group}
            {...searchParams}
          />
        </Suspense>
      </section>
    </section>
  )
}
