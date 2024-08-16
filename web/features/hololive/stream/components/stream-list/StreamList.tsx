import { PropsWithoutRef } from 'react'
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

export default async function StreamList({
  streams,
  title,
  description
}: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StreamListHeader title={title} description={description} />
      <StreamListContent streams={streams} />
      <StreamListFooter />
    </Card>
  )
}
