/**
 * @important workaround: googlebotがscript内のhrefを拾って404扱いにする問題
 * これを回避するために、use clientをつけてhref部分を露出させないようにする
 */
'use client'

import { useTranslations } from 'next-intl'
import LocalNavigation from 'components/local-navigation/LocalNavigation'

export default function LocalNavigationForGroupPages({
  group
}: {
  group: string
}) {
  const t = useTranslations('Features.group')
  const basePath = `/${group}`

  return (
    <LocalNavigation
      items={[
        { name: t('overview.nav'), href: basePath },
        {
          name: t('talents.nav'),
          href: `${basePath}/charts/channels`
        },
        { name: t('live.nav'), href: `${basePath}/live` },
        {
          name: t('scheduled.nav'),
          href: `${basePath}/scheduled`
        },
        { name: t('ended.nav'), href: `${basePath}/ended` },
        {
          name: t('superChatRanking.nav'),
          href: `/ranking/super-chat/channels/${group}/last30Days`
        }
      ]}
      className="mb-6"
    />
  )
}
