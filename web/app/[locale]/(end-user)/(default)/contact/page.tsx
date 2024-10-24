import { Contact } from 'lucide-react'
import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Contact' })

  return {
    title: `${t('title')} | ${tg('title')}`,
    description: `${t('description')}`
  }
}

export default async function About(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  // Enable static rendering
  unstable_setRequestLocale(locale)

  return (
    <Page>
      <h1>This is the Contact page</h1>
      <Contact />
    </Page>
  )
}
