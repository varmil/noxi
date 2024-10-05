import { ThumbsUp } from 'lucide-react'
import { getLiveStreamingDetails } from 'apis/youtube/getLiveStreamingDetails'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import CommentIcon from 'components/icons/CommentIcon'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import Watching from 'components/styles/number/Watching'
import OnelineStats from './OnelineStats'

export default async function OnelineStatsOfLive({
  stream
}: {
  stream: StreamSchema
}) {
  const {
    streamTimes: { scheduledStartTime, actualStartTime, actualEndTime },
    metrics: { peakConcurrentViewers, chatMessages, views, likes }
  } = stream

  const [[{ liveStreamingDetails }]] = await Promise.all([
    getLiveStreamingDetails({ videoIds: [stream.videoId] })
  ])

  const { concurrentViewers } = liveStreamingDetails || {}

  return (
    <>
      {/* Stats */}
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <OnelineStats>
          <span>
            <Watching count={concurrentViewers} />
          </span>
        </OnelineStats>
        <OnelineStats>
          <ThumbsUp className="h-4 w-4" />
          <span>
            <IntlNumberFormat>{likes}</IntlNumberFormat>
          </span>
        </OnelineStats>
        {chatMessages > 0 && (
          <OnelineStats>
            <CommentIcon className="h-4 w-4" />
            <span>
              <IntlNumberFormat>{chatMessages}</IntlNumberFormat>
            </span>
          </OnelineStats>
        )}
      </div>
    </>
  )
}
