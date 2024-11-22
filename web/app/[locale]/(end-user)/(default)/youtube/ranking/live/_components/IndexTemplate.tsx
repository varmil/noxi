import { PropsWithoutRef } from 'react'
import { PageSMPX } from 'components/page'
import StreamRankingFilterGallery from 'features/stream-ranking/components/filter/StreamRankingFilterGallery'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'
import { YoutubeRankingLiveSearchParams } from '../page'

type Props = {} & YoutubeRankingLiveSearchParams

export default function IndexTemplate({
  searchParams
}: PropsWithoutRef<Props>) {
  return (
    <section className={`mt-4 space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <StreamRankingFilterGallery className="max-w-6xl mx-auto" />
      </section>

      <section className={`${PageSMPX}`}>
        <StreamRankingGallery className="max-w-6xl mx-auto" {...searchParams} />
      </section>
    </section>
  )
}
