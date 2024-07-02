import { Metadata } from 'next'
import Page from 'components/Page'
import Site from 'config/constants/Site'
import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: `私たちに関して | ${Site.TITLE}`,
  description: `私たちに関して | ${Site.TITLE}`
}

export default function About({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  return (
    <Page>
      <h1>This is the About page</h1>
      <div className="text-3xl font-bold underline">Hello world!!</div>
    </Page>
  )
}
