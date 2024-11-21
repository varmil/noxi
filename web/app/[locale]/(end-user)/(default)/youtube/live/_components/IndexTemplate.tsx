import { PropsWithoutRef } from 'react'
import { PageSMPX } from 'components/page'
import RankingFilterGallery from 'components/ranking/filter/RankingFilterGallery'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'

type Props = {}

export default function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <section className={`mt-4 space-y-4`}>
      <section className="py-4 sm:p-5 bg-muted">
        <RankingFilterGallery className="max-w-6xl mx-auto" />
      </section>

      <section className={`max-w-6xl mx-auto ${PageSMPX}`}>
        <StreamRankingGallery />
      </section>
    </section>
  )
}
