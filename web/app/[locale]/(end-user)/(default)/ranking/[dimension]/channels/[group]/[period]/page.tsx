import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { Page } from 'components/page'
import RankHighlighter from 'components/ranking/highlighter/RankHighlighter'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
import { getPeriodDisplayName } from 'features/channels-ranking/utils/formatSnapshotPeriod'
import {
  isSnapshotPeriod,
  parseSnapshotPeriod
} from 'features/channels-ranking/utils/gallery-params'
import dayjs from 'lib/dayjs'
import { ChannelsRankingPeriod } from 'types/period'
import { buildUIBreadcrumbItems } from 'utils/json-ld/buildRankingJsonLd'
import { getAlternates } from 'utils/metadata/getAlternates'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { getOgUrl } from 'utils/og-url'
import { ChannelsRankingJsonLd } from './_components/ChannelsRankingJsonLd'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: string
    period: ChannelsRankingPeriod
    dimension: ChannelsRankingDimension
    group: string
  }>
  searchParams: Promise<ChannelsRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, dimension, group: groupId, period } = await props.params
  const { gender, date, page } = await props.searchParams
  const groupName = await getGroupName(groupId, {
    errorContext: 'channels ranking page (metadata)'
  })

  // OGPを出力する条件：
  // - last24Hours: daily-ranking OGを出力
  // - weekly-xxx, monthly-xxx: X用OGを出力
  // - それ以外（last7Days, last30Days, thisYear等）: OGを出力しない
  const shouldShowOg = period === 'last24Hours' || isSnapshotPeriod(period)

  return {
    ...(await generateTitleAndDescription({
      locale: locale as 'ja' | 'en',
      pageNamespace: 'Page.ranking.channels',
      featNamespace: 'Features.channelsRanking.ranking.dimension',
      period,
      dimension,
      groupName,
      gender,
      page
    })),
    ...(shouldShowOg && {
      openGraph: {
        images: [
          {
            url: getOgUrl(
              isSnapshotPeriod(period)
                ? `/${parseSnapshotPeriod(period).period}-ranking?${new URLSearchParams(
                    {
                      [parseSnapshotPeriod(period).period === 'weekly'
                        ? 'week'
                        : 'month']: parseSnapshotPeriod(period).target,
                      group: groupId,
                      ...(gender && { gender })
                    }
                  ).toString()}`
                : `/daily-ranking?${new URLSearchParams({
                    group: groupId,
                    ...(gender && { gender }),
                    ...(date &&
                      dayjs(date).isValid() && {
                        date: dayjs(date).toISOString()
                      })
                  }).toString()}`
            )
          }
        ]
      }
    }),
    /** 2025/05/01：period, gender, pageは区別しないcanonicalにしてみる */
    alternates: getAlternates({
      pathname: `/ranking/${dimension}/channels/${groupId}/${dimension === 'subscriber' ? 'wholePeriod' : 'last30Days'}`,
      locale
    })
  }
}

/** dimension ごとの canonical period を取得 */
function getCanonicalPeriod(dimension: ChannelsRankingDimension): string {
  return dimension === 'subscriber' ? 'wholePeriod' : 'last30Days'
}

/** dimension の表示名を取得 */
async function getDimensionDisplayName(
  dimension: ChannelsRankingDimension,
  locale: 'ja' | 'en'
): Promise<string> {
  const t = await getTranslations({ locale, namespace: 'Breadcrumb' })
  if (dimension === 'super-chat') {
    return t('superChatRanking')
  }
  return t('subscriberRanking')
}

export default async function RankingChannelsPage(props: Props) {
  const { locale, dimension, group: groupId, period } = await props.params
  const searchParams = await props.searchParams
  const localeTyped = locale as 'ja' | 'en'

  // Enable static rendering
  setRequestLocale(localeTyped)

  // パンくず用のデータを取得
  const [global, groupName, dimensionName] = await Promise.all([
    getTranslations({ locale: localeTyped, namespace: 'Global' }),
    getGroupName(groupId, { errorContext: 'channels ranking page (breadcrumb)' }),
    getDimensionDisplayName(dimension, localeTyped)
  ])

  const periodName = getPeriodDisplayName(
    period,
    key => (global as (key: string) => string)(key),
    localeTyped
  )

  const canonicalPeriod = getCanonicalPeriod(dimension)

  // super-chat dimension の場合、ハブページ情報を構築
  let hubPage: { name: string; href: string } | undefined
  if (dimension === 'super-chat') {
    const superChatIndexT = await getTranslations({
      locale: localeTyped,
      namespace: 'Page.ranking.superChatIndex'
    })
    hubPage = {
      name: superChatIndexT('heading'),
      href: '/ranking/super-chat/channels'
    }
  }

  // UI パンくずを構築
  const breadcrumb = buildUIBreadcrumbItems({
    rankingType: 'channels',
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
      <ChannelsRankingJsonLd
        locale={locale}
        dimension={dimension}
        group={groupId}
        period={period}
        searchParams={searchParams}
      />
      <Page noPadding fullWidth breadcrumb={breadcrumb}>
        <RankHighlighter>
          <IndexTemplate
            period={period}
            dimension={dimension}
            group={groupId}
            searchParams={searchParams}
          />
        </RankHighlighter>
      </Page>
    </>
  )
}
