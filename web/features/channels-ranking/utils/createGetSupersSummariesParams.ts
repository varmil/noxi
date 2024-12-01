import { ChannelsRankingGalleryProps } from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import type { getSupersSummaries } from 'apis/youtube/getSupersSummaries'

type GetSupersSummaries = Parameters<typeof getSupersSummaries>[0]

export default function createGetSupersSummariesParams({
  period,
  group,
  country,
  date
}: ChannelsRankingGalleryProps): GetSupersSummaries {
  let result = {}
  let orderBy: GetSupersSummaries['orderBy']

  switch (period) {
    default:
      throw new Error(`Period ${period} is not supported`)
    case 'last24Hours':
    case 'last7Days':
    case 'last30Days':
    case 'last90Days':
    case 'last1Year':
    case 'thisWeek':
    case 'thisMonth':
    case 'thisYear':
      orderBy = [{ field: period, order: 'desc' }]
      break
  }
  result = { ...result, orderBy }

  if (group) {
    result = { ...result, group }
  }

  if (country) {
    // TODO: ChannelとJOINする必要あり
  }

  // 現状OG専用パラメタ
  if (date) {
    result = { ...result, date: new Date(date) }
  }

  result = { ...result, limit: 30 }

  return result
}
