import { ThumbsUp } from 'lucide-react'
import { getStatistics } from 'apis/youtube/data-api/getStatistics'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import CommentIcon from 'components/icons/CommentIcon'
import StreamedLive from 'components/styles/date/StreamedLive'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import Views from 'components/youtube/statistics/Views'
import OnelineStats from './OnelineStats'

export default async function OnelineStatsOfEnded({
  stream
}: {
  stream: StreamSchema
}) {
  const {
    videoId,
    streamTimes: { actualEndTime }
  } = stream
  const [{ statistics }] = await getStatistics({
    videoIds: [videoId]
  })

  return (
    <>
      {statistics.viewCount ? (
        <OnelineStats>
          <Views views={statistics.viewCount} />
        </OnelineStats>
      ) : null}
      {actualEndTime ? (
        <OnelineStats>
          <StreamedLive date={actualEndTime} />
        </OnelineStats>
      ) : null}
      {statistics.likeCount ? (
        <OnelineStats>
          <ThumbsUp className="h-4 w-4" />
          <span>
            <IntlNumberFormat>{statistics.likeCount}</IntlNumberFormat>
          </span>
        </OnelineStats>
      ) : null}
      {statistics.commentCount ? (
        <OnelineStats>
          <CommentIcon className="h-4 w-4" />
          <span>
            <IntlNumberFormat>{statistics.commentCount}</IntlNumberFormat>
          </span>
        </OnelineStats>
      ) : null}
    </>
  )
}
