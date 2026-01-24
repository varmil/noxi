import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import { getGroups } from 'apis/groups'
import GroupFilterBar from 'features/hub-page/components/GroupFilterBar'
import LiveArchiveSection from 'features/hub-page/components/LiveArchiveSection'
import { ArchiveSectionsSkeleton } from 'features/hub-page/components/LivePeriodCardSkeleton'
import FeaturedSection from '../../channels/_components/FeaturedSection'
import { fetchLiveArchiveItems } from '../_actions/fetchLiveArchiveItems'

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
        fetchMore={fetchLiveArchiveItems}
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
        fetchMore={fetchLiveArchiveItems}
      />
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
