import { use } from 'react'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import TermsOfUseAndPrivacyPolicy from 'features/terms-of-use-and-privacy-policy/terms-of-use-and-privacy-policy'
import { getWebUrl } from 'utils/web-url'

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
    title: `Terms of Use and Privacy Policy | ${tg('title')}`,
    description: `Terms of Use and Privacy Policy`,
    alternates: {
      canonical: `${getWebUrl()}/${locale}/terms-of-use-and-privacy-policy`
    }
  }
}

export default function TermsOfUseAndPrivacyPolicyPage(props: Props) {
  const params = use(props.params)
  const { locale } = params

  // Enable static rendering
  setRequestLocale(locale as 'ja' | 'en')

  return (
    <Page breadcrumb={[{ href: '#', name: 'Terms of Use and Privacy Policy' }]}>
      <TermsOfUseAndPrivacyPolicy />
    </Page>
  )
}
