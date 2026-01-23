import { getTranslations } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import {
  getSupersSummaries,
  getSupersSummariesCount
} from 'apis/supers/getSupersSummaries'
import {
  getSupersSnapshotRanking,
  getSupersSnapshotRankingCount
} from 'apis/supers-snapshots/getRanking'
import { getChannels, getChannelsCount } from 'apis/youtube/getChannels'
import { ChannelsRankingPagination } from 'config/constants/Pagination'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
import { getPeriodDisplayName } from 'features/channels-ranking/utils/formatSnapshotPeriod'
import {
  getChannelsParams,
  getSupersSnapshotCountParams,
  getSupersSnapshotParams,
  getSupersSummariesParams
} from 'features/channels-ranking/utils/gallery-params'
import { ChannelsRankingPeriod, SnapshotPeriod } from 'types/period'
import {
  buildBreadcrumbList,
  buildSummaryPageItemList,
  ChannelForItemList,
  HubPageInfo
} from 'utils/json-ld/buildRankingJsonLd'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { isSnapshotPeriod } from 'utils/period/snapshot-period'
import { getWebUrl } from 'utils/web-url'

type Props = {
  locale: string
  dimension: ChannelsRankingDimension
  group: string
  period: ChannelsRankingPeriod
  searchParams: ChannelsRankingSearchParams
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
    return t('superChatChannelsRanking')
  }
  return t('subscriberRanking')
}

export async function ChannelsRankingJsonLd({
  locale,
  dimension,
  group,
  period,
  searchParams
}: Props) {
  const baseUrl = getWebUrl()
  const localeTyped = locale as 'ja' | 'en'
  const { gender, page } = searchParams
  const currentPage = Number(page) || 1
  const pageSize = ChannelsRankingPagination.PAGE_SIZE

  // まず groupName を取得（メタデータ生成に必要）
  const groupName = await getGroupName(group, {
    errorContext: 'channels ranking json-ld'
  })

  // 並列でデータ取得
  const [global, metadata, dimensionName, { channels, count }] =
    await Promise.all([
      getTranslations({ locale: localeTyped, namespace: 'Global' }),
      generateTitleAndDescription({
        locale: localeTyped,
        pageNamespace: 'Page.ranking.channels',
        featNamespace: 'Features.channelsRanking.ranking.dimension',
        dimension,
        period,
        groupName,
        gender,
        page
      }),
      getDimensionDisplayName(dimension, localeTyped),
      fetchRankingData({ dimension, period, group, searchParams })
    ])

  // 期間の表示名を取得
  const periodName = getPeriodDisplayName(
    period,
    key => (global as (key: string) => string)(key),
    localeTyped
  )

  // canonical period
  const canonicalPeriod = getCanonicalPeriod(dimension)

  // super-chat dimension の場合、ハブページ情報を構築
  let hubPage: HubPageInfo | undefined
  if (dimension === 'super-chat') {
    const superChatIndexT = await getTranslations({
      locale: localeTyped,
      namespace: 'Page.ranking.superChatChannelsIndex'
    })
    hubPage = {
      name: superChatIndexT('heading'),
      href:
        group !== 'all'
          ? `/ranking/super-chat/channels?group=${group}`
          : '/ranking/super-chat/channels'
    }
  }

  // BreadcrumbList の構築
  const breadcrumbList = buildBreadcrumbList({
    baseUrl,
    locale,
    rankingType: 'channels',
    dimension,
    group,
    period,
    canonicalPeriod,
    dimensionName,
    groupName,
    periodName,
    hubPage
  })

  // ItemList 用にデータを変換
  const channelsForItemList: ChannelForItemList[] = channels.map(channel => ({
    id: channel.basicInfo.id,
    title: channel.basicInfo.title,
    thumbnailUrl:
      channel.basicInfo.thumbnails.high?.url ??
      channel.basicInfo.thumbnails.default?.url,
    group: channel.peakX.group
  }))

  // ItemList の構築（「概要ページと詳細ページ」パターン用）
  const itemList = buildSummaryPageItemList({
    baseUrl,
    locale,
    title: metadata.title as string | undefined,
    description: metadata.description,
    totalCount: count,
    currentPage,
    pageSize,
    channels: channelsForItemList
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  )
}

/** ランキングデータとカウントを取得 */
async function fetchRankingData({
  dimension,
  period,
  group,
  searchParams
}: {
  dimension: ChannelsRankingDimension
  period: ChannelsRankingPeriod
  group: string
  searchParams: ChannelsRankingSearchParams
}): Promise<{
  channels: Awaited<ReturnType<typeof getChannels>>
  count: number
}> {
  const { gender, page } = searchParams

  if (dimension === 'subscriber') {
    const params = getChannelsParams({ period, group, gender, page })
    const [channelsData, countData] = await Promise.all([
      getChannels(params),
      getChannelsCount({ group, gender })
    ])
    return { channels: channelsData, count: countData }
  }

  // super-chat dimension
  let channelIds: string[]
  let count: number

  if (isSnapshotPeriod(period)) {
    const snapshotParams = getSupersSnapshotParams({
      period: period as SnapshotPeriod,
      group,
      gender,
      page
    })
    const countParams = getSupersSnapshotCountParams({
      period: period as SnapshotPeriod,
      group,
      gender
    })
    const [snapshots, snapshotCount] = await Promise.all([
      getSupersSnapshotRanking(snapshotParams),
      getSupersSnapshotRankingCount(countParams)
    ])
    channelIds = snapshots.map(snapshot => snapshot.channelId)
    count = snapshotCount
  } else {
    const summaryParams = getSupersSummariesParams({
      period,
      group,
      gender,
      page
    })
    const [summaries, summaryCount] = await Promise.all([
      getSupersSummaries(summaryParams),
      getSupersSummariesCount(summaryParams)
    ])
    channelIds = summaries.map(summary => summary.channelId)
    count = summaryCount
  }

  // channelIds からチャンネル情報を取得
  if (channelIds.length === 0) {
    return { channels: [], count }
  }

  const channels = await getChannels({ ids: channelIds })
  // channelIds の順序を維持
  const channelMap = new Map(channels.map(c => [c.basicInfo.id, c]))
  const orderedChannels = channelIds
    .map(id => channelMap.get(id))
    .filter((c): c is NonNullable<typeof c> => c !== undefined)

  return { channels: orderedChannels, count }
}
