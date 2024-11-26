import { PropsWithoutRef } from 'react'
import { CalendarCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Card } from '@/components/ui/card'
import { getStreams } from 'apis/youtube/getStreams'
import StreamListContentOfScheduled from 'features/group/stream/components/stream-list/StreamListContentOfScheduled'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  compact?: boolean
}

export default async function ScheduledStreamGallery({
  compact
}: PropsWithoutRef<Props>) {
  const group = getGroup()
  const [t, streams] = await Promise.all([
    getTranslations('Features.group'),
    getStreams({
      status: 'scheduled',
      group,
      // +48 hours from now
      scheduledBefore: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
      orderBy: [{ field: 'scheduledStartTime', order: 'asc' }],
      limit: 100
    })
  ])

  return (
    <Card>
      <StreamListHeader
        titleIcon={<CalendarCheck className="w-6 h-6 text-muted-foreground" />}
        title={t('scheduled.title', {
          group: (await getTranslations('Global.group'))(`${group}`)
        })}
        description={t('scheduled.description', {
          group: (await getTranslations('Global.group'))(`${group}`)
        })}
        badgeText="Scheduled"
      />
      <StreamListContentOfScheduled streams={streams} compact={compact} />
      {compact && <StreamListFooter href={`/${group}/scheduled`} />}
    </Card>
  )
}
