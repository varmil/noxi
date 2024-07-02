import Page from 'components/Page'
import Site from 'config/constants/Site'
import { Contact } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `お問い合わせ | ${Site.TITLE}`,
  description: `お問い合わせ | ${Site.TITLE}`
}

export default function About() {
  return (
    <Page>
      <h1>This is the Contact page</h1>
      <Contact />
    </Page>
  )
}
