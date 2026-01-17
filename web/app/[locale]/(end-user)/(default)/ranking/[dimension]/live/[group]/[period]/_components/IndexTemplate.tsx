import { PropsWithoutRef, Suspense } from 'react'
import { PageSMPX } from 'components/page'
import StreamRankingFilterGallery from 'features/stream-ranking/components/filter/StreamRankingFilterGallery'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'
import StreamRankingGallerySkeleton from 'features/stream-ranking/components/gallery/StreamRankingGallerySkeleton'
import {
  StreamRankingDimension,
  StreamRankingSearchParams
} from 'features/stream-ranking/types/stream-ranking.type'
import { StreamRankingPeriod } from 'types/period'

type Props = {
  period: StreamRankingPeriod
  dimension: StreamRankingDimension
  group: string
  searchParams: StreamRankingSearchParams
}

export default async function IndexTemplate({
  period,
  dimension,
  group,
  searchParams
}: PropsWithoutRef<Props>) {
  const { gender, page } = searchParams

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <StreamRankingFilterGallery className="max-w-6xl mx-auto" />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <Suspense
          key={`${period}-${dimension}-${group}-${gender}-${page}`}
          fallback={<StreamRankingGallerySkeleton />}
        >
          <StreamRankingGallery
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
