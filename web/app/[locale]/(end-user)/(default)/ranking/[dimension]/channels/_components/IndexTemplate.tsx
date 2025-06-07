import { PropsWithoutRef } from 'react'
import { getChannelsCount } from 'apis/youtube/getChannels'
import { getSupersSummariesCount } from 'apis/youtube/getSupersSummaries'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { GroupString } from 'config/constants/Group'
import { ChannelsRankingPagination } from 'config/constants/Pagination'
import ChannelsRankingFilterGallery from 'features/channels-ranking/components/filter/ChannelsRankingFilterGallery'
import ChannelsRankingGallery from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
import {
  getChannelsParams,
  getSupersSummariesParams
} from 'features/channels-ranking/utils/gallery-params'

type Props = {
  dimension: ChannelsRankingDimension
  group?: GroupString
  searchParams: ChannelsRankingSearchParams
}

export default async function IndexTemplate({
  dimension,
  searchParams,
  group
}: PropsWithoutRef<Props>) {
  const count =
    dimension === 'super-chat'
      ? await getSupersSummariesCount(getSupersSummariesParams(searchParams))
      : await getChannelsCount(getChannelsParams(searchParams))

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <ChannelsRankingFilterGallery
          className="max-w-6xl mx-auto"
          dimension={dimension}
        />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <ChannelsRankingGallery
          className="max-w-6xl mx-auto"
          dimension={dimension}
          group={group}
          {...searchParams}
        />
        <ResponsivePagination
          totalPages={ChannelsRankingPagination.getTotalPages(count)}
        />
      </section>
    </section>
  )
}
