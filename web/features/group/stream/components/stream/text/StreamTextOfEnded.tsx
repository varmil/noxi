import { PropsWithoutRef } from 'react'
import { StatisticsSchema } from 'apis/youtube/data-api/schema/statisticsSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import Bullet from 'components/styles/Bullet'
import StreamedLive from 'components/styles/date/StreamedLive'
import Views from 'components/youtube/statistics/Views'

type Props = {
  stream: StreamSchema
  statistics?: StatisticsSchema
}

export default async function StreamTextOfEnded({
  stream,
  statistics
}: PropsWithoutRef<Props>) {
  if (!statistics) return null

  const {
    streamTimes: { actualEndTime }
  } = stream
  const { viewCount } = statistics

  return (
    <span className="line-clamp-1 break-all">
      {actualEndTime && (
        <div>
          {!!viewCount && (
            <>
              <Views views={viewCount} />
              <Bullet />
            </>
          )}
          <StreamedLive date={actualEndTime} />
        </div>
      )}
    </span>
  )
}
