import { PropsWithoutRef } from 'react'
import { Radio } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StreamsSchema } from 'api/youtube/schema/streamSchema'
import StreamListContentOfLive from 'features/hololive/stream/components/stream-list/StreamListContentOfLive'
import StreamListFooter from 'features/hololive/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/hololive/stream/components/stream-list/StreamListHeader'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  streams: StreamsSchema
  title: string
  description: string
  compact?: boolean
}

export default async function StreamListOfLive({
  streams,
  title,
  description,
  compact
}: PropsWithoutRef<Props>) {
  const group = getGroup()

  return (
    <Card>
      <StreamListHeader
        titleIcon={<Radio className="w-6 h-6 text-red-400" />}
        title={title}
        description={description}
        badgeText="Live"
      />
      <StreamListContentOfLive streams={streams} compact={compact} />
      {compact && <StreamListFooter href={`/${group}/live`} />}
    </Card>
  )
}
