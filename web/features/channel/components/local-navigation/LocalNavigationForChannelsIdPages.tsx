/**
 * @important workaround: googlebotがscript内のhrefを拾って404扱いにする問題
 * これを回避するために、use clientをつけてhref部分を露出させないようにする
 */
'use client'

import { useTranslations } from 'next-intl'
import LocalNavigation from 'components/local-navigation/LocalNavigation'
import { GroupString } from 'config/constants/Group'

export default function LocalNavigationForChannelsIdPages({
  channelId,
  group
}: {
  channelId: string
  group: GroupString
}) {
  const t = useTranslations('Features.channel')
  const basePath = `/${group}/channels/${channelId}`

  return (
    <LocalNavigation
      items={[
        { name: t('overview.nav'), href: basePath },
        {
          name: t('superChat.nav'),
          href: `${basePath}/super-chat`
        },
        {
          name: t('live.nav'),
          href: [`${basePath}/live`, `${basePath}/asmr`]
        },
        {
          name: t('concurrentViewers.nav'),
          href: `${basePath}/concurrent-viewers`
        },
        {
          name: t('comments.nav'),
          href: [`${basePath}/comments`]
        },
        {
          name: t('streamTimes.nav'),
          href: `${basePath}/stream-times`
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
