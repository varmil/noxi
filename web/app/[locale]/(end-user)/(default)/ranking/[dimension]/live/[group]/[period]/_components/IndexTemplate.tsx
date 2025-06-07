import { PropsWithoutRef } from 'react'
import { getStreamsCount } from 'apis/youtube/getStreams'
import { getSupersBundlesCount } from 'apis/youtube/getSupersBundles'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { GroupString } from 'config/constants/Group'
import { StreamRankingPagination } from 'config/constants/Pagination'
import StreamRankingFilterGallery from 'features/stream-ranking/components/filter/StreamRankingFilterGallery'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'
import {
  StreamRankingDimension,
  StreamRankingSearchParams
} from 'features/stream-ranking/types/stream-ranking.type'
import createGetStreamsParams from 'features/stream-ranking/utils/createGetStreamsParams'
import createGetSupersBundlesParams from 'features/stream-ranking/utils/createGetSupersBundlesParams'
import { StreamRankingPeriod } from 'types/period'

type Props = {
  period: StreamRankingPeriod
  dimension: StreamRankingDimension
  group: GroupString
  searchParams: StreamRankingSearchParams
}

export default async function IndexTemplate({
  period,
  dimension,
  group,
  searchParams
}: PropsWithoutRef<Props>) {
  let count = 0
  switch (dimension) {
    case 'concurrent-viewer':
      count = await getStreamsCount(
        createGetStreamsParams({ period, dimension, group, ...searchParams })
      )
      break
    case 'super-chat':
      count = await getSupersBundlesCount(
        createGetSupersBundlesParams({ period, group, ...searchParams })
      )
      break
    default:
      break
  }

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <StreamRankingFilterGallery className="max-w-6xl mx-auto" />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <StreamRankingGallery
          className="max-w-6xl mx-auto"
          period={period}
          dimension={dimension}
          group={group}
          {...searchParams}
        />
        <ResponsivePagination
          totalPages={StreamRankingPagination.getTotalPages(count)}
        />
      </section>
    </section>
  )
}
