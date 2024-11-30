import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import {
  StreamRankingCountry,
  StreamRankingDimension,
  StreamRankingGroup,
  StreamRankingPeriod
} from 'features/stream-ranking/types/stream-ranking.type'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: { locale: string }
} & YoutubeLiveRankingSearchParams

export type YoutubeLiveRankingSearchParams = {
  searchParams: {
    period: StreamRankingPeriod
    dimension: StreamRankingDimension
    group?: StreamRankingGroup
    country?: StreamRankingCountry
  }
}

export async function generateMetadata({
  params: { locale },
  searchParams
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const tp = await getTranslations({
    locale,
    namespace: 'Page.youtube.live.ranking'
  })
  const tf = await getTranslations({
    locale,
    namespace: 'Features.streamRanking.ranking.dimension'
  })

  return {
    title: `${tf(searchParams.dimension, {
      period: tg(`ranking.period.${searchParams.period}`)
    })} - ${tg('title')}`,
    description: `${tp('metadata.description')}`
  }
}

export default function YoutubeLiveRankingPage({
  params: { locale },
  searchParams
}: Props) {
  // Enable static rendering
  setRequestLocale(locale)
  const tg = useTranslations('Global.ranking')
  const t = useTranslations('Features.streamRanking.ranking.dimension')

  return (
    <Page
      breadcrumb={[
        {
          href: `/youtube/live/ranking`,
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
