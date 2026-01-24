import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { getAlternates } from 'utils/metadata/getAlternates'
import IndexTemplate from './_components/IndexTemplate'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ group?: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [t, tGlobal] = await Promise.all([
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Page.ranking.concurrentViewerLiveIndex.metadata'
    }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Global'
    })
  ])

  return {
    title: `${t('title')} - ${tGlobal('title')}`,
    description: t('description'),
    alternates: getAlternates({
      pathname: '/ranking/concurrent-viewer/live',
      locale
    })
  }
}

export default async function ConcurrentViewerLiveIndexPage(props: Props) {
  const { locale } = await props.params
  const searchParams = await props.searchParams

  setRequestLocale(locale as 'ja' | 'en')

  const t = await getTranslations('Page.ranking.concurrentViewerLiveIndex')

  return (
    <Page
      breadcrumb={[
        { href: `/ranking/concurrent-viewer/live`, name: t('heading') }
      ]}
      h1={t('heading')}
    >
      <IndexTemplate
        locale={locale as 'ja' | 'en'}
        group={searchParams.group}
      />
    </Page>
  )
}
