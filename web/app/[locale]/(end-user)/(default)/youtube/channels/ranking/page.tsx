import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import {
  ChannelsRankingPeriod,
  ChannelsRankingDimension,
  ChannelsRankingGroup,
  ChannelsRankingCountry
} from 'features/channels-ranking/types/channels-ranking.type'
import dayjs from 'lib/dayjs'
import { getOgUrl } from 'utils/og-url'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: { locale: string }
} & YoutubeChannelsRankingSearchParams

export type YoutubeChannelsRankingSearchParams = {
  searchParams: {
    period: ChannelsRankingPeriod
    dimension: ChannelsRankingDimension
    group?: ChannelsRankingGroup
    country?: ChannelsRankingCountry

    /** For OG */
    date?: string
  }
}

export async function generateMetadata({
  params: { locale },
  searchParams: { date, ...searchParams }
}: Props): Promise<Metadata> {
  const global = await getTranslations({ locale, namespace: 'Global' })
  const page = await getTranslations({
    locale,
    namespace: 'Page.youtube.channels.ranking'
  })
  const feat = await getTranslations({
    locale,
    namespace: 'Features.channelsRanking.ranking.dimension'
  })

  return {
    title: `${page('metadata.title')} ${feat(searchParams.dimension, {
      period: global(`ranking.period.${searchParams.period}`)
    })} - ${global('title')}`,

    description: `${page('metadata.description')}`,

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

export default function YoutubeChannelsRankingPage({
  params: { locale },
  searchParams
}: Props) {
  // Enable static rendering
  setRequestLocale(locale)
  const breadcrumb = useTranslations('Breadcrumb')
  const tg = useTranslations('Global.ranking')
  const t = useTranslations('Features.channelsRanking.ranking.dimension')

  return (
    <Page
      breadcrumb={[
        {
          href: `/youtube/channels/ranking`,
          name: breadcrumb('channelsRanking')
        },
        {
          href: `#`,
          name: t(searchParams.dimension, {
            period: tg(`period.${searchParams.period}`)
          })
        }
      ]}
      noPadding
      fullWidth
    >
      <IndexTemplate searchParams={searchParams} />
    </Page>
  )
}
