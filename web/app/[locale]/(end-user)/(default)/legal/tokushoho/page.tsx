import { use } from 'react'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import { LegalInformation } from './components/LegalInformation'

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

  return {
    title: `特定商取引法に基づく表記 | ${tg('title')}`,
    description: `特定商取引法に基づく表記`
  }
}

export default function LegalTokushohoPage(props: Props) {
  const params = use(props.params)
  const { locale } = params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <Page breadcrumb={[{ href: '#', name: '特定商取引法に基づく表記' }]}>
      <LegalInformation />
    </Page>
  )
}
