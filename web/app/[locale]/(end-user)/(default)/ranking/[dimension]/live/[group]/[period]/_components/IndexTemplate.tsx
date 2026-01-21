import { PropsWithoutRef, Suspense } from 'react'
import { getGroupName } from 'apis/groups'
import { PageSMPX, PageXSPX } from 'components/page'
import StreamRankingFilterGallery from 'features/stream-ranking/components/filter/StreamRankingFilterGallery'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'
import StreamRankingGallerySkeleton from 'features/stream-ranking/components/gallery/StreamRankingGallerySkeleton'
import StreamRankingGalleryTitle from 'features/stream-ranking/components/gallery/StreamRankingGalleryTitle'
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

  const groupName = await getGroupName(group, {
    errorContext: 'stream ranking index'
  })

  // Client Component に渡す日時を Server Component で確定させてハイドレーションエラーを防ぐ
  const titleDate = new Date().toISOString()

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <StreamRankingFilterGallery className="max-w-6xl mx-auto" />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <section className="max-w-6xl mx-auto @container space-y-4 sm:space-y-6">
          <StreamRankingGalleryTitle
            dimension={dimension}
            period={period}
            group={group}
            groupName={groupName}
            gender={gender}
            date={titleDate}
            className={`${PageXSPX} sm:px-0`}
          />

          <Suspense
            key={`${period}-${dimension}-${group}-${gender}-${page}`}
            fallback={<StreamRankingGallerySkeleton />}
          >
            <StreamRankingGallery
              period={period}
              dimension={dimension}
              group={group}
              {...searchParams}
            />
          </Suspense>
        </section>
      </section>
    </section>
  )
}
