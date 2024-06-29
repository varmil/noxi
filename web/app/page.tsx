import { Metadata } from 'next'
import Page from '../components/Page'
import YoutubeChannelRanking from '../features/youtube/channel/Ranking'
import Site from './config/constants/Site'

export const metadata: Metadata = {
  title: `登録者数ランキング | ${Site.TITLE}`,
  description: `登録者数ランキング | ${Site.TITLE}`
}

export default function Home() {
  return (
    <Page>
      <h1>This is the Home page v1.1.0</h1>
      <YoutubeChannelRanking />
    </Page>
  )
}
