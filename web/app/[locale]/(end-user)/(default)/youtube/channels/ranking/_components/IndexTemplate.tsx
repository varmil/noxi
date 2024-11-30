import { PropsWithoutRef } from 'react'
import { YoutubeChannelsRankingSearchParams } from 'app/[locale]/(end-user)/(default)/youtube/channels/ranking/page'
import { PageSMPX } from 'components/page'
import ChannelsRankingFilterGallery from 'features/channels-ranking/components/filter/ChannelsRankingFilterGallery'
import ChannelsRankingGallery from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'

type Props = {} & YoutubeChannelsRankingSearchParams

export default function IndexTemplate({
  searchParams
}: PropsWithoutRef<Props>) {
  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <ChannelsRankingFilterGallery className="max-w-6xl mx-auto" />
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
