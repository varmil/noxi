import { ThumbsUp } from 'lucide-react'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import ScheduledFor from 'components/styles/date/ScheduledFor'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'
import OnelineStats from './online-stats/OnelineStats'

export default async function OnelineStatsOfScheduled({
  stream
}: {
  stream: StreamSchema
}) {
  const {
    streamTimes: { scheduledStartTime },
    metrics: { likes }
  } = stream

  return (
    <>
      <OnelineStats>
        <ScheduledFor date={scheduledStartTime} />
      </OnelineStats>
      <OnelineStats>
        <ThumbsUp className="h-4 w-4" />
        <span>
          <IntlNumberFormat>{likes}</IntlNumberFormat>
        </span>
      </OnelineStats>
    </>
  )
}
