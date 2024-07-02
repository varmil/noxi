import { Metadata } from 'next'
import Page from 'components/Page'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import { YoutubeDashboard } from 'features/youtube/YoutubeDashboard'
import Site from 'config/constants/Site'

export const metadata: Metadata = {
  title: `チャンネル | ${Site.TITLE}`,
  description: `チャンネル | ${Site.TITLE}`
}

export default function Home() {
  return (
    <Page>
      <GlobalBreadcrumb
        items={[
          { href: '#', name: 'Home' },
          { href: '#', name: 'Youtube' },
          { href: '#', name: 'Channels' }
        ]}
      />
      <YoutubeDashboard />
    </Page>
  )
}
