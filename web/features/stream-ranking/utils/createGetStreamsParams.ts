import dayjs from 'lib/dayjs'
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
    let endedAfter: Date
    switch (period) {
      case 'last24Hours':
        endedAfter = dayjs().subtract(1, 'day').toDate()
        break
      case 'last7Days':
        endedAfter = dayjs().subtract(7, 'day').toDate()
        break
      case 'last30Days':
        endedAfter = dayjs().subtract(1, 'month').toDate()
        break
      case 'last1Year':
        endedAfter = dayjs().subtract(1, 'year').toDate()
        break
    }
    result = { ...result, status: 'ended', endedAfter }
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
