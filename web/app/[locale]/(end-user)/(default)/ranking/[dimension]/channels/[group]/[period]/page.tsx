import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { Page } from 'components/page'
import RankHighlighter from 'components/ranking/highlighter/RankHighlighter'
import {
  ChannelsRankingDimension,
  ChannelsRankingSearchParams
} from 'features/channels-ranking/types/channels-ranking.type'
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

  // OGPを出力する条件：
  // - last24Hours: daily-ranking OGを出力
  // - weekly-xxx, monthly-xxx: X用OGを出力
  // - それ以外（last7Days, last30Days, thisYear等）: OGを出力しない
  const shouldShowOg = period === 'last24Hours' || isSnapshotPeriod(period)

  return {
    ...(await generateTitleAndDescription({
      locale: locale as 'ja' | 'en',
      pageNamespace: 'Page.ranking.channels',
      featNamespace: 'Features.channelsRanking.ranking.dimension',
      period,
      dimension,
      groupName,
      gender,
      page
    })),
    ...(shouldShowOg && {
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
      }
    }),
    /** 2025/05/01：period, gender, pageは区別しないcanonicalにしてみる */
    alternates: {
      canonical: `${getWebUrl()}/${locale}/ranking/${dimension}/channels/${groupId}/${dimension === 'subscriber' ? 'wholePeriod' : 'last30Days'}`
    }
  }
}

export default async function RankingChannelsPage(props: Props) {
  const { locale, dimension, group: groupId, period } = await props.params
  const searchParams = await props.searchParams

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <Page noPadding fullWidth ads>
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
