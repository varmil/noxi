import { PropsWithoutRef } from 'react'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import ChannelsRankingFilterGallery from 'features/channels-ranking/components/filter/ChannelsRankingFilterGallery'
import ChannelsRankingGallery from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import { ChannelsRankingSearchParams } from 'features/channels-ranking/types/channels-ranking.type'
import { CHANNELS_RANKING_PAGE_SIZE } from 'features/channels-ranking/utils/channels-ranking-pagination'

type Props = {
  searchParams: ChannelsRankingSearchParams
}

export default function IndexTemplate({
  searchParams
}: PropsWithoutRef<Props>) {
  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <ChannelsRankingFilterGallery
          className="max-w-6xl mx-auto"
          dimension={searchParams.dimension}
        />
      </section>

      <section className={`${PageSMPX}`}>
        <ChannelsRankingGallery
          className="max-w-6xl mx-auto"
          {...searchParams}
        />
      </section>

      <section className={`${PageSMPX}`}>
        <ResponsivePagination
          totalPages={Math.ceil(300 / CHANNELS_RANKING_PAGE_SIZE)}
        />
      </section>
    </section>
  )
}
