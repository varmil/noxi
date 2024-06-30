import { Metadata } from 'next'
import Page from '../components/Page'
import YoutubeChannelRanking from '../features/youtube/channel/Ranking'
import Site from './config/constants/Site'

export const metadata: Metadata = {
  title: `チャンネル | ${Site.TITLE}`,
  description: `チャンネル | ${Site.TITLE}`
}

export default function Home() {
  return (
    <Page>
      <YoutubeChannelRanking />
    </Page>
  )
}
