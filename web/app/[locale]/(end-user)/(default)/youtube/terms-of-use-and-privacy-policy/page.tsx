import { use } from "react";
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import TermsOfUseAndPrivacyPolicy from 'features/terms-of-use-and-privacy-policy/terms-of-use-and-privacy-policy'

type Props = {
  params: Promise<{ locale: string; name: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    name
  } = params;

  const tg = await getTranslations({ locale, namespace: 'Global' })

  return {
    title: `Terms of Use and Privacy Policy | ${tg('title')}`,
    description: `Terms of Use and Privacy Policy`
  }
}

export default function TermsOfUseAndPrivacyPolicyPage(props: Props) {
  const params = use(props.params);

  const {
    locale,
    name
  } = params;

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
