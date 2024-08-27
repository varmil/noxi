import { PropsWithoutRef } from 'react'
import { CalendarCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StreamsSchema } from 'api/youtube/schema/streamSchema'
import StreamListContentOfScheduled from 'features/group/stream/components/stream-list/StreamListContentOfScheduled'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  streams: StreamsSchema
  title: string
  description: string
  compact?: boolean
}

export default async function StreamListOfScheduled({
  streams,
  title,
  description,
  compact
}: PropsWithoutRef<Props>) {
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
