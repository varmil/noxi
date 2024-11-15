import { PropsWithoutRef } from 'react'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'
import SupersRankingHero from 'features/supers-ranking/components/hero/SupersRankingHero'

type Props = {}

export default function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <section className="flex flex-col gap-y-10 max-w-6xl mx-auto">
      <SupersRankingHero />
      <StreamRankingGallery />
    </section>
  )
}