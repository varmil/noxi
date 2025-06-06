/**
 * @important workaround: googlebotがscript内のhrefを拾って404扱いにする問題
 * これを回避するために、use clientをつけてhref部分を露出させないようにする
 */
'use client'

import { useTranslations } from 'next-intl'
import LocalNavigation from 'components/local-navigation/LocalNavigation'

export default function LocalNavigationForLiveIdPages({
  videoId,
  commentsTab
}: {
  videoId: string
  commentsTab: React.ReactNode // Server Component を受け取る
}) {
  const t = useTranslations('Features.live')
  const basePath = `/youtube/live/${videoId}`

  return (
    <LocalNavigation
      items={[
        { name: t('overview.nav'), href: basePath },
        {
          name: t('earnings.nav'),
          href: `${basePath}/earnings`
        },
        {
          name: t('concurrentViewers.nav'),
          href: `${basePath}/concurrent-viewers`
        },
        {
          name: commentsTab, // Server Component の結果を挿入,
          href: [`${basePath}/super-chat/comments`, `${basePath}/comments`]
        }
      ].filter(e => !!e)}
      className="w-full border-b mb-8"
      linkClassName="min-w-22 sm:min-w-36"
    />
  )
}
