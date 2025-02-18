import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { ChannelsRankingSearchParams } from 'features/channels-ranking/types/channels-ranking.type'
import dayjs from 'lib/dayjs'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import { getOgUrl } from 'utils/og-url'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<ChannelsRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const { period, dimension, group, gender, date } = await props.searchParams
  return {
    ...(await generateTitleAndDescription({
      locale,
      pageNamespace: 'Page.youtube.channels.ranking',
      featNamespace: 'Features.channelsRanking.ranking.dimension',
      period,
      dimension,
      group,
      gender
    })),

    openGraph: {
      images: [
        {
          url: getOgUrl(
            `/daily-ranking?${new URLSearchParams({
              ...(date && { date: dayjs(date).toISOString() })
            }).toString()}`
          )
        }
      ]
    }
  }
}

export default function YoutubeChannelsRankingPage(props: Props) {
  const { locale } = use(props.params)
  const searchParams = use(props.searchParams)
  const { period, dimension, group, gender } = searchParams

  // Enable static rendering
  setRequestLocale(locale)
  const breadcrumb = useTranslations('Breadcrumb')
  const global = useTranslations('Global')
  const feat = useTranslations('Features.channelsRanking.ranking.dimension')

  return (
    <Page
      breadcrumb={[
        {
          href: `/youtube/channels/ranking`,
          name: breadcrumb('channelsRanking')
        },
        {
          href: `#`,
          name: feat(dimension, {
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
    >
      <IndexTemplate searchParams={searchParams} />
    </Page>
  )
}
