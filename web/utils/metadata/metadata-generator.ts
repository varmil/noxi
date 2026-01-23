import { Metadata } from 'next'
import { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Dimension } from 'types/dimension'
import { Gender } from 'types/gender'
import {
  ChannelsRankingPeriod,
  MostCheeredPeriod,
  StreamRankingPeriod,
  TopFansPeriod
} from 'types/period'
import {
  formatSnapshotPeriod,
  isSnapshotPeriod
} from 'utils/period/snapshot-period'

type Args = {
  locale: Locale
  pageNamespace:
    | 'Page.ranking.most-cheered'
    | 'Page.ranking.top-fans'
    | 'Page.ranking.channels'
    | 'Page.ranking.live'
  featNamespace:
    | 'Features.mostCheered.dimension'
    | 'Features.topFans.dimension'
    | 'Features.channelsRanking.ranking.dimension'
    | 'Features.streamRanking.ranking.dimension'
  dimension: Dimension
  period:
    | MostCheeredPeriod
    | TopFansPeriod
    | ChannelsRankingPeriod
    | StreamRankingPeriod
  /** It means `group.name` from database */
  groupName: string
  gender?: Gender
  page?: string
}

// 同接ランキング用の期間別ディスクリプション対応
const PERIOD_SPECIFIC_DESCRIPTIONS = [
  'realtime',
  'last24Hours',
  'last7Days',
  'last30Days',
  'thisYear',
  'wholePeriod'
] as const

type GetDescriptionArgs = {
  pageT: Awaited<ReturnType<typeof getTranslations>>
  dimension: Dimension
  period: Args['period']
  periodDisplayName: string
  group: string
  gender: string
}

const getDescription = ({
  pageT,
  dimension,
  period,
  periodDisplayName,
  group,
  gender
}: GetDescriptionArgs): string => {
  // concurrent-viewer かつ期間別ディスクリプションが存在する場合
  if (
    dimension === 'concurrent-viewer' &&
    PERIOD_SPECIFIC_DESCRIPTIONS.includes(
      period as (typeof PERIOD_SPECIFIC_DESCRIPTIONS)[number]
    )
  ) {
     
    return (pageT as any)(
      `metadata.description.dimension.concurrent-viewer.${period}`,
      { group, gender }
    )
      .replace(/\s+/g, ' ')
      .trim()
  }

  // それ以外は従来通り
   
  return (pageT as any)(`metadata.description.dimension.${dimension}`, {
    period: periodDisplayName,
    group,
    gender
  })
    .replace(/\s+/g, ' ')
    .trim()
}

export const generateTitleAndDescription = async ({
  locale,
  pageNamespace,
  featNamespace,
  dimension,
  period,
  groupName: group,
  gender,
  page
}: Args): Promise<Pick<Metadata, 'title' | 'description'>> => {
  const global = await getTranslations({ locale, namespace: 'Global' })
  const pageT = await getTranslations({ locale, namespace: pageNamespace })
  const feat = await getTranslations({ locale, namespace: featNamespace })

  // 2ページ目以降の場合はタイトルにページ番号を含める
  let pageNumber = ''
  if (page) {
    pageNumber = ` - ${global('pagination.page')} ${page}`
  }

  // スナップショット期間のフォーマット
  const periodDisplayName =
    formatSnapshotPeriod(period as ChannelsRankingPeriod, locale) ??
    global(
      `period.${period as Exclude<typeof period, `weekly-${string}` | `monthly-${string}`>}`
    )

  // 同接ランキング用のSEOタイトル対応
  // スナップショット期間（weekly-xxx, monthly-xxx）の場合は適切なキーワードを使用
  const periodKeyword = (() => {
    if (isSnapshotPeriod(period as ChannelsRankingPeriod)) {
      return period.startsWith('weekly-')
        ? global('periodKeyword.last7Days') // 週間
        : global('periodKeyword.last30Days') // 月間
    }
    return global(
      `periodKeyword.${period as Exclude<typeof period, `weekly-${string}` | `monthly-${string}`>}`
    )
  })()
  // リアルタイムの場合は括弧内の期間を省略
  const periodInParens = period === 'realtime' ? '' : ` (${periodDisplayName})`

  return {
    title: `${feat(dimension, {
      period: periodDisplayName,
      periodKeyword,
      periodInParens,
      group,
      gender: gender ? global(`gender.${gender}`) : ''
    })
      .replace(/\s+/g, ' ')
      .trim()}${pageNumber} - ${global('title')}`,

    description: `${getDescription({
      pageT,
      dimension,
      period,
      periodDisplayName,
      group,
      gender: gender ? global(`gender.${gender}`) : ''
    })}${pageNumber}`
  }
}
