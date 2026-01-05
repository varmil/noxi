import { Metadata } from 'next'
import { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { formatSnapshotPeriod } from 'features/channels-ranking/utils/formatSnapshotPeriod'
import { Dimension } from 'types/dimension'
import { Gender } from 'types/gender'
import {
  ChannelsRankingPeriod,
  MostCheeredPeriod,
  StreamRankingPeriod,
  TopFansPeriod
} from 'types/period'

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

  return {
    title: `${feat(dimension, {
      period: periodDisplayName,
      group,
      gender: gender ? global(`gender.${gender}`) : ''
    })
      .replace(/\s+/g, ' ')
      .trim()}${pageNumber}`,

    description: `${pageT(`metadata.description.dimension.${dimension}`, {
      period: periodDisplayName,
      group,
      gender: gender ? global(`gender.${gender}`) : ''
    })
      .replace(/\s+/g, ' ')
      .trim()}`
  }
}
