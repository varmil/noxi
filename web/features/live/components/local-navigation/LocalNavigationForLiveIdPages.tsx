import { useTranslations } from 'next-intl'
import LocalNavigation from 'components/local-navigation/LocalNavigation'

export default function LocalNavigationForLiveIdPages({
  videoId
}: {
  videoId: string
}) {
  const t = useTranslations('Features.live')
  const basePath = `/youtube/live/${videoId}`

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
          name: t('superChatComments.nav'),
          href: `${basePath}/super-chat/comments`,
          prefetch: true
        },
        {
          name: t('comments.nav'),
          href: `${basePath}/comments`,
          prefetch: true
        },
        {
          name: t('relatedVideos.nav'),
          href: `${basePath}/related-videos`,
          prefetch: true
        }
      ].filter(e => !!e)}
      className="w-full border-b mb-8"
      linkClassName="min-w-20 sm:min-w-30"
    />
  )
}
