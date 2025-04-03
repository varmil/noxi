import { Suspense } from 'react'
import { getMembershipBundle } from 'apis/youtube/getMembershipBundle'
import { getSupersBundle } from 'apis/youtube/getSupersBundle'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import RelatedVideosSkeleton from 'components/skeleton/RelatedVideosSkeleton'
import StatsAvgConcurrentCard from 'features/youtube-stats/components/simple-card/video/StatsAvgConcurrentCard'
import StatsMembershipAmountCard from 'features/youtube-stats/components/simple-card/video/StatsMembershipAmountCard'
import StatsMembershipCountCard from 'features/youtube-stats/components/simple-card/video/StatsMembershipCountCard'
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
  const {
    videoId,
    metrics: { peakConcurrentViewers, avgConcurrentViewers }
  } = stream

  const [supersBundle, membershipBundle] = await Promise.all([
    getSupersBundle(videoId),
    getMembershipBundle(videoId)
  ])

  return (
    <div className="hidden @4xl:pt-2 @4xl:flex @4xl:flex-col @4xl:gap-y-4">
      <div className="flex items-center gap-x-2 pb-4">
        <OpenChatButton className="flex-1" />
        <MaximizeButton />
      </div>
      <Suspense fallback={<RelatedVideosSkeleton />}>
        <StatsSuperChatTotalAmountCard
          amountMicros={supersBundle?.amountMicros}
        />
        <StatsMembershipAmountCard
          amountMicros={membershipBundle?.amountMicros}
        />
        <StatsMembershipCountCard count={membershipBundle?.count ?? 0} />
        <StatsPeakConcurrentCard count={peakConcurrentViewers} />
        <StatsAvgConcurrentCard count={avgConcurrentViewers} />
      </Suspense>
    </div>
  )
}
