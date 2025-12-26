import { Suspense } from 'react'
import { Radio } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getStreams } from 'apis/youtube/getStreams'
import { CACHE_10M } from 'lib/fetchAPI'
import {
  StatsCard,
  StatsCardContent,
  StatsCardHeader,
  StatsCards
} from 'components/styles/card/StatsCard'
import { LiveStatsCardsSkeleton } from './LiveStatsCardsSkeleton'

function calculateMedian(numbers: number[]): number {
  if (numbers.length === 0) return 0
  const sorted = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 0) {
    return Math.floor((sorted[mid - 1] + sorted[mid]) / 2)
  }
  return sorted[mid]
}

async function LiveStatsCardsContent() {
  const t = await getTranslations('Page.index.section.liveStats')
  const streams = await getStreams({
    status: 'live',
    peakConcurrentViewers: { gte: 1 },
    revalidate: CACHE_10M
  })

  const liveCount = streams.length
  const totalViewers = streams.reduce(
    (sum, stream) => sum + stream.metrics.peakConcurrentViewers,
    0
  )
  const medianViewers = calculateMedian(
    streams.map(stream => stream.metrics.peakConcurrentViewers)
  )

  return (
    <StatsCards className={'grid-cols-2 sm:grid-cols-3'}>
      <StatsCard className="col-span-full sm:col-span-1 bg-white dark:bg-gray-900 shadow-xs">
        <StatsCardHeader className="justify-start gap-2">
          <Radio className="stroke-red-600 animate-pulse" /> {t('liveCount')}
        </StatsCardHeader>
        <StatsCardContent>{liveCount.toLocaleString()}</StatsCardContent>
      </StatsCard>

      <StatsCard className="col-span-1 bg-white dark:bg-gray-900 shadow-xs">
        <StatsCardHeader>{t('totalViewers')}</StatsCardHeader>
        <StatsCardContent>{totalViewers.toLocaleString()}</StatsCardContent>
      </StatsCard>

      <StatsCard className="col-span-1 bg-white dark:bg-gray-900 shadow-xs">
        <StatsCardHeader>{t('medianViewers')}</StatsCardHeader>
        <StatsCardContent>{medianViewers.toLocaleString()}</StatsCardContent>
      </StatsCard>
    </StatsCards>
  )
}

export default function LiveStatsCards() {
  return (
    <Suspense fallback={<LiveStatsCardsSkeleton />}>
      <LiveStatsCardsContent />
    </Suspense>
  )
}
