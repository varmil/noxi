import Page from '../../components/Page'
import { Metadata } from 'next'
import Contact from '../../features/contact/Contact'
import Site from '../config/constants/Site'

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
