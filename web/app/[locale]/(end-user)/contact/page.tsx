import { Contact } from 'lucide-react'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import Page from 'components/Page'
import Site from 'config/constants/Site'

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: `お問い合わせ | ${Site.TITLE}`,
  description: `お問い合わせ | ${Site.TITLE}`
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
