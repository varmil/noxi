import { PropsWithoutRef } from 'react'
import { getStreamsCount } from 'apis/youtube/getStreams'
import { getSupersBundlesCount } from 'apis/youtube/getSupersBundles'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { StreamRankingPagination } from 'config/constants/Pagination'
import StreamRankingFilterGallery from 'features/stream-ranking/components/filter/StreamRankingFilterGallery'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'
import { StreamRankingSearchParams } from 'features/stream-ranking/types/stream-ranking.type'
import createGetStreamsParams from 'features/stream-ranking/utils/createGetStreamsParams'
import createGetSupersBundlesParams from 'features/stream-ranking/utils/createGetSupersBundlesParams'

type Props = {
  searchParams: StreamRankingSearchParams
}

export default async function IndexTemplate({
  searchParams
}: PropsWithoutRef<Props>) {
  const { dimension } = searchParams

  let count = 0
  switch (dimension) {
    case 'concurrent-viewer':
      count = await getStreamsCount(createGetStreamsParams(searchParams))
      break
    case 'super-chat':
      count = await getSupersBundlesCount(
        createGetSupersBundlesParams(searchParams)
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
        <StreamRankingGallery className="max-w-6xl mx-auto" {...searchParams} />
        <ResponsivePagination
          totalPages={StreamRankingPagination.getTotalPages(count)}
        />
      </section>
    </section>
  )
}
