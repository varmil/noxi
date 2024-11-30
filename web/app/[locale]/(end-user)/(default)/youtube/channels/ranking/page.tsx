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
  searchParams: { date }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.youtube.channels.ranking.index'
  })

  const searchParams = new URLSearchParams({
    ...(date && { date: dayjs(date).toISOString() })
  })

  return {
    title: `${t('metadata.title')} - ${tg('title')}`,
    description: `${t('metadata.description')}`,
    openGraph: {
      images: [
        {
          url: getOgUrl(`/daily-ranking?${searchParams.toString()}`)
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
  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        {
          href: `/youtube/channels/ranking`,
          name: t('channelsRanking')
        }
      ]}
      noPadding
      fullWidth
    >
      <IndexTemplate searchParams={searchParams} />
    </Page>
  )
}
