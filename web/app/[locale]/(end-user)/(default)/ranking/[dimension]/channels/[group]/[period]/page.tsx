import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { Page } from 'components/page'
import RankHighlighter from 'components/ranking/highlighter/RankHighlighter'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
import dayjs from 'lib/dayjs'
import { ChannelsRankingPeriod } from 'types/period'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { getOgUrl } from 'utils/og-url'
import { getWebUrl } from 'utils/web-url'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{
    locale: string
    period: ChannelsRankingPeriod
    dimension: ChannelsRankingDimension
    group: string
  }>
  searchParams: Promise<ChannelsRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, dimension, group: groupId, period } = await props.params
  const { gender, date, page } = await props.searchParams
  const groupName = await getGroupName(groupId, {
    errorContext: 'channels ranking page (metadata)'
  })

  return {
    ...(await generateTitleAndDescription({
      locale: locale as 'ja' | 'en',
      pageNamespace: 'Page.youtube.channels.ranking',
      featNamespace: 'Features.channelsRanking.ranking.dimension',
      period,
      dimension,
      groupName,
      gender,
      page
    })),
    openGraph: {
      images: [
        {
          url: getOgUrl(
            `/daily-ranking?${new URLSearchParams({
              group: groupId,
              ...(gender && { gender }),
              ...(date && { date: dayjs(date).toISOString() })
            }).toString()}`
          )
        }
      ]
    },
    /** 2025/05/01：period, gender, pageは区別しないcanonicalにしてみる */
    alternates: {
      canonical: `${getWebUrl()}/${locale}/ranking/${dimension}/channels/${groupId}/${dimension === 'subscriber' ? 'wholePeriod' : 'last30Days'}`
    }
  }
}

export default async function RankingChannelsPage(props: Props) {
  const { locale, dimension, group: groupId, period } = await props.params
  const searchParams = await props.searchParams
  const { gender } = searchParams

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')
  const [global, feat, groupName] = await Promise.all([
    getTranslations('Global'),
    getTranslations('Features.channelsRanking.ranking.dimension'),
    getGroupName(groupId, { errorContext: 'channels ranking page' })
  ])

  return (
    <Page
      breadcrumb={[
        {
          href: `#`,
          name: feat(dimension, {
            group: groupName,
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
          period={period}
          dimension={dimension}
          group={groupId}
          searchParams={searchParams}
        />
      </RankHighlighter>
    </Page>
  )
}
