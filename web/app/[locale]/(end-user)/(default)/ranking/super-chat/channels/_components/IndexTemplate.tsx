import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { getGroups } from 'apis/groups'
import { ChannelsRanking } from 'features/channels-ranking/types/channels-ranking.type'
import { formatSnapshotPeriod } from 'features/channels-ranking/utils/formatSnapshotPeriod'
import { getSnapshotSupersRanking } from 'features/channels-ranking/utils/getSnapshotSupersRanking'
import {
  generateMonthlyPeriods,
  MonthlyPeriod
} from 'features/super-chat-ranking-index/utils/generateMonthlyPeriods'
import {
  generateWeeklyPeriods,
  WeeklyPeriod
} from 'features/super-chat-ranking-index/utils/generateWeeklyPeriods'
import ArchiveSection from './ArchiveSection'
import FeaturedSection from './FeaturedSection'
import GroupFilterBar from './GroupFilterBar'

type Props = {
  locale: 'ja' | 'en'
  group?: string
}

async function fetchTop5ForPeriods<
  T extends { period: string; target: string }
>(
  periods: T[],
  periodType: 'weekly' | 'monthly',
  group: string
): Promise<Map<string, ChannelsRanking[]>> {
  const results = await Promise.all(
    periods.map(async p => {
      try {
        const channels = await getSnapshotSupersRanking({
          period: periodType,
          target: p.target,
          group,
          limit: 5
        })
        return { period: p.period, channels }
      } catch {
        return { period: p.period, channels: [] }
      }
    })
  )
  return new Map(results.map(r => [r.period, r.channels]))
}

function buildWeeklyItems(
  periods: WeeklyPeriod[],
  channelsMap: Map<string, ChannelsRanking[]>,
  group: string,
  locale: 'ja' | 'en'
) {
  return periods.map(p => ({
    id: p.period,
    title: formatSnapshotPeriod(p.period, locale) || p.period,
    href: `/ranking/super-chat/channels/${group}/${p.period}`,
    channels: channelsMap.get(p.period) || []
  }))
}

function buildMonthlyItems(
  periods: MonthlyPeriod[],
  channelsMap: Map<string, ChannelsRanking[]>,
  group: string,
  locale: 'ja' | 'en'
) {
  return periods.map(p => ({
    id: p.period,
    title: formatSnapshotPeriod(p.period, locale) || p.period,
    href: `/ranking/super-chat/channels/${group}/${p.period}`,
    channels: channelsMap.get(p.period) || []
  }))
}

async function ArchiveSections({
  locale,
  group
}: {
  locale: 'ja' | 'en'
  group: string
}) {
  const t = await getTranslations('Page.ranking.superChatIndex')

  const weeklyPeriods = generateWeeklyPeriods()
  const monthlyPeriods = generateMonthlyPeriods()

  const [weeklyChannelsMap, monthlyChannelsMap] = await Promise.all([
    fetchTop5ForPeriods(weeklyPeriods, 'weekly', group),
    fetchTop5ForPeriods(monthlyPeriods, 'monthly', group)
  ])

  const weeklyItems = buildWeeklyItems(
    weeklyPeriods,
    weeklyChannelsMap,
    group,
    locale
  )
  const monthlyItems = buildMonthlyItems(
    monthlyPeriods,
    monthlyChannelsMap,
    group,
    locale
  )

  return (
    <>
      <ArchiveSection
        title={t('section.weeklyArchive.title')}
        items={weeklyItems}
        showMoreLabel={t('showMore')}
      />
      <ArchiveSection
        title={t('section.monthlyArchive.title')}
        items={monthlyItems}
        showMoreLabel={t('showMore')}
      />
    </>
  )
}

function ArchiveSectionsSkeleton() {
  return (
    <>
      <section className="mb-12">
        <div className="h-7 w-48 bg-muted rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-muted rounded-lg animate-pulse"
            />
          ))}
        </div>
      </section>
      <section className="mb-12">
        <div className="h-7 w-48 bg-muted rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-muted rounded-lg animate-pulse"
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default async function IndexTemplate({ locale, group }: Props) {
  const t = await getTranslations('Page.ranking.superChatIndex')
  const groups = await getGroups()
  const effectiveGroup = group || 'all'

  const featuredItems = [
    {
      id: 'last24Hours',
      title: t('period.last24Hours'),
      href: `/ranking/super-chat/channels/${effectiveGroup}/last24Hours`,
      icon: 'clock' as const
    },
    {
      id: 'last30Days',
      title: t('period.last30Days'),
      href: `/ranking/super-chat/channels/${effectiveGroup}/last30Days`,
      icon: 'calendar' as const
    },
    {
      id: 'thisYear',
      title: t('period.thisYear'),
      href: `/ranking/super-chat/channels/${effectiveGroup}/thisYear`,
      icon: 'trending' as const
    }
  ]

  return (
    <div className="space-y-6">
      <GroupFilterBar
        groups={groups}
        currentGroup={group}
        allGroupsLabel={t('filter.allGroups')}
      />

      <FeaturedSection title={t('section.featured.title')} items={featuredItems} />

      <Suspense
        key={effectiveGroup}
        fallback={<ArchiveSectionsSkeleton />}
      >
        <ArchiveSections locale={locale} group={effectiveGroup} />
      </Suspense>
    </div>
  )
}
