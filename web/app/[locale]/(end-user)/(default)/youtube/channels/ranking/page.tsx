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
  const { period, dimension, group, gender, date } = await props.searchParams
  const global = await getTranslations({ locale, namespace: 'Global' })
  const page = await getTranslations({
    locale,
    namespace: 'Page.youtube.channels.ranking'
  })
  const feat = await getTranslations({
    locale,
    namespace: 'Features.channelsRanking.ranking.dimension'
  })

  // 「ホロライブ」や「にじさんじ」 などグループ名が指定されている場合は、「VTuber」
  //  を省略してシンプルなタイトルにする方がSEOとユーザー体験の観点から最適
  const titlePrefix = group ? '' : page('metadata.title')

  return {
    title: `${titlePrefix} ${feat(dimension, {
      period: global(`period.${period}`),
      group: group ? global(`group.${group}`) : '',
      gender: gender ? global(`gender.${gender}`) : ''
    })
      .replace(/\s+/g, ' ')
      .trim()} - ${global('title')}`,

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
