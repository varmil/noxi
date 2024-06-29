import { Metadata } from 'next'
import Page from '../../components/Page'
import Site from '../config/constants/Site'

export const metadata: Metadata = {
  title: `私たちに関して | ${Site.TITLE}`,
  description: `私たちに関して | ${Site.TITLE}`
}

export default function About() {
  return (
    <Page>
      <h1>This is the About page</h1>
    </Page>
  )
}
