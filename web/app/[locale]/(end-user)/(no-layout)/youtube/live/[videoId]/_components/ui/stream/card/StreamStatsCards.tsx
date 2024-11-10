import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import StatsPeakConcurrentCard from 'features/youtube-stats/components/simple-card/StatsPeakConcurrentCard'
import StatsSuperChatTotalAmountCard from 'features/youtube-stats/components/simple-card/StatsSuperChatTotalAmountCard'

export default function StreamStatsCards({ stream }: { stream: StreamSchema }) {
  const {
    videoId,
    metrics: { peakConcurrentViewers },
    status
  } = stream

  if (status === 'scheduled') return null

  return (
    <div className="flex gap-2">
      {peakConcurrentViewers ? (
        <StatsPeakConcurrentCard
          className="flex-1 grow"
          count={peakConcurrentViewers}
        />
      ) : null}
      {true ? (
        <StatsSuperChatTotalAmountCard
          videoId={videoId}
          className="flex-1 grow"
        />
      ) : null}
    </div>
  )
}
