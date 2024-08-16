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
  // TODO: 本来はstatus: 'live'のものだけを取得する
  // しかし今回は適当に8時間前-今を取得する
  const streams = await getStreams({
    status: 'scheduled',
    scehduledAfter: new Date(new Date().getTime() - 8 * 60 * 60 * 1000),
    scehduledBefore: new Date(),
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
