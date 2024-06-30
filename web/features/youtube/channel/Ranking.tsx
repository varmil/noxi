import { Dashboard } from '@/components/dashboard'
import GlobalBreadcrumb from '../../../components/GlobalBreadcrumb'

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
