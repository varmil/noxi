import { Suspense } from 'react'
import { getStatistics } from 'apis/youtube/data-api/getStatistics'
import { getSupersBundle } from 'apis/youtube/getSupersBundle'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import RelatedVideosSkeleton from 'components/skeleton/RelatedVideosSkeleton'
import StatsViewsCard from 'features/youtube-stats/components/simple-card/StatsViewsCard'
import StatsPeakConcurrentCard from 'features/youtube-stats/components/simple-card/video/StatsPeakConcurrentCard'
import StatsSuperChatTotalAmountCard from 'features/youtube-stats/components/simple-card/video/StatsSuperChatTotalAmountCard'
import MaximizeButton from '../button/MaximizeButton'
import OpenChatButton from '../button/OpenChatButton'

/**
 * LG 以上で表示
 */
export default async function VideoStatsSection({
  stream
}: {
  stream: StreamSchema
}) {
  const [bundle, [stats = undefined]] = await Promise.all([
    getSupersBundle(stream.videoId),
    getStatistics({
      videoIds: [stream.videoId]
    })
  ])

  return (
    <div className="hidden @4xl:pt-2 @4xl:flex @4xl:flex-col @4xl:gap-y-4">
      <div className="flex items-center gap-x-2">
        <OpenChatButton className="flex-1" />
        <MaximizeButton />
      </div>
      <Suspense fallback={<RelatedVideosSkeleton />}>
        {stats?.statistics.viewCount ? (
          <StatsViewsCard count={BigInt(stats.statistics.viewCount)} />
        ) : null}
        <StatsSuperChatTotalAmountCard amountMicros={bundle?.amountMicros} />
        <StatsPeakConcurrentCard count={stream.metrics.peakConcurrentViewers} />
      </Suspense>
    </div>
  )
}
