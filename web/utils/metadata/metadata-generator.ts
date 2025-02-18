import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GroupString } from 'config/constants/Site'
import { Gender } from 'types/gender'
import { ChannelsRankingPeriod, StreamRankingPeriod } from 'types/period'

type Args = {
  locale: string
  pageNamespace: 'Page.youtube.channels.ranking' | 'Page.youtube.live.ranking'
  featNamespace:
    | 'Features.channelsRanking.ranking.dimension'
    | 'Features.streamRanking.ranking.dimension'
  period: ChannelsRankingPeriod | StreamRankingPeriod
  dimension: 'super-chat' | 'subscriber' | 'concurrent-viewer'
  group?: GroupString
  gender?: Gender
}

export const generateTitleAndDescription = async ({
  locale,
  pageNamespace,
  featNamespace,
  period,
  dimension,
  group,
  gender
}: Args): Promise<Pick<Metadata, 'title' | 'description'>> => {
  const global = await getTranslations({ locale, namespace: 'Global' })
  const page = await getTranslations({ locale, namespace: pageNamespace })
  const feat = await getTranslations({ locale, namespace: featNamespace })

  // 「ホロライブ」や「にじさんじ」 などグループ名が指定されている場合は、「VTuber」
  //  を省略してシンプルなタイトルにする方がSEOとユーザー体験の観点から最適
  const titlePrefix = group ? '' : page('metadata.title')

  return {
    title: `${titlePrefix} ${feat(dimension, {
      period: global(`period.${period}`),
      group: group ? global(`group.${group}`) : '',
      gender: gender ? global(`gender.${gender}`) : ''
    })
      .replace(/\s+/g, ' ')
      .trim()} - ${global('title')}`,

    description: `${page('metadata.description')}`
  }
}
