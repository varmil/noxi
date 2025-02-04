'use client'

import { useTranslations } from 'next-intl'
import LocalNavigation from 'components/local-navigation/LocalNavigation'
import { usePathname } from 'lib/navigation'

export default function LocalNavigationForLiveIdPages({
  videoId
}: {
  videoId: string
}) {
  const pathname = usePathname()
  const t = useTranslations('Features.live')
  const basePath = `/youtube/live/${videoId}`

  return (
    <LocalNavigation
      items={[
        { name: t('overview.nav'), href: basePath, prefetch: true },
        {
          name: t('earnings.nav'),
          href: `${basePath}/earnings`,
          prefetch: true
        },
        {
          name: t('comments.nav'),
          href: `${basePath}/super-chat/comments`,
          prefetch: true,
          active:
            pathname === `${basePath}/super-chat/comments` ||
            pathname === `${basePath}/comments`
        },
        {
          name: t('relatedVideos.nav'),
          href: `${basePath}/related-videos`,
          prefetch: true
        }
      ].filter(e => !!e)}
      className="w-full border-b mb-8"
      linkClassName="min-w-22 sm:min-w-36"
    />
  )
}
