import { PropsWithoutRef } from 'react'
import { YoutubeChannelsRankingSearchParams } from 'app/[locale]/(end-user)/(default)/youtube/channels/ranking/page'
import { PageSMPX } from 'components/page'
import ChannelsRankingFilterGallery from 'features/channels-ranking/components/filter/ChannelsRankingFilterGallery'
import SupersRankingHero from 'features/channels-ranking/components/hero/SupersRankingHero'

type Props = {} & YoutubeChannelsRankingSearchParams

export default function IndexTemplate({
  searchParams
}: PropsWithoutRef<Props>) {
  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <ChannelsRankingFilterGallery className="max-w-6xl mx-auto" />
      </section>

      <section className="flex flex-col gap-y-10 max-w-6xl mx-auto">
        <SupersRankingHero {...searchParams} />
      </section>
    </section>
  )
}
