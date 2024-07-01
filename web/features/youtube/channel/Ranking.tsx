import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import { Dashboard } from 'features/youtube/Dashboard'

export default function YoutubeChannelRanking() {
  return (
    <>
      <GlobalBreadcrumb
        items={[
          { href: '#', name: 'Home' },
          { href: '#', name: 'Youtube' },
          { href: '#', name: 'Channels' }
        ]}
      />
      <Dashboard />
    </>
  )
}
