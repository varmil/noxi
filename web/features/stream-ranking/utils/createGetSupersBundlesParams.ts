import { getStartOf } from 'utils/ranking/ranking'
import type { getSupersBundles } from 'apis/youtube/getSupersBundles'
import type { StreamRankingGalleryProps } from 'features/stream-ranking/components/gallery/StreamRankingGallery'

export default function createGetSupersBundlesParams({
  period,
  dimension,
  group,
  gender,
  country,
  compact
}: StreamRankingGalleryProps): Parameters<typeof getSupersBundles>[0] {
  let result = {}

  if (period === 'realtime') {
    // NULL means "live now"
    result = { ...result, actualEndTimeGTE: null, actualEndTimeLTE: null }
  } else {
    // それ以外は「CreatedAt」基準で取得
    result = { ...result, createdAtGTE: getStartOf(period).toDate() }
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

  if (gender) {
    result = { ...result, gender }
  }

  if (country) {
    // TODO: ChannelとJOINする必要あり
  }

  result = { ...result, limit: compact ? 5 : period === 'realtime' ? 100 : 30 }

  return result
}
