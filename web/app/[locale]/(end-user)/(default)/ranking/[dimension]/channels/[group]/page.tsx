import { use } from 'react'
import { Metadata } from 'next'
import { Locale, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import RankHighlighter from 'components/ranking/highlighter/RankHighlighter'
import { GroupString } from 'config/constants/Group'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
import dayjs from 'lib/dayjs'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { getOgUrl } from 'utils/og-url'
import { createSearchParams } from 'utils/ranking/channels-ranking'
import { getWebUrl } from 'utils/web-url'
import IndexTemplate from '../_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: Locale
    dimension: ChannelsRankingDimension
    group: GroupString
  }>
  searchParams: Promise<ChannelsRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, dimension, group } = await props.params
  const { period, gender, date, page } = await props.searchParams
  return {
    ...(await generateTitleAndDescription({
      locale,
      pageNamespace: 'Page.youtube.channels.ranking',
      featNamespace: 'Features.channelsRanking.ranking.dimension',
      period,
      dimension,
      group,
      gender,
      page
    })),
    openGraph: {
      images: [
        {
          url: getOgUrl(
            `/daily-ranking?${new URLSearchParams({
              group,
              ...(gender && { gender }),
              ...(date && { date: dayjs(date).toISOString() })
            }).toString()}`
          )
        }
      ]
    },
    /** 2025/05/01：period, gender, pageは区別しないcanonicalにしてみる */
    alternates: {
      canonical: `${getWebUrl()}/${locale}/ranking/${dimension}/channels/${group}?${createSearchParams(
        {
          period: dimension === 'subscriber' ? 'all' : 'last24Hours' // 2025/05/01：固定
        }
      ).toString()}`
    }
  }
}

export default function RankingChannelsPage(props: Props) {
  const { locale, dimension, group } = use(props.params)
  const searchParams = use(props.searchParams)
  const { period, gender } = searchParams

  // Enable static rendering
  setRequestLocale(locale)
  const global = useTranslations('Global')
  const feat = useTranslations('Features.channelsRanking.ranking.dimension')

  return (
    <Page
      breadcrumb={[
        {
          href: `#`,
          name: feat(dimension, {
            group: global(`group.${group}`),
            period: global(`period.${period}`),
            gender: gender ? global(`gender.${gender}`) : ''
          })
            .replace(/\s+/g, ' ')
            .trim()
        }
      ]}
      noPadding
      fullWidth
      ads
    >
      <RankHighlighter>
        <IndexTemplate
          dimension={dimension}
          group={group}
          searchParams={searchParams}
        />
      </RankHighlighter>
    </Page>
  )
}
