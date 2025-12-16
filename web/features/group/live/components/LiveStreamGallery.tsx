import { PropsWithoutRef } from 'react'
import { Radio } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { getStreams } from 'apis/youtube/getStreams'
import { StreamGalleryPagination } from 'config/constants/Pagination'
import LiveStreamGalleryContent from 'features/group/live/components/LiveStreamGalleryContent'
import StreamGallery from 'features/group/stream/components/gallery/StreamGallery'
import StreamGalleryFooter from 'features/group/stream/components/gallery/StreamGalleryFooter'
import StreamGalleryHeader from 'features/group/stream/components/gallery/StreamGalleryHeader'

type Props = {
  compact?: boolean
  showHeader?: boolean
  where?: { title?: string; channelId?: string; group?: string }
  limit?: number
  className?: string
  /** Streamが１本もない場合nullを返す */
  nullIfNoLive?: boolean
}

export default async function LiveStreamGallery({
  compact,
  showHeader,
  where,
  className,
  nullIfNoLive
}: PropsWithoutRef<Props>) {
  const { title, channelId, group } = where || {}
  const [t, streams, groupName] = await Promise.all([
    getTranslations('Features.group'),
    getStreams({
      title,
      status: 'live',
      group,
      channelId,
      orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
      limit: StreamGalleryPagination.getLimit(compact),
      offset: StreamGalleryPagination.getOffset()
    }),
    group
      ? getGroupName(group, { errorContext: 'live stream gallery' })
      : Promise.resolve('')
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
            groupName ? t('live.description', { group: groupName }) : ''
          }
          badgeText="Live"
        />
      ) : null}

      <LiveStreamGalleryContent streams={streams} compact={compact} />
      {compact && <StreamGalleryFooter href={`/${group}/live`} />}
    </StreamGallery>
  )
}
