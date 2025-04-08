import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import ReadMore from 'app/[locale]/(end-user)/(no-layout)/youtube/live/[videoId]/_components/ui/section/ReadMore'
import StatsAvgConcurrentCard from 'features/youtube-stats/components/simple-card/video/StatsAvgConcurrentCard'
import StatsMembershipAmountCard from 'features/youtube-stats/components/simple-card/video/StatsMembershipAmountCard'
import StatsMembershipCountCard from 'features/youtube-stats/components/simple-card/video/StatsMembershipCountCard'
import StatsPeakConcurrentCard from 'features/youtube-stats/components/simple-card/video/StatsPeakConcurrentCard'
import StatsSuperChatTotalAmountCard from 'features/youtube-stats/components/simple-card/video/StatsSuperChatTotalAmountCard'

export default function VideoStatsSection({
  stream
}: {
  stream: StreamSchema
}) {
  return (
    // navbar が h-14 + p-6 相当 = 20
    <section className="flex flex-col gap-2 lg:sticky lg:top-20">
      <Sections stream={stream} />
    </section>
  )
}

function Sections({ stream }: { stream: StreamSchema }) {
  const {
    videoId,
    metrics: { peakConcurrentViewers, avgConcurrentViewers }
  } = stream

  return (
    <>
      <StatsSuperChatTotalAmountCard
        videoId={videoId}
        className="col-span-full"
      />

      <ReadMore>
        <StatsMembershipAmountCard videoId={videoId} />

        <StatsMembershipCountCard videoId={videoId} />

        <StatsPeakConcurrentCard count={peakConcurrentViewers} />

        {/* ライブ中は常に０で、終了後にバッチで計算するため */}
        {avgConcurrentViewers > 0 ? (
          <StatsAvgConcurrentCard count={avgConcurrentViewers} />
        ) : null}
      </ReadMore>
    </>
  )
}
