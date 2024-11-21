import { PropsWithoutRef } from 'react'
import { PageSMPX } from 'components/page'
import RankingFilterGallery from 'components/ranking/filter/RankingFilterGallery'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'

type Props = {}

export default function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <section className={`max-w-6xl ${PageSMPX} mx-auto mt-8 space-y-8`}>
      <RankingFilterGallery />
      <StreamRankingGallery />
    </section>
  )
}
