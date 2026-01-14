import { getTranslations } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { getSupersBundles, getSupersBundlesCount } from 'apis/supers/getSupersBundles'
import { getChannels } from 'apis/youtube/getChannels'
import { getStreams, getStreamsCount } from 'apis/youtube/getStreams'
import { ChannelsSchema } from 'apis/youtube/schema/channelSchema'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import { StreamRankingPagination } from 'config/constants/Pagination'
import {
  StreamRankingDimension,
  StreamRankingSearchParams
} from 'features/stream-ranking/types/stream-ranking.type'
import createGetStreamsParams from 'features/stream-ranking/utils/createGetStreamsParams'
import createGetSupersBundlesParams from 'features/stream-ranking/utils/createGetSupersBundlesParams'
import { CACHE_10M } from 'lib/fetchAPI'
import { Gender } from 'types/gender'
import { StreamRankingPeriod } from 'types/period'
import {
  buildBreadcrumbList,
  buildStreamItemList,
  ChannelForAuthor,
  StreamForItemList
} from 'utils/json-ld/buildRankingJsonLd'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { getStartOf } from 'utils/period/ranking'
import { getWebUrl } from 'utils/web-url'

type Props = {
  locale: string
  dimension: StreamRankingDimension
  group: string
  period: StreamRankingPeriod
  searchParams: StreamRankingSearchParams
}

/** dimension ごとの canonical period を取得 */
function getCanonicalPeriod(dimension: StreamRankingDimension): string {
  return dimension === 'concurrent-viewer' ? 'realtime' : 'last30Days'
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
  // super-chat の場合（ライブ別スパチャランキング）
  return t('liveSuperChatRanking')
}

export async function StreamRankingJsonLd({
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
  const pageSize = StreamRankingPagination.PAGE_SIZE

  // まず groupName を取得（メタデータ生成に必要）
  const groupName = await getGroupName(group, {
    errorContext: 'stream ranking json-ld'
  })

  // 並列でデータ取得
  const [global, metadata, dimensionName, { streams, count, channels }] =
    await Promise.all([
      getTranslations({ locale: localeTyped, namespace: 'Global' }),
      generateTitleAndDescription({
        locale: localeTyped,
        pageNamespace: 'Page.ranking.live',
        featNamespace: 'Features.streamRanking.ranking.dimension',
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
  const periodName = global(`period.${period}`)

  // canonical period
  const canonicalPeriod = getCanonicalPeriod(dimension)

  // BreadcrumbList の構築
  const breadcrumbList = buildBreadcrumbList({
    baseUrl,
    locale,
    rankingType: 'live',
    dimension,
    group,
    period,
    canonicalPeriod,
    dimensionName,
    groupName,
    periodName
  })

  // ItemList 用にデータを変換
  const streamsForItemList: StreamForItemList[] = streams.map(stream => ({
    videoId: stream.videoId,
    title: stream.snippet.title,
    thumbnailUrl:
      stream.snippet.thumbnails.high?.url ??
      stream.snippet.thumbnails.medium?.url ??
      stream.snippet.thumbnails.default?.url,
    channelId: stream.snippet.channelId
  }))

  const channelMap = new Map<string, ChannelForAuthor>(
    channels.map(ch => [
      ch.basicInfo.id,
      {
        id: ch.basicInfo.id,
        title: ch.basicInfo.title,
        thumbnailUrl:
          ch.basicInfo.thumbnails.high?.url ??
          ch.basicInfo.thumbnails.default?.url,
        group: ch.peakX.group
      }
    ])
  )

  // ItemList の構築
  const itemList = buildStreamItemList({
    baseUrl,
    locale,
    title: metadata.title as string | undefined,
    description: metadata.description,
    totalCount: count,
    currentPage,
    pageSize,
    streams: streamsForItemList,
    channelMap
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
  dimension: StreamRankingDimension
  period: StreamRankingPeriod
  group: string
  searchParams: StreamRankingSearchParams
}): Promise<{
  streams: StreamsSchema
  count: number
  channels: ChannelsSchema
}> {
  const { gender, page } = searchParams

  if (dimension === 'concurrent-viewer') {
    const params = createGetStreamsParams({ dimension, period, group, gender, page })
    const countParams = createCountParams({ period, group, gender })
    const [streamsData, countData] = await Promise.all([
      getStreams(params),
      getStreamsCount(countParams)
    ])

    // チャンネル情報を取得（VideoObject の author 用）
    const channelIds = [...new Set(streamsData.map(s => s.snippet.channelId))]
    const channelsData =
      channelIds.length > 0 ? await getChannels({ ids: channelIds }) : []

    return { streams: streamsData, count: countData, channels: channelsData }
  }

  // super-chat dimension
  const bundleParams = createGetSupersBundlesParams({ period, group, gender, page })
  const bundleCountParams = createBundleCountParams({ period, group, gender })
  const [bundles, bundleCount] = await Promise.all([
    getSupersBundles(bundleParams),
    getSupersBundlesCount(bundleCountParams)
  ])

  if (bundles.length === 0) {
    return { streams: [], count: bundleCount, channels: [] }
  }

  // bundle からストリーム情報を取得
  const streams = (
    await getStreams({
      videoIds: bundles.map(bundle => bundle.videoId),
      limit: bundles.length,
      revalidate: CACHE_10M
    })
  ).sort((a, b) => {
    const aIndex = bundles.findIndex(bundle => bundle.videoId === a.videoId)
    const bIndex = bundles.findIndex(bundle => bundle.videoId === b.videoId)
    return aIndex - bIndex
  })

  // チャンネル情報を取得（VideoObject の author 用）
  const channelIds = [...new Set(streams.map(s => s.snippet.channelId))]
  const channelsData =
    channelIds.length > 0 ? await getChannels({ ids: channelIds }) : []

  return { streams, count: bundleCount, channels: channelsData }
}

/** concurrent-viewer 用のカウントパラメータを作成 */
function createCountParams({
  period,
  group,
  gender
}: {
  period: StreamRankingPeriod
  group: string
  gender?: Gender
}): Parameters<typeof getStreamsCount>[0] {
  let result: Parameters<typeof getStreamsCount>[0] = {}

  if (period === 'realtime') {
    result = { ...result, status: 'live', revalidate: 600 }
  } else {
    result = {
      ...result,
      status: 'ended',
      endedAfter: getStartOf(period).toDate()
    }
  }

  if (group && group !== 'all') {
    result = { ...result, group }
  }

  if (gender) {
    result = { ...result, gender }
  }

  return result
}

/** super-chat 用のカウントパラメータを作成 */
function createBundleCountParams({
  period,
  group,
  gender
}: {
  period: StreamRankingPeriod
  group: string
  gender?: Gender
}): Parameters<typeof getSupersBundlesCount>[0] {
  let result: Parameters<typeof getSupersBundlesCount>[0] = {}

  if (period === 'realtime') {
    result = { ...result, actualEndTimeGTE: null, actualEndTimeLTE: null }
  } else {
    result = { ...result, createdAtGTE: getStartOf(period).toDate() }
  }

  result = { ...result, amountMicros: { gt: BigInt(1) } }

  if (group && group !== 'all') {
    result = { ...result, group }
  }

  if (gender) {
    result = { ...result, gender }
  }

  return result
}
