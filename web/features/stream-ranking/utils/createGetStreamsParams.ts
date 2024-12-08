import dayjs from 'lib/dayjs'
import { getStartOf } from 'utils/ranking/ranking'
import type { getStreams } from 'apis/youtube/getStreams'
import type { StreamRankingGalleryProps } from 'features/stream-ranking/components/gallery/StreamRankingGallery'

export default function createGetStreamsParams({
  period,
  dimension,
  group,
  country,
  compact
}: StreamRankingGalleryProps): Parameters<typeof getStreams>[0] {
  let result = {}

  if (period === 'realtime') {
    result = { ...result, status: 'live' }
  }
  // TODO: 本当はliveもふくめたい
  else {
    result = {
      ...result,
      status: 'ended',
      endedAfter: getStartOf(period).toDate(),
      revalidate: 600
    }
  }

  if (dimension === 'concurrent-viewer') {
    result = {
      ...result,
      orderBy: [{ field: 'maxViewerCount', order: 'desc' }]
    }
  } else {
    // TODO: super chat
  }

  if (group) {
    result = { ...result, group }
  }

  if (country) {
    result = { ...result, country }
  }

  result = { ...result, limit: compact ? 5 : period === 'realtime' ? 100 : 30 }

  return result
}
