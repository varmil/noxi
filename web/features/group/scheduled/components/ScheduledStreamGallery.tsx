import { PropsWithoutRef } from 'react'
import { CalendarCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { getStreams } from 'apis/youtube/getStreams'
import { StreamGalleryPagination } from 'config/constants/Pagination'
import ScheduledStreamGalleryContent from 'features/group/scheduled/components/ScheduledStreamGalleryContent'
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

export default async function ScheduledStreamGallery({
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
      status: 'scheduled',
      group,
      channelId,
      // +48 hours from now
      scheduledBefore: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
      orderBy: [{ field: 'scheduledStartTime', order: 'asc' }],
      limit: StreamGalleryPagination.getLimit(compact),
      offset: StreamGalleryPagination.getOffset()
    }),
    group
      ? getGroupName(group, { errorContext: 'scheduled stream gallery' })
      : Promise.resolve('')
  ])

  if (nullIfNoLive && streams.length === 0) {
    return null
  }

  return (
    <StreamGallery className={className}>
      {showHeader ? (
        <StreamGalleryHeader
          titleIcon={
            <CalendarCheck className="w-6 h-6 text-muted-foreground" />
          }
          title={t('scheduled.title')}
          description={
            groupName ? t('scheduled.description', { group: groupName }) : ''
          }
          badgeText="Scheduled"
        />
      ) : null}

      <ScheduledStreamGalleryContent streams={streams} compact={compact} />
      {compact && <StreamGalleryFooter href={`/${group}/scheduled`} />}
    </StreamGallery>
  )
}
