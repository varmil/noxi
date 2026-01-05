import { StreamRankingPagination } from 'config/constants/Pagination'
import { getStartOf } from 'utils/period/ranking'
import type { getStreams } from 'apis/youtube/getStreams'
import type { StreamRankingGalleryProps } from 'features/stream-ranking/components/gallery/StreamRankingGallery'

export default function createGetStreamsParams({
  period,
  dimension,
  group,
  gender,
  country,
  page
}: StreamRankingGalleryProps): Parameters<typeof getStreams>[0] {
  let result = {}

  if (period === 'realtime') {
    result = { ...result, status: 'live', revalidate: 600 }
  }
  // TODO: 本当はliveもふくめたい
  else {
    result = {
      ...result,
      status: 'ended',
      endedAfter: getStartOf(period).toDate()
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
    result = {
      ...result,
      limit: StreamRankingPagination.getLimit(),
      offset: StreamRankingPagination.getOffset(page)
    }
  }

  return result
}
