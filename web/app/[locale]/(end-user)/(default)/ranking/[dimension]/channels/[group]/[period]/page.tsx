import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { Page } from 'components/page'
import RankHighlighter from 'components/ranking/highlighter/RankHighlighter'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
import { formatSnapshotPeriod } from 'features/channels-ranking/utils/formatSnapshotPeriod'
import {
  isSnapshotPeriod,
  parseSnapshotPeriod
} from 'features/channels-ranking/utils/gallery-params'
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
            isSnapshotPeriod(period)
              ? `/${parseSnapshotPeriod(period).period}-ranking?${new URLSearchParams({
                  [parseSnapshotPeriod(period).period === 'weekly' ? 'week' : 'month']:
                    parseSnapshotPeriod(period).target,
                  group: groupId,
                  ...(gender && { gender })
                }).toString()}`
              : `/daily-ranking?${new URLSearchParams({
                  group: groupId,
                  ...(gender && { gender }),
                  ...(date && dayjs(date).isValid() && { date: dayjs(date).toISOString() })
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

  // スナップショット期間のフォーマット
  const periodDisplayName =
    formatSnapshotPeriod(period, locale as 'ja' | 'en') ??
    global(`period.${period as Exclude<typeof period, `weekly-${string}` | `monthly-${string}`>}`)

  return (
    <Page
      breadcrumb={[
        {
          href: `#`,
          name: feat(dimension, {
            group: groupName,
            period: periodDisplayName,
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
