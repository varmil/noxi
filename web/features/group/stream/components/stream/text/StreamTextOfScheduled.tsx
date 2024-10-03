import { PropsWithoutRef } from 'react'
import { useTranslations } from 'next-intl'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import Bullet from 'components/styles/Bullet'
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
  const t = useTranslations('Features.stream')
  return (
    <span>
      <IntlNumberFormat>{likes}</IntlNumberFormat> {t('likes')}
      <Bullet />
      <ScheduledFor date={scheduledStartTime} />
    </span>
  )
}
