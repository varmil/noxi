import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { getStreams } from 'apis/youtube/getStreams'
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
  const streams = await getStreams({ status: 'live', revalidate: 60 })

  const liveCount = streams.length
  const totalViewers = streams.reduce(
    (sum, stream) => sum + stream.metrics.peakConcurrentViewers,
    0
  )
  const medianViewers = calculateMedian(
    streams.map(stream => stream.metrics.peakConcurrentViewers)
  )

  return (
    <StatsCards className="grid-cols-3 lg:grid-cols-3">
      <StatsCard>
        <StatsCardHeader>{t('liveCount')}</StatsCardHeader>
        <StatsCardContent>{liveCount.toLocaleString()}</StatsCardContent>
      </StatsCard>

      <StatsCard>
        <StatsCardHeader>{t('totalViewers')}</StatsCardHeader>
        <StatsCardContent>{totalViewers.toLocaleString()}</StatsCardContent>
      </StatsCard>

      <StatsCard>
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
