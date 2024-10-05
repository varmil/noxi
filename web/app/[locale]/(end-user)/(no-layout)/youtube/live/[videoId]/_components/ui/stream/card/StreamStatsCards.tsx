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
    <div className="grid grid-cols-2 gap-2">
      <StatsPeakConcurrentCard count={peakConcurrentViewers} />
      <StatsChatRateCard count={calcChatRate(stream)} />
    </div>
  )
}
