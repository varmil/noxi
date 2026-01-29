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
  /** groupId（all の場合にタイトル・description の特別処理に使用） */
  groupId?: string
  gender?: Gender
  page?: string
}

type GetDescriptionArgs = {
  pageT: Awaited<ReturnType<typeof getTranslations>>
  dimension: Dimension
  period: Args['period']
  periodDisplayName: string
  group: string
  groupId?: string
  gender: string
}

const getDescription = ({
  pageT,
  dimension,
  period,
  periodDisplayName,
  group,
  groupId,
  gender
}: GetDescriptionArgs): string => {
  // concurrent-viewer は期間別ディスクリプションを使用
  if (dimension === 'concurrent-viewer') {
    // 期間別キーを決定（スナップショット期間は weekly/monthly キーを使用）
    let descriptionKey: string = period
    if (isSnapshotPeriod(period)) {
      descriptionKey = period.startsWith('weekly-') ? 'weekly' : 'monthly'
    }

    return (pageT as any)(
      `metadata.description.dimension.concurrent-viewer.${descriptionKey}`,
      { period: periodDisplayName, group, gender }
    )
      .replace(/\s+/g, ' ')
      .trim()
  }

  // super-chat && groupId === 'all' の場合は専用キーを使用
  if (dimension === 'super-chat' && groupId === 'all') {
    return (pageT as any)(`metadata.description.dimension.super-chat-all`, {
      period: periodDisplayName,
      gender
    })
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
  groupName,
  groupId,
  gender,
  page
}: Args): Promise<Pick<Metadata, 'title' | 'description'>> => {
  // super-chat && groupId === 'all' の場合、タイトル用の group は空文字にする
  const group =
    dimension === 'super-chat' && groupId === 'all' ? '' : groupName
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

  return {
    title: `${feat(dimension, {
      period: periodDisplayName,
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
      groupId,
      gender: gender ? global(`gender.${gender}`) : ''
    })}${pageNumber}`
  }
}
