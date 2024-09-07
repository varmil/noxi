import { PropsWithoutRef } from 'react'
import { Radio } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { getStreams } from 'apis/youtube/getStreams'
import StreamListContentOfLive from 'features/group/stream/components/stream-list/StreamListContentOfLive'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  title: string
  description: string
  compact?: boolean
}

export default async function LiveStreamGallery({
  title,
  description,
  compact
}: PropsWithoutRef<Props>) {
  const streams = await getStreams({
    status: 'live',
    group: getGroup(),
    orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
    limit: 100
  })
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
