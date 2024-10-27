import { PropsWithoutRef } from 'react'
import { LiveStreamingDetailsSchema } from 'apis/youtube/data-api/schema/liveStreamingDetailsSchema'
import Watching from 'components/styles/number/Watching'

type Props = {
  liveStreamingDetails?: LiveStreamingDetailsSchema['liveStreamingDetails']
}

export default async function StreamTextOfLive({
  liveStreamingDetails
}: PropsWithoutRef<Props>) {
  const { concurrentViewers } = liveStreamingDetails || {}

  return (
    <div>
      <Watching count={concurrentViewers} compact />
    </div>
  )
}
