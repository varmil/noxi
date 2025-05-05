import { PropsWithoutRef } from 'react'
import { getChannelsCount } from 'apis/youtube/getChannels'
import { getSupersSummariesCount } from 'apis/youtube/getSupersSummaries'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { ChannelsRankingPagination } from 'config/constants/Pagination'
import ChannelsRankingFilterGallery from 'features/channels-ranking/components/filter/ChannelsRankingFilterGallery'
import ChannelsRankingGallery from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import { ChannelsRankingSearchParams } from 'features/channels-ranking/types/channels-ranking.type'
import {
  getChannelsParams,
  getSupersSummariesParams
} from 'features/channels-ranking/utils/gallery-params'

type Props = {
  searchParams: ChannelsRankingSearchParams
}

export default async function IndexTemplate({
  searchParams
}: PropsWithoutRef<Props>) {
  const { dimension } = searchParams
  const count =
    dimension === 'super-chat'
      ? await getSupersSummariesCount(getSupersSummariesParams(searchParams))
      : await getChannelsCount(getChannelsParams(searchParams))

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <ChannelsRankingFilterGallery
          className="max-w-6xl mx-auto"
          dimension={searchParams.dimension}
        />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <ChannelsRankingGallery
          className="max-w-6xl mx-auto"
          {...searchParams}
        />
        <ResponsivePagination
          totalPages={ChannelsRankingPagination.getTotalPages(count)}
        />
      </section>
    </section>
  )
}
