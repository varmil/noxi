import { PropsWithoutRef } from 'react'
import { getStreams } from 'api/youtube/getStreams'
import StreamList from 'features/hololive/stream/components/stream-list/StreamList'

type Props = {
  title: string
  description: string
}

export default async function Schedule({
  title,
  description
}: PropsWithoutRef<Props>) {
  const streams = await getStreams({
    status: 'scheduled',
    scehduledAfter: new Date(),
    // +24 hours from now
    scehduledBefore: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    orderBy: [{ field: 'scheduledStartTime', order: 'asc' }],
    limit: 100
  })

  return (
    <StreamList streams={streams} title={title} description={description} />
  )
}
