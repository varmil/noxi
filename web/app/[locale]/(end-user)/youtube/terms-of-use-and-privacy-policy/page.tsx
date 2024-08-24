import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import Page from 'components/Page'
import TermsOfUseAndPrivacyPolicy from 'features/terms-of-use-and-privacy-policy/terms-of-use-and-privacy-policy'

type Props = {
  params: { locale: string; name: string }
}

export async function generateMetadata({
  params: { locale, name }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })

  return {
    title: `Terms of Use and Privacy Policy | ${tg('title')}`,
    description: `Terms of Use and Privacy Policy`
  }
}

export default function TermsOfUseAndPrivacyPolicyPage({
  params: { locale, name }
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        { href: '/', name: 'YouTube' },
        { href: '#', name: 'Terms of Use and Privacy Policy' }
      ]}
    >
      <TermsOfUseAndPrivacyPolicy />
    </Page>
  )
}
