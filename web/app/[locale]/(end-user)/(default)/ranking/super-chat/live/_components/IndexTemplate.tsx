import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { getGroups } from 'apis/groups'
import GroupFilterBar from 'features/super-chat-ranking-index/components/GroupFilterBar'
import FeaturedSection from '../../channels/_components/FeaturedSection'
import { fetchLiveArchiveItems } from '../_actions/fetchLiveArchiveItems'
import LiveArchiveSection from './LiveArchiveSection'

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
  const t = await getTranslations('Page.ranking.superChatLiveIndex')

  // 初期表示分のみ取得（12件ずつ）
  const [weeklyResult, monthlyResult] = await Promise.all([
    fetchLiveArchiveItems('weekly', group, locale, 0, INITIAL_ITEMS_COUNT),
    fetchLiveArchiveItems('monthly', group, locale, 0, INITIAL_ITEMS_COUNT)
  ])

  return (
    <>
      <LiveArchiveSection
        title={t('section.monthlyArchive.title')}
        type="monthly"
        group={group}
        locale={locale}
        initialItems={monthlyResult.items}
        initialHasMore={monthlyResult.hasMore}
        totalCount={monthlyResult.totalCount}
        showMoreLabel={t('showMore')}
      />
      <LiveArchiveSection
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

function StreamItemSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        {/* 順位バッジ */}
        <div className="absolute -left-1 -top-1 z-10 h-5 w-5 rounded-full bg-muted animate-pulse" />
        {/* サムネイル */}
        <div className="aspect-video rounded-md bg-muted animate-pulse" />
      </div>
      {/* タイトル */}
      <div className="h-4 w-full bg-muted rounded animate-pulse" />
    </div>
  )
}

function LivePeriodCardSkeleton() {
  return (
    <div
      className="rounded-xl border bg-card p-6"
      data-testid="live-period-card-skeleton"
    >
      <div className="flex flex-col gap-3">
        {/* ヘッダー: タイトル + サブタイトル */}
        <div className="h-5 w-40 bg-muted rounded animate-pulse" />

        <div className="flex flex-col gap-2">
          {/* 上段: Top1, Top2 (50%ずつ) */}
          <div className="grid grid-cols-2 gap-1.5">
            <StreamItemSkeleton />
            <StreamItemSkeleton />
          </div>

          {/* 下段: Top3, Top4, Top5 (33%ずつ) */}
          <div className="grid grid-cols-3 gap-1.5">
            <StreamItemSkeleton />
            <StreamItemSkeleton />
            <StreamItemSkeleton />
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
          <LivePeriodCardSkeleton key={i} />
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
  const t = await getTranslations('Page.ranking.superChatLiveIndex')
  const groups = await getGroups()
  const effectiveGroup = group || 'all'

  const featuredItems = [
    {
      id: 'last24Hours',
      title: t('period.last24Hours'),
      href: `/ranking/super-chat/live/${effectiveGroup}/last24Hours`
    },
    {
      id: 'last30Days',
      title: t('period.last30Days'),
      href: `/ranking/super-chat/live/${effectiveGroup}/last30Days`
    },
    {
      id: 'thisYear',
      title: t('period.thisYear'),
      href: `/ranking/super-chat/live/${effectiveGroup}/thisYear`
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
