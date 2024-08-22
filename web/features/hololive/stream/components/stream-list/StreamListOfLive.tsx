import { PropsWithoutRef } from 'react'
import { Radio } from 'lucide-react'
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

export default async function StreamListOfLive({
  streams,
  title,
  description
}: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StreamListHeader
        titleIcon={<Radio className="w-6 h-6 text-red-400" />}
        title={title}
        description={description}
        badgeText="Live"
      />
      <StreamListContent streams={streams} />
      <StreamListFooter />
    </Card>
  )
}
