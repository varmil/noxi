import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import RankHighlighter from 'components/ranking/highlighter/RankHighlighter'
import { MostCheeredSearchParams } from 'features/cheer/most-cheered/types/most-cheered.type'
import { MostCheeredPeriod } from 'types/period'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: string
    period: MostCheeredPeriod
    group: string
  }>
  searchParams: Promise<MostCheeredSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, period, group } = await props.params
  const { gender, page } = await props.searchParams
  return {
    ...(await generateTitleAndDescription({
      locale: locale as 'ja' | 'en',
      pageNamespace: 'Page.ranking.most-cheered',
      featNamespace: 'Features.mostCheered.dimension',
      period,
      dimension: 'most-cheered',
      group,
      gender,
      page
    })),
    // alternates: {
    //   canonical: `${getWebUrl()}/${locale}/ranking/most-cheered/${group}/last30Days`
    // }
    robots: { index: false }
  }
}

export default function RankingMostCheeredPage(props: Props) {
  const { locale, period, group } = use(props.params)
  const searchParams = use(props.searchParams)
  const { gender } = searchParams

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  const global = useTranslations('Global')
  const feat = useTranslations('Features.mostCheered.dimension')

  return (
    <Page
      breadcrumb={[
        {
          href: `#`,
          name: feat('most-cheered', {
            period: global(`period.${period}`),
            group: group ? (global as any)(`group.${group}`) : '',
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
          period={period}
          group={group}
          searchParams={searchParams}
        />
      </RankHighlighter>
    </Page>
  )
}
