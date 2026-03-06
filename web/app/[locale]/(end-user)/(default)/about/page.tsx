import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Page } from 'components/page'
import { getAlternates } from 'utils/metadata/getAlternates'
import AboutTemplate from './_components/AboutTemplate'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [global, page] = await Promise.all([
    getTranslations({ locale: locale as 'ja' | 'en', namespace: 'Global' }),
    getTranslations({
      locale: locale as 'ja' | 'en',
      namespace: 'Pages.about'
    })
  ])

  const title = `${page('metadata.title')} - ${global('title')}`
  const description = page('metadata.description')

  return {
    title,
    description,
    alternates: getAlternates({ pathname: '/about', locale }),
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'VCharts'
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  }
}

export default async function AboutPage() {
  const t = await getTranslations('Pages.about')
  return (
    <Page
      noPadding
      fullWidth
      breadcrumb={[{ href: '/about', name: t('metadata.title') }]}
    >
      <AboutTemplate />
    </Page>
  )
}
