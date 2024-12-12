import { useTranslations } from 'next-intl'
import LocalNavigation from 'components/local-navigation/LocalNavigation'
import { getGroup } from 'lib/server-only-context/cache'

export default function LocalNavigationForChannelsIdPages({
  channelId
}: {
  channelId: string
}) {
  const group = getGroup()
  const t = useTranslations('Features.channel')
  const basePath = `/${group}/channels/${channelId}`

  return (
    <LocalNavigation
      items={[
        { name: t('overview.nav'), href: basePath, prefetch: true },
        {
          name: t('superChat.nav'),
          href: `${basePath}/super-chat`,
          prefetch: true
        },
        {
          name: t('streamTimes.nav'),
          href: `${basePath}/stream-times`,
          prefetch: true
        }
      ]}
      className="border-b mb-8"
      linkClassName="min-w-20"
    />
  )
}
