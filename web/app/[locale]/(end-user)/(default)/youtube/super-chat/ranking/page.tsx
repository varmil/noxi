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
    namespace: 'Page.youtube.superChat.ranking.index'
  })

  return {
    title: `${t('metadata.title')} - ${tg('title')}`,
    description: `${t('metadata.description')}`
  }
}

export default function YoutubeSuperChatRankingPage({
  params: { locale }
}: Props) {
  // Enable static rendering
  setRequestLocale(locale)
  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        {
          href: `/youtube/super-chat/ranking`,
          name: t('superChatRanking')
        }
      ]}
    >
      <IndexTemplate />
    </Page>
  )
}
