import { PropsWithoutRef } from 'react'
import StreamRankingGallery from 'features/stream-ranking/components/StreamRankingGallery'

type Props = {}

export default function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <>
      <StreamRankingGallery />
    </>
  )
}
