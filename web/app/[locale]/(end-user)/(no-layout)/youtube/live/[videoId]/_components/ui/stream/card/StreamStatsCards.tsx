import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { calcChatRate } from 'features/stream-stats/utils/calcChatRate'
import StatsChatRateCard from 'features/youtube-stats/components/simple-card/StatsChatRateCard'
import StatsPeakConcurrentCard from 'features/youtube-stats/components/simple-card/StatsPeakConcurrentCard'

export default function StreamStatsCards({ stream }: { stream: StreamSchema }) {
  const {
    metrics: { peakConcurrentViewers },
    status
  } = stream

  if (status === 'scheduled') return null

  return (
    <div className="flex gap-2">
      {peakConcurrentViewers ? (
        <div className="flex-1">
          <StatsPeakConcurrentCard count={peakConcurrentViewers} />
        </div>
      ) : null}
      {stream.metrics.chatMessages ? (
        <div className="flex-1">
          <StatsChatRateCard count={calcChatRate(stream)} />
        </div>
      ) : null}
    </div>
  )
}
