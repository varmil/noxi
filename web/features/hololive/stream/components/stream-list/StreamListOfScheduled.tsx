import { PropsWithoutRef } from 'react'
import { Card } from '@/components/ui/card'
import { StreamsSchema } from 'api/youtube/schema/streamSchema'
import Image from 'components/styles/Image'
import StreamListContent from 'features/hololive/stream/components/stream-list/StreamListContent'
import StreamListFooter from 'features/hololive/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/hololive/stream/components/stream-list/StreamListHeader'

type Props = {
  streams: StreamsSchema
  title: string
  description: string
}

export default async function StreamListOfScheduled({
  streams,
  title,
  description
}: PropsWithoutRef<Props>) {
  return (
    <Card>
      <StreamListHeader
        titleIcon={
          <Image
            src={'/hololiveicon.png'}
            alt={`Hololive icon`}
            width={100}
            height={100}
            className="w-6 h-6"
          />
        }
        title={title}
        description={description}
        badgeText="Scheduled"
      />
      <StreamListContent streams={streams} />
      <StreamListFooter />
    </Card>
  )
}
