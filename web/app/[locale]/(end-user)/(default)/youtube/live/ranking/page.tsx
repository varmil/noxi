import { use } from 'react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { StreamRankingSearchParams } from 'features/stream-ranking/types/stream-ranking.type'
import { generateTitleAndDescription } from 'utils/metadata/metadata-generator'
import groupUsingGender from 'utils/ranking/groupUsingGender'
import { createSearchParams } from 'utils/ranking/stream-ranking'
import { getWebUrl } from 'utils/web-url'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<StreamRankingSearchParams>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const { period, dimension, group, gender, page } = await props.searchParams
  return {
    ...(await generateTitleAndDescription({
      locale,
      pageNamespace: 'Page.youtube.live.ranking',
      featNamespace: 'Features.streamRanking.ranking.dimension',
      period,
      dimension,
      group,
      gender
    })),
    alternates: {
      canonical: `${getWebUrl()}/${locale}/youtube/live/ranking?${createSearchParams(
        {
          period,
          dimension,
          group,
          ...(groupUsingGender(group) && { gender }),
          ...(page && { page: Number(page) })
        }
      ).toString()}`
    }
  }
}

export default function YoutubeLiveRankingPage(props: Props) {
  const { locale } = use(props.params)
  const searchParams = use(props.searchParams)
  const { period, dimension, group, gender } = searchParams

  // Enable static rendering
  setRequestLocale(locale)
  const breadcrumb = useTranslations('Breadcrumb')
  const global = useTranslations('Global')
  const feat = useTranslations('Features.streamRanking.ranking.dimension')

  return (
    <Page
      breadcrumb={[
        {
          href: `/youtube/live/ranking`,
          name: breadcrumb('streamsRanking')
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
