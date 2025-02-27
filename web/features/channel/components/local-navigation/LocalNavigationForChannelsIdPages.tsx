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
        { name: t('overview.nav'), pathname: basePath, prefetch: true },
        {
          name: t('superChat.nav'),
          pathname: `${basePath}/super-chat`,
          prefetch: true
        },
        {
          name: t('live.nav'),
          pathname: [`${basePath}/live`, `${basePath}/asmr`],
          prefetch: true
        },
        {
          name: t('concurrentViewers.nav'),
          pathname: `${basePath}/concurrent-viewers`,
          prefetch: true
        },
        {
          name: t('comments.nav'),
          pathname: [`${basePath}/comments`],
          prefetch: true
        },
        {
          name: t('streamTimes.nav'),
          pathname: `${basePath}/stream-times`,
          prefetch: true
        },
        hasFAQ(channelId)
          ? {
              name: t('faq.nav'),
              pathname: `${basePath}/faq`
            }
          : null
      ].filter(e => !!e)}
      className="border-b mb-8"
      linkClassName="min-w-20"
    />
  )
}

const hasFAQ = (channelId: string) =>
  [
    'UCrV1Hf5r8P148idjoSfrGEQ' // 結城さくな
  ].includes(channelId)
