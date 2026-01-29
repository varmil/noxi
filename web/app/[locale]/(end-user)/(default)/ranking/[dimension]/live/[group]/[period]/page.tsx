import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { Page } from 'components/page'
import {
  StreamRankingDimension,
  StreamRankingSearchParams
} from 'features/stream-ranking/types/stream-ranking.type'
import { StreamRankingPeriod } from 'types/period'
import { buildUIBreadcrumbItems } from 'utils/json-ld/buildRankingJsonLd'
import { getAlternates } from 'utils/metadata/getAlternates'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { getPeriodDisplayName } from 'utils/period/snapshot-period'
import IndexTemplate from './_components/IndexTemplate'
import { StreamRankingJsonLd } from './_components/StreamRankingJsonLd'

type Props = {
  params: Promise<{
    locale: string
    period: StreamRankingPeriod
    dimension: StreamRankingDimension
    group: string
  }>
  searchParams: Promise<StreamRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, dimension, group: groupId, period } = await props.params
  const { gender, page } = await props.searchParams
  const groupName = await getGroupName(groupId, {
    errorContext: 'live ranking page (metadata)'
  })

  // canonical period を取得
  const canonicalPeriod = getCanonicalPeriod(dimension, period)

  return {
    ...(await generateTitleAndDescription({
      locale: locale as 'ja' | 'en',
      pageNamespace: 'Page.ranking.live',
      featNamespace: 'Features.streamRanking.ranking.dimension',
      period,
      dimension,
      groupName,
      groupId,
      gender,
      page
    })),
    alternates: getAlternates({
      pathname: `/ranking/${dimension}/live/${groupId}/${canonicalPeriod}`,
      locale
    })
  }
}

/** dimension と period から canonical period を取得 */
function getCanonicalPeriod(
  dimension: StreamRankingDimension,
  period: StreamRankingPeriod
): string {
  if (dimension === 'concurrent-viewer') {
    return 'realtime'
  }
  // super-chat の場合: realtime, last24Hours は独立した canonical
  if (period === 'realtime' || period === 'last24Hours') {
    return period
  }
  return 'last30Days'
}

/** dimension の表示名を取得 */
async function getDimensionDisplayName(
  dimension: StreamRankingDimension,
  locale: 'ja' | 'en'
): Promise<string> {
  const t = await getTranslations({ locale, namespace: 'Breadcrumb' })
  if (dimension === 'concurrent-viewer') {
    return t('concurrentViewerRanking')
  }
  return t('superChatLiveRanking')
}

export default async function RankingLivePage(props: Props) {
  const { locale, dimension, group: groupId, period } = await props.params
  const searchParams = await props.searchParams
  const localeTyped = locale as 'ja' | 'en'

  // Enable static rendering
  setRequestLocale(localeTyped)

  // パンくず用のデータを取得
  const [global, groupName, dimensionName] = await Promise.all([
    getTranslations({ locale: localeTyped, namespace: 'Global' }),
    getGroupName(groupId, { errorContext: 'live ranking page (breadcrumb)' }),
    getDimensionDisplayName(dimension, localeTyped)
  ])

  const periodName = getPeriodDisplayName(
    period,
    key => (global as (key: string) => string)(key),
    localeTyped
  )

  const canonicalPeriod = getCanonicalPeriod(dimension, period)

  // ハブページ情報を構築
  let hubPage: { name: string; href: string } | undefined
  if (dimension === 'super-chat') {
    const superChatLiveIndexT = await getTranslations({
      locale: localeTyped,
      namespace: 'Page.ranking.superChatLiveIndex'
    })
    hubPage = {
      name: superChatLiveIndexT('heading'),
      href:
        groupId !== 'all'
          ? `/ranking/super-chat/live?group=${groupId}`
          : '/ranking/super-chat/live'
    }
  } else if (dimension === 'concurrent-viewer') {
    const concurrentViewerLiveIndexT = await getTranslations({
      locale: localeTyped,
      namespace: 'Page.ranking.concurrentViewerLiveIndex'
    })
    hubPage = {
      name: concurrentViewerLiveIndexT('heading'),
      href:
        groupId !== 'all'
          ? `/ranking/concurrent-viewer/live?group=${groupId}`
          : '/ranking/concurrent-viewer/live'
    }
  }

  // UI パンくずを構築
  const breadcrumb = buildUIBreadcrumbItems({
    rankingType: 'live',
    dimension,
    group: groupId,
    period,
    canonicalPeriod,
    dimensionName,
    groupName,
    periodName,
    hubPage
  })

  return (
    <>
      <StreamRankingJsonLd
        locale={locale}
        dimension={dimension}
        group={groupId}
        period={period}
        searchParams={searchParams}
      />
      <Page noPadding fullWidth breadcrumb={breadcrumb}>
        <IndexTemplate
          period={period}
          dimension={dimension}
          group={groupId}
          searchParams={searchParams}
        />
      </Page>
    </>
  )
}
