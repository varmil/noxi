import { Suspense } from 'react'
import { ArrowRight, Radio } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupersBundles } from 'apis/supers/getSupersBundles'
import { getStreams } from 'apis/youtube/getStreams'
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
      peakConcurrentViewers: { gte: 1 }
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
    <section className="grid grid-cols-2 @2xl:grid-cols-4 gap-2 h-full">
      <Link
        href="/ranking/concurrent-viewer/live/all/realtime"
        className="block group"
        prefetch={false}
      >
        <Card className="h-full justify-center gap-1 shadow-xs transition-all duration-100 ease-in-out group-hover:shadow-md group-hover:border-muted-foreground/20 cursor-pointer">
          <CardHeader className="gap-0 pb-0">
            <CardTitle className="text-sm flex items-center gap-2 font-medium">
              <Radio className="stroke-red-600 animate-pulse" size={16} />
              {t('liveCount')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-2xl font-bold tabular-nums">
              {liveCount.toLocaleString()}
            </div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200 mt-2">
              <span className="line-clamp-1 break-all">{t('viewRanking')}</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-100 group-hover:translate-x-1"
              />
            </span>
          </CardContent>
        </Card>
      </Link>

      <Link
        href="/ranking/super-chat/live/all/realtime"
        className="block group"
        prefetch={false}
      >
        <Card className="h-full justify-center gap-1 shadow-xs transition-all duration-100 ease-in-out group-hover:shadow-md group-hover:border-muted-foreground/20 cursor-pointer">
          <CardHeader className="gap-0 pb-0">
            <CardTitle className="text-sm flex items-center gap-2 font-medium">
              <Radio className="stroke-red-600 animate-pulse" size={16} />
              <span className="line-clamp-1 break-all">
                {t('totalSuperChat')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-2xl font-bold tabular-nums">
              <span className="text-lg mr-1">¥</span>
              {format.number(Math.round(totalSuperChatAmount))}
            </div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200 mt-2">
              <span className="line-clamp-1 break-all">{t('viewRanking')}</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-100 group-hover:translate-x-1"
              />
            </span>
          </CardContent>
        </Card>
      </Link>

      <Card className="justify-center gap-1 shadow-xs">
        <CardHeader className="gap-0 pb-0">
          <CardTitle className="text-sm font-medium line-clamp-1 break-all">
            {t('totalViewers')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <div className="text-2xl font-bold tabular-nums">
            {totalViewers.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card className="justify-center gap-1 shadow-xs">
        <CardHeader className="gap-0 pb-0">
          <CardTitle className="text-sm font-medium line-clamp-1 break-all">
            {t('medianViewers')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <div className="text-2xl font-bold tabular-nums">
            {medianViewers.toLocaleString()}
          </div>
        </CardContent>
      </Card>
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
