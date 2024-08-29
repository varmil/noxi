import { PropsWithoutRef } from 'react'
import { getStreams } from 'api/youtube/getStreams'
import StreamListOfLive from 'features/group/stream/components/stream-list/StreamListOfLive'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  title: string
  description: string
  compact?: boolean
}

export default async function Live({
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

  return (
    <StreamListOfLive
      streams={streams}
      title={title}
      description={description}
      compact={compact}
    />
  )
}
