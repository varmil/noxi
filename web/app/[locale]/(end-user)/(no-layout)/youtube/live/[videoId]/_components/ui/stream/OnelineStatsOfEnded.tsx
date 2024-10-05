import { ThumbsUp } from 'lucide-react'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import CommentIcon from 'components/icons/CommentIcon'
import StreamedLive from 'components/styles/date/StreamedLive'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import Views from 'components/youtube/statistics/Views'
import OnelineStats from './online-stats/OnelineStats'

export default async function OnelineStatsOfEnded({
  stream
}: {
  stream: StreamSchema
}) {
  const {
    streamTimes: { actualEndTime },
    metrics: { peakConcurrentViewers, chatMessages, views, likes }
  } = stream

  return (
    <>
      {actualEndTime && (
        <>
          <OnelineStats>
            <Views views={views} />
          </OnelineStats>
          <OnelineStats>
            <StreamedLive date={actualEndTime} />
          </OnelineStats>
        </>
      )}
      {/* TODO: use Video > Likes */}
      <OnelineStats>
        <ThumbsUp className="h-4 w-4" />
        <span>
          <IntlNumberFormat>{likes}</IntlNumberFormat>
        </span>
      </OnelineStats>
      {/* TODO: use Video > Comments */}
      {chatMessages > 0 && (
        <OnelineStats>
          <CommentIcon className="h-4 w-4" />
          <span>
            <IntlNumberFormat>{chatMessages}</IntlNumberFormat>
          </span>
        </OnelineStats>
      )}
    </>
  )
}
