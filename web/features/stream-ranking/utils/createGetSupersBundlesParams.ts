import dayjs from 'lib/dayjs'
import type { getSupersBundles } from 'apis/youtube/getSupersBundles'
import type { StreamRankingGalleryProps } from 'features/stream-ranking/components/gallery/StreamRankingGallery'

export default function createGetStreamsParams({
  period,
  dimension,
  group,
  country,
  compact
}: StreamRankingGalleryProps): Parameters<typeof getSupersBundles>[0] {
  let result = {}

  if (period === 'realtime') {
    result = { ...result, actualEndTimeGTE: null, actualEndTimeLTE: null }
  } else {
    let actualEndTimeGTE: Date
    switch (period) {
      case 'last24Hours':
        actualEndTimeGTE = dayjs().subtract(1, 'day').toDate()
        break
      case 'last7Days':
        actualEndTimeGTE = dayjs().subtract(7, 'day').toDate()
        break
      case 'last30Days':
        actualEndTimeGTE = dayjs().subtract(1, 'month').toDate()
        break
      case 'last1Year':
        actualEndTimeGTE = dayjs().subtract(1, 'year').toDate()
        break
    }
    result = { ...result, actualEndTimeGTE }
  }

  if (dimension === 'super-chat') {
    result = {
      ...result,
      orderBy: [{ field: 'amountMicros', order: 'desc' }]
    }
  }

  if (group) {
    result = { ...result, group }
  }

  if (country) {
    // TODO: ChannelとJOINする必要あり
  }

  result = { ...result, limit: compact ? 5 : period === 'realtime' ? 100 : 30 }

  return result
}
