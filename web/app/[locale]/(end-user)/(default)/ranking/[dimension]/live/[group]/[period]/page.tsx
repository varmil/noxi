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
import { StreamRankingPeriod } from 'types/period'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { getWebUrl } from 'utils/web-url'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: Locale
    period: StreamRankingPeriod
    dimension: StreamRankingDimension
    group: GroupString
  }>
  searchParams: Promise<StreamRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, dimension, group, period } = await props.params
  const { gender, page } = await props.searchParams
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
    alternates: {
      canonical: `${getWebUrl()}/${locale}/ranking/${dimension}/live/${group}/realtime`
    }
  }
}

export default function RankingLivePage(props: Props) {
  const { locale, dimension, group, period } = use(props.params)
  const searchParams = use(props.searchParams)
  const { gender } = searchParams

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
        period={period}
        dimension={dimension}
        group={group}
        searchParams={searchParams}
      />
    </Page>
  )
}
