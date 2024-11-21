import { PropsWithoutRef } from 'react'
import StreamRankingGallery from 'features/stream-ranking/components/gallery/StreamRankingGallery'

type Props = {}

export default function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <section className="max-w-6xl sm:px-6 mx-auto mt-8">
      <StreamRankingGallery />
    </section>
  )
}
