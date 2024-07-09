import { Contact } from 'lucide-react'
import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import Page from 'components/Page'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Contact' })

  return {
    title: `${t('title')} | ${tg('title')}`,
    description: `${t('description')}`
  }
}

export default function About({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  return (
    <Page>
      <h1>This is the Contact page</h1>
      <Contact />
    </Page>
  )
}
