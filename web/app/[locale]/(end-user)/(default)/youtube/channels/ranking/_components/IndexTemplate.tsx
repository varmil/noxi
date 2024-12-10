import { PropsWithoutRef } from 'react'
import { PageSMPX } from 'components/page'
import ChannelsRankingFilterGallery from 'features/channels-ranking/components/filter/ChannelsRankingFilterGallery'
import ChannelsRankingGallery from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import { ChannelsRankingSearchParams } from 'features/channels-ranking/types/channels-ranking.type'

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
    </section>
  )
}
