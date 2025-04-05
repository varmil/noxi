import { PropsWithoutRef } from 'react'
import { CalendarCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getStreams } from 'apis/youtube/getStreams'
import { GroupString } from 'config/constants/Group'
import { StreamGalleryPagination } from 'config/constants/Pagination'
import ScheduledStreamGalleryContent from 'features/group/scheduled/components/ScheduledStreamGalleryContent'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'

type Props = {
  compact?: boolean
  showHeader?: boolean
  where?: { title?: string; channelId?: string; group?: GroupString }
  limit?: number
  className?: string
}

export default async function ScheduledStreamGallery({
  compact,
  showHeader,
  where,
  limit,
  className
}: PropsWithoutRef<Props>) {
  const { title, channelId, group } = where || {}
  const [t, streams] = await Promise.all([
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
    })
  ])

  return (
    <section className={`py-6 ${className ?? ''}`}>
      {showHeader ? (
        <StreamListHeader
          titleIcon={
            <CalendarCheck className="w-6 h-6 text-muted-foreground" />
          }
          title={t('scheduled.title')}
          description={
            group
              ? t('scheduled.description', {
                  group: (await getTranslations('Global.group'))(`${group}`)
                })
              : ''
          }
          badgeText="Scheduled"
        />
      ) : null}

      <ScheduledStreamGalleryContent streams={streams} compact={compact} />
      {compact && <StreamListFooter href={`/${group}/scheduled`} />}
    </section>
  )
}
