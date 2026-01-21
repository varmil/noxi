import { use } from 'react'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import DataMethodologyAndDisclaimer from 'features/data-methodology-and-disclaimer/DataMethodologyAndDisclaimer'
import { getAlternates } from 'utils/metadata/getAlternates'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  const tg = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Global'
  })
  const tp = await getTranslations({
    locale: locale as 'ja' | 'en',
    namespace: 'Pages.dataMethodologyAndDisclaimer'
  })

  return {
    title: `${tp('title')} - ${tg('title')}`,
    description: tp('description'),
    alternates: getAlternates({
      pathname: '/data-methodology-and-disclaimer',
      locale
    })
  }
}

export default function DataMethodologyAndDisclaimerPage(props: Props) {
  const params = use(props.params)
  const { locale } = params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <Page breadcrumb={[{ href: '#', name: 'Data Methodology & Disclaimer' }]}>
      <DataMethodologyAndDisclaimer />
    </Page>
  )
}
