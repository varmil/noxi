import { ChannelsRankingGalleryProps } from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import dayjs from 'lib/dayjs'
import type { getSupersBundles } from 'apis/youtube/getSupersBundles'

export default function createGetSupersBundlesParams({
  period,
  dimension,
  group,
  country,
  compact
}: ChannelsRankingGalleryProps): Parameters<typeof getSupersBundles>[0] {
  let result = {}

  let actualEndTimeGTE: Date
  switch (period) {
    // FIXME: sumを呼ぶ感じ
    case 'last24Hours':
      actualEndTimeGTE = dayjs().subtract(1, 'day').toDate()
      break
    default:
      throw new Error('Only last24Hours is supported')
  }
  result = { ...result, actualEndTimeGTE }

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

  result = { ...result, limit: 30 }

  return result
}
