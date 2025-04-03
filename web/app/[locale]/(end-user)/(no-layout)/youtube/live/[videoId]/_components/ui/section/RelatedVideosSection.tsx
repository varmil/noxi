import { Suspense } from 'react'
import RelatedVideosSkeleton from 'components/skeleton/RelatedVideosSkeleton'
import MaximizeButton from '../../ui/button/MaximizeButton'
import OpenChatButton from '../../ui/button/OpenChatButton'
import RelatedVideos from '../related-videos/RelatedVideos'

/**
 * LG 以上で表示
 */
export default function RelatedVideosSection({
  channelId
}: {
  channelId: string
}) {
  return (
    <div className="hidden @4xl:pt-2 @4xl:flex @4xl:flex-col @4xl:gap-y-4 @4xl:col-span-2">
      <div className="flex items-center gap-x-2">
        <OpenChatButton className="flex-1" />
        <MaximizeButton />
      </div>
      <Suspense fallback={<RelatedVideosSkeleton />}>
        <RelatedVideos type="live" channelId={channelId} />
      </Suspense>
    </div>
  )
}
