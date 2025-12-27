import { Suspense } from 'react'
import { Radio } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getStreams } from 'apis/youtube/getStreams'
import { CACHE_10M } from 'lib/fetchAPI'
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
    <section className={'flex flex-col gap-2 lg:gap-4 h-full'}>
      <Card className="flex-1 justify-center col-span-full gap-2 shadow-xs">
        <CardHeader className="gap-0">
          <CardTitle className="text-sm flex justify-start items-center gap-2 font-medium">
            <Radio className="stroke-red-600 animate-pulse" /> {t('liveCount')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tabular-nums flex-1">
            {liveCount.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 lg:gap-4 w-full flex-1">
        <Card className="flex-1 justify-center gap-2 shadow-xs">
          <CardHeader className="gap-0">
            <CardTitle className="text-sm flex justify-between items-center font-medium">
              {t('totalViewers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">
              {totalViewers.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 justify-center gap-2 shadow-xs">
          <CardHeader className="gap-0">
            <CardTitle className="text-sm flex justify-between items-center font-medium">
              {t('medianViewers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">
              {medianViewers.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default function LiveStatsCards() {
  return (
    <Suspense fallback={<LiveStatsCardsSkeleton />}>
      <LiveStatsCardsContent />
    </Suspense>
  )
}
