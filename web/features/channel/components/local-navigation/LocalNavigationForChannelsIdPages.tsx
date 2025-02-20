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
          name: t('live.nav'),
          href: [`${basePath}/live`, `${basePath}/asmr`],
          prefetch: true
        },
        {
          name: t('concurrentViewers.nav'),
          href: `${basePath}/concurrent-viewers`,
          prefetch: true
        },
        {
          name: t('comments.nav'),
          href: [`${basePath}/comments`],
          prefetch: true
        },
        {
          name: t('streamTimes.nav'),
          href: `${basePath}/stream-times`,
          prefetch: true
        },
        hasFAQ(channelId)
          ? {
              name: t('faq.nav'),
              href: `${basePath}/faq`
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
