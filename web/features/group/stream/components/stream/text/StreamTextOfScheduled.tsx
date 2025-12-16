import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import ScheduledFor from 'components/styles/date/ScheduledFor'
import IntlNumberFormat from 'components/styles/number/IntlNumberFormat'

type Props = {
  stream: StreamSchema
}

export default async function StreamTextOfScheduled({
  stream
}: PropsWithoutRef<Props>) {
  const {
    streamTimes: { scheduledStartTime },
    metrics: { likes }
  } = stream
  const t = await getTranslations('Features.stream')
  return (
    <div>
      <div className="line-clamp-1 break-all">
        <IntlNumberFormat>{likes}</IntlNumberFormat> {t('likes')}
      </div>
      <div className="line-clamp-1 break-all">
        <ScheduledFor date={scheduledStartTime} />
      </div>
    </div>
  )
}
