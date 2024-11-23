import { ThumbsUp } from 'lucide-react'
import { getLiveStreamingDetails } from 'apis/youtube/data-api/getLiveStreamingDetails'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import StartedStreaming from 'components/styles/date/StartedStreaming'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import Watching from 'components/styles/number/Watching'
import OnelineStats from './OnelineStats'

export default async function OnelineStatsOfLive({
  stream
}: {
  stream: StreamSchema
}) {
  const {
    streamTimes: { actualStartTime },
    metrics: { likes }
  } = stream

  const [[{ liveStreamingDetails } = {}]] = await Promise.all([
    getLiveStreamingDetails({ videoIds: [stream.videoId] })
  ])
  const { concurrentViewers } = liveStreamingDetails || {}

  return (
    <>
      <OnelineStats>
        <span>
          <Watching count={concurrentViewers} />
        </span>
      </OnelineStats>
      {actualStartTime ? (
        <OnelineStats>
          <StartedStreaming date={actualStartTime} />
        </OnelineStats>
      ) : null}
      {likes ? (
        <OnelineStats>
          <ThumbsUp className="h-4 w-4" />
          <span>
            <IntlNumberFormat>{likes}</IntlNumberFormat>
          </span>
        </OnelineStats>
      ) : null}
    </>
  )
}
