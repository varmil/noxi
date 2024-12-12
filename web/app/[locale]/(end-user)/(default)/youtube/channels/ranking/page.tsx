import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { ChannelsRankingSearchParams } from 'features/channels-ranking/types/channels-ranking.type'
import dayjs from 'lib/dayjs'
import { getOgUrl } from 'utils/og-url'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<ChannelsRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const { dimension, period, date } = await props.searchParams
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
    title: `${page('metadata.title')} ${feat(dimension, {
      period: global(`period.${period}`)
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

export default function YoutubeChannelsRankingPage(props: Props) {
  const { locale } = use(props.params)
  const searchParams = use(props.searchParams)

  // Enable static rendering
  setRequestLocale(locale)
  const breadcrumb = useTranslations('Breadcrumb')
  const tg = useTranslations('Global')
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
