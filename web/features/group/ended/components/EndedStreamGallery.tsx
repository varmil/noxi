import { PropsWithoutRef } from 'react'
import { History } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { getStreams } from 'apis/youtube/getStreams'
import StreamListContentOfEnded from 'features/group/stream/components/stream-list/StreamListContentOfEnded'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  title: string
  description: string
  compact?: boolean
}

export default async function EndedStreamGallery({
  title,
  description,
  compact
}: PropsWithoutRef<Props>) {
  const streams = await getStreams({
    status: 'ended',
    group: getGroup(),
    orderBy: [{ field: 'actualEndTime', order: 'desc' }],
    limit: 99
  })
  const group = getGroup()

  return (
    <Card>
      <StreamListHeader
        titleIcon={<History className="w-6 h-6 text-muted-foreground" />}
        title={title}
        description={description}
        badgeText="Archive"
      />
      <StreamListContentOfEnded streams={streams} compact={compact} />
      {compact && <StreamListFooter href={`/${group}/ended`} />}
    </Card>
  )
}