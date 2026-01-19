import { getFormatter, getTranslations } from 'next-intl/server'
import { ChannelsSchema } from 'apis/youtube/schema/channelSchema'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import dayjs from 'lib/dayjs'
import ScheduledEmptyState from './ScheduledEmptyState'
import ScheduledStreamItem from './ScheduledStreamItem'

type Props = {
  dateKey: string // 'YYYY-MM-DD'
  streams: StreamsSchema
  channels: ChannelsSchema
}

export default async function ScheduledDaySection({
  dateKey,
  streams,
  channels
}: Props) {
  const t = await getTranslations('Features.schedule')
  const format = await getFormatter()

  const date = dayjs(dateKey).tz('Asia/Tokyo')
  const today = dayjs().tz('Asia/Tokyo')
  const isToday = date.isSame(today, 'day')
  const isTomorrow = date.isSame(today.add(1, 'day'), 'day')

  // 日付表示: "今日" or "明日" or "1/19（日）"
  let dateLabel: string
  if (isToday) {
    dateLabel = t('today')
  } else if (isTomorrow) {
    dateLabel = t('tomorrow')
  } else {
    dateLabel = format.dateTime(date.toDate(), {
      month: 'numeric',
      day: 'numeric',
      weekday: 'short'
    })
  }

  const channelMap = new Map(channels.map(c => [c.basicInfo.id, c]))

  return (
    <section className="scroll-mt-20">
      {/* 日付ヘッダー（sticky） */}
      <div className="sticky top-14 z-40 -mx-4 mb-4 bg-muted/80 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-muted/60">
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl font-bold">{dateLabel}</h2>
          <span className="text-sm text-muted-foreground">
            {t('streamCount', { count: streams.length })}
          </span>
        </div>
      </div>

      {/* 配信リスト */}
      {streams.length > 0 ? (
        <div className="flex flex-col gap-3">
          {streams.map(stream => {
            const channel = channelMap.get(stream.snippet.channelId)
            if (!channel) return null
            return (
              <ScheduledStreamItem
                key={stream.videoId}
                stream={stream}
                channel={channel}
              />
            )
          })}
        </div>
      ) : (
        <ScheduledEmptyState />
      )}
    </section>
  )
}
