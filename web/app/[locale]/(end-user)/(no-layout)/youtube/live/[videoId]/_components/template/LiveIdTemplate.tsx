import { PropsWithoutRef, Suspense } from 'react'
import { getStream } from 'apis/youtube/getStream'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import StreamGallerySkeleton from 'components/skeleton/StreamGallerySkeleton'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'
import GradeDisplay from '../ui/grade/GradeDisplay'
import SeeMoreLinkSection from '../ui/section/SeeMoreLinkSection'
import VideoStatsSection from '../ui/section/VideoStatsSection'
import StreamBasicInfo from '../ui/stream/StreamBasicInfo'

type Props = { videoId: string }

export async function LiveIdTemplate({ videoId }: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  return <Overview className="space-y-8" stream={stream} />
}

/** タイトル、投稿者情報 */
async function Overview({
  stream,
  className
}: {
  stream: StreamSchema
  className?: string
}) {
  const {
    videoId,
    snippet: { channelId }
  } = stream

  return (
    <section className={`${className ?? ''}`}>
      <div className="lg:hidden">
        <GradeDisplay videoId={videoId} />
      </div>

      <StreamBasicInfo stream={stream} />
      <div className="lg:hidden">
        <VideoStatsSection stream={stream} />
      </div>

      <div>
        <Suspense fallback={<StreamGallerySkeleton />}>
          <EndedStreamGallery where={{ channelId }} showHeader />
          <SeeMoreLinkSection channelId={channelId} groupId={stream.group} />
        </Suspense>
      </div>
    </section>
  )
}
