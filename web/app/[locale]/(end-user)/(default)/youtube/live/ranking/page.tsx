import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { StreamRankingSearchParams } from 'features/stream-ranking/types/stream-ranking.type'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<StreamRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const searchParams = await props.searchParams
  const global = await getTranslations({ locale, namespace: 'Global' })
  const page = await getTranslations({
    locale,
    namespace: 'Page.youtube.live.ranking'
  })
  const feat = await getTranslations({
    locale,
    namespace: 'Features.streamRanking.ranking.dimension'
  })

  return {
    title: `${page('metadata.title')} ${feat(searchParams.dimension, {
      period: global(`period.${searchParams.period}`)
    })} - ${global('title')}`,
    description: `${page('metadata.description')}`
  }
}

export default function YoutubeLiveRankingPage(props: Props) {
  const { locale } = use(props.params)
  const searchParams = use(props.searchParams)

  // Enable static rendering
  setRequestLocale(locale)
  const breadcrumb = useTranslations('Breadcrumb')
  const tg = useTranslations('Global')
  const t = useTranslations('Features.streamRanking.ranking.dimension')

  return (
    <Page
      breadcrumb={[
        {
          href: `/youtube/live/ranking`,
          name: breadcrumb('streamsRanking')
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
