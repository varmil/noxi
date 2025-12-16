import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroup } from 'apis/groups'
import { Page } from 'components/page'
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
  const global = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Global'
  })

  let groupName: string
  if (groupId === 'all') {
    groupName = global('group.all')
  } else {
    const group = await getGroup(groupId)
    if (!group) {
      throw new Error('Group not found for live ranking page (metadata)')
    }
    groupName = group.name
  }

  return {
    ...(await generateTitleAndDescription({
      locale: locale as 'ja' | 'en',
      pageNamespace: 'Page.youtube.live.ranking',
      featNamespace: 'Features.streamRanking.ranking.dimension',
      period,
      dimension,
      groupName,
      gender,
      page
    })),
    alternates: {
      canonical: `${getWebUrl()}/${locale}/ranking/${dimension}/live/${groupId}/last30Days`
    }
  }
}

export default async function RankingLivePage(props: Props) {
  const { locale, dimension, group: groupId, period } = await props.params
  const searchParams = await props.searchParams
  const { gender } = searchParams

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  const global = await getTranslations('Global')
  const feat = await getTranslations('Features.streamRanking.ranking.dimension')

  let groupName: string
  if (groupId === 'all') {
    groupName = global('group.all')
  } else {
    const group = await getGroup(groupId)
    if (!group) {
      throw new Error('Group not found for live ranking page')
    }
    groupName = group.name
  }

  return (
    <Page
      breadcrumb={[
        {
          href: `#`,
          name: feat(dimension, {
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
      <IndexTemplate
        period={period}
        dimension={dimension}
        group={groupId}
        searchParams={searchParams}
      />
    </Page>
  )
}
