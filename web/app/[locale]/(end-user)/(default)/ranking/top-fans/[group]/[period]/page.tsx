import { use } from 'react'
import { Metadata } from 'next'
import { Locale, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import RankHighlighter from 'components/ranking/highlighter/RankHighlighter'
import { GroupString } from 'config/constants/Group'
import { TopFansSearchParams } from 'features/cheer/top-fans/types/top-fans.type'
import { TopFansPeriod } from 'types/period'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { getWebUrl } from 'utils/web-url'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: Locale; period: TopFansPeriod; group: GroupString }>
  searchParams: Promise<TopFansSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, period, group } = await props.params
  const { gender, page } = await props.searchParams
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
      canonical: `${getWebUrl()}/${locale}/ranking/top-fans/${group}/${period}`
    }
  }
}

export default function RankingTopFansPage(props: Props) {
  const { locale, period, group } = use(props.params)
  const searchParams = use(props.searchParams)
  const { gender } = searchParams

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
        <IndexTemplate
          period={period}
          group={group}
          searchParams={searchParams}
        />
      </RankHighlighter>
    </Page>
  )
}
