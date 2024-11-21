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
} & YoutubeRankingLiveSearchParams

export type YoutubeRankingLiveSearchParams = {
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
  const t = await getTranslations({
    locale,
    namespace: 'Page.youtube.ranking.live'
  })

  return {
    title: `${t('metadata.title', {
      period: tg(`ranking.period.${searchParams.period}`)
    })} - ${tg('title')}`,
    description: `${t('metadata.description')}`
  }
}

export default function YoutubeRankingLivePage({
  params: { locale },
  searchParams
}: Props) {
  // Enable static rendering
  setRequestLocale(locale)
  const tg = useTranslations('Global.ranking')
  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        {
          href: `/youtube/ranking/live`,
          name: t('streamRanking', {
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