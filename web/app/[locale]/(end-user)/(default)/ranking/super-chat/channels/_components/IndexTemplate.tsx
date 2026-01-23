import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { getGroups } from 'apis/groups'
import GroupFilterBar from 'features/super-chat-ranking-index/components/GroupFilterBar'
import { fetchArchiveItems } from '../_actions/fetchArchiveItems'
import ArchiveSection from './ArchiveSection'
import FeaturedSection from './FeaturedSection'

const INITIAL_ITEMS_COUNT = 12

type Props = {
  locale: 'ja' | 'en'
  group?: string
}

async function ArchiveSections({
  locale,
  group
}: {
  locale: 'ja' | 'en'
  group: string
}) {
  const t = await getTranslations('Page.ranking.superChatChannelsIndex')

  // 初期表示分のみ取得（12件ずつ）
  const [weeklyResult, monthlyResult] = await Promise.all([
    fetchArchiveItems('weekly', group, locale, 0, INITIAL_ITEMS_COUNT),
    fetchArchiveItems('monthly', group, locale, 0, INITIAL_ITEMS_COUNT)
  ])

  return (
    <>
      <ArchiveSection
        title={t('section.monthlyArchive.title')}
        type="monthly"
        group={group}
        locale={locale}
        initialItems={monthlyResult.items}
        initialHasMore={monthlyResult.hasMore}
        totalCount={monthlyResult.totalCount}
        showMoreLabel={t('showMore')}
      />
      <ArchiveSection
        title={t('section.weeklyArchive.title')}
        type="weekly"
        group={group}
        locale={locale}
        initialItems={weeklyResult.items}
        initialHasMore={weeklyResult.hasMore}
        totalCount={weeklyResult.totalCount}
        showMoreLabel={t('showMore')}
      />
    </>
  )
}

function PeriodCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex gap-4">
        {/* 左側: タイトルとアバター */}
        <div className="flex-1">
          <div className="mb-6 space-y-1">
            <div className="h-5 w-24 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex -space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="size-10 rounded-full bg-muted animate-pulse ring-2 ring-background"
              />
            ))}
          </div>
        </div>
        {/* 右側: Top5リスト */}
        <div className="w-[clamp(0px,28cqw,240px)] shrink overflow-hidden">
          <div className="h-4 w-10 bg-muted rounded animate-pulse mb-1" />
          <div className="space-y-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-4 w-full bg-muted rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ArchiveSectionSkeleton() {
  return (
    <section className="@container mb-12">
      <div className="h-7 w-56 bg-muted rounded animate-pulse mb-4" />
      <div className="grid grid-cols-1 gap-3 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <PeriodCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

function ArchiveSectionsSkeleton() {
  return (
    <>
      <ArchiveSectionSkeleton />
      <ArchiveSectionSkeleton />
    </>
  )
}

export default async function IndexTemplate({ locale, group }: Props) {
  const t = await getTranslations('Page.ranking.superChatChannelsIndex')
  const groups = await getGroups()
  const effectiveGroup = group || 'all'

  const featuredItems = [
    {
      id: 'last24Hours',
      title: t('period.last24Hours'),
      href: `/ranking/super-chat/channels/${effectiveGroup}/last24Hours`
    },
    {
      id: 'last30Days',
      title: t('period.last30Days'),
      href: `/ranking/super-chat/channels/${effectiveGroup}/last30Days`
    },
    {
      id: 'thisYear',
      title: t('period.thisYear'),
      href: `/ranking/super-chat/channels/${effectiveGroup}/thisYear`
    }
  ]

  return (
    <div className="mt-10 space-y-6">
      <GroupFilterBar
        groups={groups}
        currentGroup={group}
        allGroupsLabel={t('filter.allGroups')}
      />

      <FeaturedSection
        title={t('section.featured.title')}
        items={featuredItems}
      />

      <Suspense key={effectiveGroup} fallback={<ArchiveSectionsSkeleton />}>
        <ArchiveSections locale={locale} group={effectiveGroup} />
      </Suspense>
    </div>
  )
}
