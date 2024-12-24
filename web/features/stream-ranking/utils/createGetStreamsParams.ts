import { STREAM_RANKING_PAGE_SIZE } from 'features/stream-ranking/utils/stream-ranking-pagination'
import { getStartOf } from 'utils/ranking/ranking'
import type { getStreams } from 'apis/youtube/getStreams'
import type { StreamRankingGalleryProps } from 'features/stream-ranking/components/gallery/StreamRankingGallery'

export default function createGetStreamsParams({
  period,
  dimension,
  group,
  gender,
  country,
  page,
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

  if (gender) {
    result = { ...result, gender }
  }

  if (country) {
    result = { ...result, country }
  }

  // limit, offset
  {
    const limit = compact ? 5 : STREAM_RANKING_PAGE_SIZE
    const offset = (Number(page || 1) - 1) * STREAM_RANKING_PAGE_SIZE
    result = { ...result, limit, offset }
  }

  return result
}
