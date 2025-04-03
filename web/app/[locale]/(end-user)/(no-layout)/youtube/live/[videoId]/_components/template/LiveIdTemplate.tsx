import { PropsWithoutRef } from 'react'
import { getChatCounts } from 'apis/youtube/getChatCounts'
import { getStream } from 'apis/youtube/getStream'
import { getViewerCounts } from 'apis/youtube/getViewerCounts'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import ChatCounts from 'features/stream-stats/chart/ChatCounts'
import ViewerCounts from 'features/stream-stats/chart/ViewerCounts'
import StatsPeakConcurrentCard from 'features/youtube-stats/components/simple-card/StatsPeakConcurrentCard'
import GradeDisplay from '../ui/grade/GradeDisplay'
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
    metrics: { peakConcurrentViewers }
  } = stream
  const [chatCounts, viewerCounts] = await Promise.all([
    getChatCounts({ videoId }),
    getViewerCounts({ videoId })
  ])

  return (
    <section className={`${className ?? ''}`}>
      <div className="lg:hidden">
        <GradeDisplay />
      </div>

      <StreamBasicInfo stream={stream} />
      {peakConcurrentViewers ? (
        <StatsPeakConcurrentCard
          className="flex-1 grow"
          count={peakConcurrentViewers}
        />
      ) : null}
      <ViewerCounts stream={stream} viewerCounts={viewerCounts} />
      <ChatCounts stream={stream} chatCounts={chatCounts} />
    </section>
  )
}
