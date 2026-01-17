import { PropsWithoutRef, Suspense } from 'react'
import { getGroupName } from 'apis/groups'
import { PageSMPX, PageXSPX } from 'components/page'
import ChannelsRankingFilterGallery from 'features/channels-ranking/components/filter/ChannelsRankingFilterGallery'
import ChannelsRankingGallery from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import ChannelsRankingGallerySkeleton from 'features/channels-ranking/components/gallery/ChannelsRankingGallerySkeleton'
import ChannelsRankingGalleryTitle from 'features/channels-ranking/components/gallery/ChannelsRankingGalleryTitle'
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

  const groupName = await getGroupName(group, {
    errorContext: 'channels ranking index'
  })

  // Client Component に渡す日時を Server Component で確定させてハイドレーションエラーを防ぐ
  const titleDate = date || new Date().toISOString()

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <ChannelsRankingFilterGallery
          className="max-w-6xl mx-auto"
          dimension={dimension}
        />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <section className="max-w-6xl mx-auto @container space-y-4 sm:space-y-6">
          <ChannelsRankingGalleryTitle
            dimension={dimension}
            period={period}
            groupName={groupName}
            gender={gender}
            date={titleDate}
            className={`${PageXSPX} sm:px-0`}
          />

          <Suspense
            key={`${period}-${dimension}-${group}-${gender}-${date}-${page}`}
            fallback={<ChannelsRankingGallerySkeleton />}
          >
            <ChannelsRankingGallery
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
