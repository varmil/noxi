import { PropsWithoutRef } from 'react'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import StreamRankingFilterGallery from 'features/stream-ranking/components/filter/StreamRankingFilterGallery'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'
import { StreamRankingSearchParams } from 'features/stream-ranking/types/stream-ranking.type'

type Props = {
  searchParams: StreamRankingSearchParams
}

export default function IndexTemplate({
  searchParams
}: PropsWithoutRef<Props>) {
  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <StreamRankingFilterGallery className="max-w-6xl mx-auto" />
      </section>

      <section className={`${PageSMPX}`}>
        <StreamRankingGallery className="max-w-6xl mx-auto" {...searchParams} />
      </section>

      <section className={`${PageSMPX}`}>
        <ResponsivePagination />
      </section>
    </section>
  )
}
