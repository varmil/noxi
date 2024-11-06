import { PropsWithoutRef } from 'react'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'

type Props = {}

export default function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <section className="max-w-6xl mx-auto">
      <StreamRankingGallery />
    </section>
  )
}
