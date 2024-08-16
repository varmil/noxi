import { PropsWithoutRef } from 'react'
import { getStreams } from 'api/youtube/getStreams'
import StreamList from 'features/hololive/stream/components/stream-list/StreamList'

type Props = {
  title: string
  description: string
}

export default async function Live({
  title,
  description
}: PropsWithoutRef<Props>) {
  // TODO: 本来はstatus: 'live'のものだけを取得する
  // しかし今回は適当に5時間前-今を取得する
  const streams = await getStreams({
    status: 'scheduled',
    // -5 hours from now
    scehduledAfter: new Date(new Date().getTime() - 5 * 60 * 60 * 1000),
    // now
    scehduledBefore: new Date(),
    orderBy: [{ field: 'scheduledStartTime', order: 'desc' }],
    limit: 100
  })

  return (
    <StreamList streams={streams} title={title} description={description} />
  )
}
