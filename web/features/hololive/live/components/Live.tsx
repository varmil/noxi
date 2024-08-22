import { PropsWithoutRef } from 'react'
import { getStreams } from 'api/youtube/getStreams'
import StreamListOfLive from 'features/hololive/stream/components/stream-list/StreamListOfLive'

type Props = {
  title: string
  description: string
}

export default async function Live({
  title,
  description
}: PropsWithoutRef<Props>) {
  const streams = await getStreams({
    status: 'live',
    orderBy: [{ field: 'scheduledStartTime', order: 'desc' }],
    limit: 100
  })

  return (
    <StreamListOfLive
      streams={streams}
      title={title}
      description={description}
    />
  )
}
