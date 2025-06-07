import { use } from 'react'
import { Metadata } from 'next'
import { Locale, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import RankHighlighter from 'components/ranking/highlighter/RankHighlighter'
import { TopFansSearchParams } from 'features/cheer/top-fans/types/top-fans.type'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { createSearchParams } from 'utils/ranking/top-fans'
import { getWebUrl } from 'utils/web-url'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<TopFansSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const { period, group, gender, date, page } = await props.searchParams
  return {
    ...(await generateTitleAndDescription({
      locale,
      pageNamespace: 'Page.ranking.top-fans',
      featNamespace: 'Features.topFans.dimension',
      period,
      dimension: 'top-fans',
      group,
      gender,
      page
    })),
    alternates: {
      canonical: `${getWebUrl()}/${locale}/ranking/top-fans?${createSearchParams(
        {
          period: 'last30Days',
          group
        }
      ).toString()}`
    }
  }
}

export default function RankingTopFansPage(props: Props) {
  const { locale } = use(props.params)
  const searchParams = use(props.searchParams)
  const { period, group, gender } = searchParams

  // Enable static rendering
  setRequestLocale(locale)
  const global = useTranslations('Global')
  const feat = useTranslations('Features.topFans.dimension')

  return (
    <Page
      breadcrumb={[
        {
          href: `#`,
          name: feat('top-fans', {
            period: global(`period.${period}`),
            group: group ? global(`group.${group}`) : '',
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
        <IndexTemplate searchParams={searchParams} />
      </RankHighlighter>
    </Page>
  )
}
