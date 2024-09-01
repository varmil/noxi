import { PropsWithoutRef } from 'react'
import { CalendarCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { getStreams } from 'api/youtube/getStreams'
import StreamListContentOfScheduled from 'features/group/stream/components/stream-list/StreamListContentOfScheduled'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  title: string
  description: string
  compact?: boolean
}

export default async function ScheduledStreamGallery({
  title,
  description,
  compact
}: PropsWithoutRef<Props>) {
  const streams = await getStreams({
    status: 'scheduled',
    group: getGroup(),
    // +48 hours from now
    scheduledBefore: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
    orderBy: [{ field: 'scheduledStartTime', order: 'asc' }],
    limit: 100
  })
  const group = getGroup()

  return (
    <Card>
      <StreamListHeader
        titleIcon={<CalendarCheck className="w-6 h-6 text-muted-foreground" />}
        title={title}
        description={description}
        badgeText="Scheduled"
      />
      <StreamListContentOfScheduled streams={streams} compact={compact} />
      {compact && <StreamListFooter href={`/${group}/scheduled`} />}
    </Card>
  )
}
