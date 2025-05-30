import { PropsWithoutRef } from 'react'
import { Radio } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getStreams } from 'apis/youtube/getStreams'
import { GroupString } from 'config/constants/Group'
import { StreamGalleryPagination } from 'config/constants/Pagination'
import LiveStreamGalleryContent from 'features/group/live/components/LiveStreamGalleryContent'
import StreamGallery from 'features/group/stream/components/gallery/StreamGallery'
import StreamGalleryFooter from 'features/group/stream/components/gallery/StreamGalleryFooter'
import StreamGalleryHeader from 'features/group/stream/components/gallery/StreamGalleryHeader'

type Props = {
  compact?: boolean
  showHeader?: boolean
  where?: { title?: string; channelId?: string; group?: GroupString }
  limit?: number
  className?: string
  /** Streamが１本もない場合nullを返す */
  nullIfNoLive?: boolean
}

export default async function LiveStreamGallery({
  compact,
  showHeader,
  where,
  limit,
  className,
  nullIfNoLive
}: PropsWithoutRef<Props>) {
  const { title, channelId, group } = where || {}
  const [t, streams] = await Promise.all([
    getTranslations('Features.group'),
    getStreams({
      title,
      status: 'live',
      group,
      channelId,
      orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
      limit: StreamGalleryPagination.getLimit(compact),
      offset: StreamGalleryPagination.getOffset()
    })
  ])

  if (nullIfNoLive && streams.length === 0) {
    return null
  }

  return (
    <StreamGallery className={className}>
      {showHeader ? (
        <StreamGalleryHeader
          titleIcon={<Radio className="w-6 h-6 text-red-400" />}
          title={t('live.title')}
          description={
            group
              ? t('live.description', {
                  group: (await getTranslations('Global.group'))(`${group}`)
                })
              : ''
          }
          badgeText="Live"
        />
      ) : null}

      <LiveStreamGalleryContent streams={streams} compact={compact} />
      {compact && <StreamGalleryFooter href={`/${group}/live`} />}
    </StreamGallery>
  )
}
