'use client'

import { useTranslations } from 'next-intl'
import LocalNavigation from 'components/local-navigation/LocalNavigation'

/**
 *
 */
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
        { name: t('overview.nav'), pathname: basePath, prefetch: true },
        {
          name: t('earnings.nav'),
          pathname: `${basePath}/earnings`,
          prefetch: true
        },
        {
          name: commentsTab, // Server Component の結果を挿入,
          pathname: [`${basePath}/super-chat/comments`, `${basePath}/comments`],
          prefetch: true
        },
        {
          name: t('relatedVideos.nav'),
          pathname: `${basePath}/related-videos`,
          prefetch: true
        }
      ].filter(e => !!e)}
      className="w-full border-b mb-8"
      linkClassName="min-w-22 sm:min-w-36"
    />
  )
}
