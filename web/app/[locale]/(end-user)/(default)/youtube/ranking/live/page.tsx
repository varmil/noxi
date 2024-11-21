import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.youtube.ranking.live'
  })

  return {
    title: `${t('metadata.title')} - ${tg('title')}`,
    description: `${t('metadata.description')}`
  }
}

export default function YoutubeRankingLivePage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale)
  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        {
          href: `/youtube/live`,
          name: t('streamRanking')
        }
      ]}
      noPadding
      fullWidth
    >
      <IndexTemplate />
    </Page>
  )
}
