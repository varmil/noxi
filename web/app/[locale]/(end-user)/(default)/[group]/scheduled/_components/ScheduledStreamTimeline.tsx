import { getChannels } from 'apis/youtube/getChannels'
import { getStreams } from 'apis/youtube/getStreams'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import dayjs from 'lib/dayjs'
import ScheduledDaySection from './ScheduledDaySection'
import ScheduledEmptyState from './ScheduledEmptyState'

const SCHEDULE_LIMIT = 100

type Props = {
  groupId: string
  scheduledBefore: Date
  scheduledAfter: Date
}

export default async function ScheduledStreamTimeline({
  groupId,
  scheduledBefore,
  scheduledAfter
}: Props) {
  const streams = await getStreams({
    group: groupId,
    scheduledBefore,
    scheduledAfter,
    orderBy: [{ field: 'scheduledStartTime', order: 'asc' }],
    limit: SCHEDULE_LIMIT,
    offset: 0
  })

  if (streams.length === 0) {
    return <ScheduledEmptyState />
  }

  // チャンネル情報をバッチ取得
  const channelIds = [...new Set(streams.map(s => s.snippet.channelId))]
  const channels = await getChannels({
    ids: channelIds,
    limit: channelIds.length
  })

  // 日付ごとにグループ化（Asia/Tokyo基準）
  const groupedByDate = groupStreamsByDate(streams)

  return (
    <div className="space-y-8">
      {Object.entries(groupedByDate).map(([dateKey, dayStreams]) => (
        <ScheduledDaySection
          key={dateKey}
          dateKey={dateKey}
          streams={dayStreams}
          channels={channels}
        />
      ))}
    </div>
  )
}

function groupStreamsByDate(
  streams: StreamsSchema
): Record<string, StreamsSchema> {
  const grouped: Record<string, StreamsSchema> = {}

  streams.forEach(stream => {
    const scheduledStartTime = stream.streamTimes.scheduledStartTime
    if (!scheduledStartTime) return

    // 日本時間でグループ化
    const dateKey = dayjs(scheduledStartTime)
      .tz('Asia/Tokyo')
      .format('YYYY-MM-DD')

    if (!grouped[dateKey]) {
      grouped[dateKey] = []
    }
    grouped[dateKey].push(stream)
  })

  // streams は既に scheduledStartTime 昇順でソートされているため、
  // 各日付グループ内も時間順（昇順）が維持されている
  return grouped
}
