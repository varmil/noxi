import { Metadata } from 'next'
import { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Page } from 'components/page'
import HowToPlayTemplate from './components/HowToPlayTemplate'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const [global, page] = await Promise.all([
    getTranslations({ locale, namespace: 'Global' }),
    getTranslations({ locale, namespace: 'Page.howToPlay' })
  ])
  return {
    title: `${page('metadata.title')} - ${global('title')}`,
    description: `${page('metadata.description')}`
  }
}

export default function HowToPlayPage(props: Props) {
  return (
    <Page>
      <div className="min-h-screen">
        <HowToPlayTemplate />
      </div>
    </Page>
  )
}
