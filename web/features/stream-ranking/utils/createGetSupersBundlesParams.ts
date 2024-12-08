import dayjs from 'lib/dayjs'
import { getStartOf } from 'utils/ranking/ranking'
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
    result = { ...result, actualEndTimeGTE: getStartOf(period).toDate() }
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
