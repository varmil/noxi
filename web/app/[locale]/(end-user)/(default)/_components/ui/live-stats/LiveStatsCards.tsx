import { Suspense } from 'react'
import { ArrowRight, Radio } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupersBundles } from 'apis/supers/getSupersBundles'
import { getStreams } from 'apis/youtube/getStreams'
import { CACHE_10M } from 'lib/fetchAPI'
import { Link } from 'lib/navigation'
import { convertMicrosToAmount } from 'utils/amount'
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
  const format = await getFormatter()

  const [streams, supersBundles] = await Promise.all([
    getStreams({
      status: 'live',
      peakConcurrentViewers: { gte: 1 },
      revalidate: CACHE_10M
    }),
    getSupersBundles({
      actualEndTimeGTE: null
    })
  ])

  const liveCount = streams.length
  const totalViewers = streams.reduce(
    (sum, stream) => sum + stream.metrics.peakConcurrentViewers,
    0
  )
  const medianViewers = calculateMedian(
    streams.map(stream => stream.metrics.peakConcurrentViewers)
  )

  const totalSuperChatAmount = supersBundles.reduce(
    (sum, bundle) =>
      sum + convertMicrosToAmount(bundle.amountMicros).toNumber(),
    0
  )

  return (
    <section
      className={'grid grid-cols-1 @xl:grid-cols-2 gap-2 @xl:gap-4 h-full'}
    >
      <Link
        href="/ranking/concurrent-viewer/live/all/realtime"
        className="block group"
        prefetch={false}
      >
        <Card className="h-full justify-center gap-2 shadow-xs transition-all duration-100 ease-in-out group-hover:shadow-md group-hover:border-muted-foreground/20 cursor-pointer">
          <CardHeader className="gap-0">
            <CardTitle className="text-sm flex justify-between items-center font-medium">
              <span className="flex items-center gap-2">
                <Radio className="stroke-red-600 animate-pulse" size={16} />
                {t('liveCount')}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {t('viewRanking')}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-100 group-hover:translate-x-1"
                />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">
              {liveCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </Link>

      <Card className="justify-center gap-2 shadow-xs">
        <CardHeader className="gap-0">
          <CardTitle className="text-sm flex justify-between items-center font-medium">
            <span className="flex items-center gap-2">
              <Radio className="stroke-red-600 animate-pulse" size={16} />
              {t('totalSuperChat')}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tabular-nums">
            {format.number(Math.round(totalSuperChatAmount), {
              style: 'currency',
              currency: 'JPY'
            })}
          </div>
        </CardContent>
      </Card>

      <div className="col-span-full flex lg:flex-row gap-2 @xl:gap-4">
        <Card className="flex-1 justify-center gap-2 shadow-xs">
          <CardHeader className="gap-0">
            <CardTitle className="text-sm flex justify-between items-center font-medium line-clamp-1 break-all">
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
            <CardTitle className="text-sm flex justify-between items-center font-medium line-clamp-1 break-all">
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
