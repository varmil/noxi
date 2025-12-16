import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
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
  const { locale, period, group: groupId } = await props.params
  const { gender, page } = await props.searchParams
  const groupName = await getGroupName(groupId, {
    errorContext: 'most-cheered page (metadata)'
  })

  return {
    ...(await generateTitleAndDescription({
      locale: locale as 'ja' | 'en',
      pageNamespace: 'Page.ranking.most-cheered',
      featNamespace: 'Features.mostCheered.dimension',
      period,
      dimension: 'most-cheered',
      groupName,
      gender,
      page
    })),
    robots: { index: false }
  }
}

export default async function RankingMostCheeredPage(props: Props) {
  const { locale, period, group: groupId } = await props.params
  const searchParams = await props.searchParams
  const { gender } = searchParams

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  const [global, feat, groupName] = await Promise.all([
    getTranslations('Global'),
    getTranslations('Features.mostCheered.dimension'),
    getGroupName(groupId, { errorContext: 'most-cheered page' })
  ])

  return (
    <Page
      breadcrumb={[
        {
          href: `#`,
          name: feat('most-cheered', {
            period: global(`period.${period}`),
            group: groupName,
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
          group={groupId}
          searchParams={searchParams}
        />
      </RankHighlighter>
    </Page>
  )
}
