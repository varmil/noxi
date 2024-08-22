import { PropsWithoutRef } from 'react'
import { CalendarCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StreamsSchema } from 'api/youtube/schema/streamSchema'
import StreamListContent from 'features/hololive/stream/components/stream-list/StreamListContent'
import StreamListFooter from 'features/hololive/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/hololive/stream/components/stream-list/StreamListHeader'

type Props = {
  streams: StreamsSchema
  title: string
  description: string
}

export default async function StreamListOfScheduled({
  streams,
  title,
  description
}: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StreamListHeader
        titleIcon={<CalendarCheck className="w-6 h-6 text-muted-foreground" />}
        title={title}
        description={description}
        badgeText="Scheduled"
      />
      <StreamListContent streams={streams} />
      <StreamListFooter />
    </Card>
  )
}
