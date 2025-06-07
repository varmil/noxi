import { use } from 'react'
import { Metadata } from 'next'
import { Locale, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Group'
import {
  StreamRankingDimension,
  StreamRankingSearchParams
} from 'features/stream-ranking/types/stream-ranking.type'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { createSearchParams } from 'utils/ranking/stream-ranking'
import { getWebUrl } from 'utils/web-url'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: Locale
    dimension: StreamRankingDimension
    group: GroupString
  }>
  searchParams: Promise<StreamRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, dimension, group } = await props.params
  const { period, gender, page } = await props.searchParams
  return {
    ...(await generateTitleAndDescription({
      locale,
      pageNamespace: 'Page.youtube.live.ranking',
      featNamespace: 'Features.streamRanking.ranking.dimension',
      period,
      dimension,
      group,
      gender,
      page
    })),
    /** 2025/05/01：period, gender, pageは区別しないcanonicalにしてみる */
    alternates: {
      canonical: `${getWebUrl()}/${locale}/ranking/${dimension}/live/${group}?${createSearchParams(
        {
          period: 'realtime' // 2025/05/01：固定
        }
      ).toString()}`
    }
  }
}

export default function RankingLivePage(props: Props) {
  const { locale, dimension, group } = use(props.params)
  const searchParams = use(props.searchParams)
  const { period, gender } = searchParams

  // Enable static rendering
  setRequestLocale(locale)
  const global = useTranslations('Global')
  const feat = useTranslations('Features.streamRanking.ranking.dimension')

  return (
    <Page
      breadcrumb={[
        {
          href: `#`,
          name: feat(dimension, {
            period: global(`period.${period}`),
            group: global(`group.${group}`),
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
      <IndexTemplate
        dimension={dimension}
        group={group}
        searchParams={searchParams}
      />
    </Page>
  )
}
