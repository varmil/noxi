import { ChevronRight } from 'lucide-react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { getChannelsCount } from 'apis/youtube/getChannels'
import { getChannelsVideoCountSum } from 'apis/youtube/getChannelsVideoCountSum'
import { getStreamsCount } from 'apis/youtube/getStreams'
import { Link } from 'lib/navigation'

type StatItem =
  | {
      key: string
      label: string
      value: string
      href: string
      linked: true
    }
  | {
      key: string
      label: string
      value: string
      linked: false
    }

export async function DataAnalysisStatus() {
  const t = await getTranslations('Components.dataAnalysisStatus')
  const format = await getFormatter()

  const [channels, videos, lives] = await Promise.all([
    getChannelsCount({}),
    getChannelsVideoCountSum(),
    getStreamsCount({})
  ])

  const items: StatItem[] = [
    {
      key: 'channels',
      label: t('channels'),
      value: format.number(channels),
      href: '/ranking/subscriber/channels/all/wholePeriod',
      linked: true
    },
    {
      key: 'videos',
      label: t('videos'),
      value: format.number(videos),
      linked: false
    },
    {
      key: 'lives',
      label: t('lives'),
      value: format.number(lives),
      href: '/ranking/concurrent-viewer/live/all/last7Days',
      linked: true
    },
    {
      key: 'promotions',
      label: t('promotions'),
      value: t('comingSoon'),
      linked: false
    }
  ]

  return (
    <section aria-label={t('sectionTitle')}>
      <div className="mx-auto max-w-[1200px] pt-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t('sectionTitle')}
        </p>

        <div className="overflow-hidden rounded-xl bg-border p-[1px]">
          <div className="grid grid-cols-2 gap-[1px] md:grid-cols-4">
            {items.map(item =>
              item.linked ? (
                <Link
                  key={item.key}
                  href={item.href}
                  className="group flex items-center justify-between gap-3 bg-card px-4 sm:px-6 py-3 sm:py-5 transition-colors hover:bg-muted/50"
                  prefetch={false}
                >
                  <StatContent label={item.label} value={item.value} />
                  <ChevronRight
                    className="size-4 shrink-0 text-amber-700 dark:text-amber-500 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              ) : (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-3 bg-card px-4 sm:px-6 py-3 sm:py-5"
                >
                  <StatContent label={item.label} value={item.value} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatContent({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <span className="block text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-500">
        {label}
      </span>
      <span className="mt-1 block truncate text-base sm:text-xl font-bold leading-tight tracking-tight tabular-nums font-mono">
        {value}
      </span>
    </div>
  )
}
