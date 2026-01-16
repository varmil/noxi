import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { Page } from 'components/page'
import {
  StreamRankingDimension,
  StreamRankingSearchParams
} from 'features/stream-ranking/types/stream-ranking.type'
import { StreamRankingPeriod } from 'types/period'
import { getAlternates } from 'utils/metadata/getAlternates'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import IndexTemplate from './_components/IndexTemplate'
import { StreamRankingJsonLd } from './_components/StreamRankingJsonLd'

type Props = {
  params: Promise<{
    locale: string
    period: StreamRankingPeriod
    dimension: StreamRankingDimension
    group: string
  }>
  searchParams: Promise<StreamRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, dimension, group: groupId, period } = await props.params
  const { gender, page } = await props.searchParams
  const groupName = await getGroupName(groupId, {
    errorContext: 'live ranking page (metadata)'
  })

  // canonical period: concurrent-viewer は realtime、super-chat は last30Days
  const canonicalPeriod = dimension === 'concurrent-viewer' ? 'realtime' : 'last30Days'

  return {
    ...(await generateTitleAndDescription({
      locale: locale as 'ja' | 'en',
      pageNamespace: 'Page.ranking.live',
      featNamespace: 'Features.streamRanking.ranking.dimension',
      period,
      dimension,
      groupName,
      gender,
      page
    })),
    alternates: getAlternates({
      pathname: `/ranking/${dimension}/live/${groupId}/${canonicalPeriod}`,
      locale
    })
  }
}

export default async function RankingLivePage(props: Props) {
  const { locale, dimension, group: groupId, period } = await props.params
  const searchParams = await props.searchParams

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  return (
    <>
      <StreamRankingJsonLd
        locale={locale}
        dimension={dimension}
        group={groupId}
        period={period}
        searchParams={searchParams}
      />
      <Page noPadding fullWidth ads>
        <IndexTemplate
          period={period}
          dimension={dimension}
          group={groupId}
          searchParams={searchParams}
        />
      </Page>
    </>
  )
}
