import { PropsWithoutRef } from 'react'
import { getStream } from 'apis/youtube/getStream'
import { getViewerCounts } from 'apis/youtube/getViewerCounts'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import ViewerCounts from 'features/stream-stats/chart/ViewerCounts'
import StatsPeakConcurrentCard from 'features/youtube-stats/components/simple-card/video/StatsPeakConcurrentCard'

type Props = { videoId: string }

export async function LiveIdConcurrentViewersTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  return <Content stream={stream} />
}

async function Content({ stream }: { stream: StreamSchema }) {
  const {
    videoId,
    metrics: { peakConcurrentViewers }
  } = stream
  const [viewerCounts] = await Promise.all([getViewerCounts({ videoId })])

  return (
    <section className="flex flex-col gap-8">
      {peakConcurrentViewers ? (
        <StatsPeakConcurrentCard
          className="flex-1 grow"
          count={peakConcurrentViewers}
        />
      ) : null}
      <ViewerCounts stream={stream} viewerCounts={viewerCounts} />
    </section>
  )
}
