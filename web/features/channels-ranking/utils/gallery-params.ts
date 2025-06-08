import { getChannels } from 'apis/youtube/getChannels'
import { ChannelsRankingPagination } from 'config/constants/Pagination'
import { ChannelsRankingGalleryProps } from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import type { getSupersSummaries } from 'apis/supers/getSupersSummaries'

type GetSupersSummaries = Parameters<typeof getSupersSummaries>[0]
export function getSupersSummariesParams({
  period,
  group,
  gender,
  country,
  date,
  compact,
  page
}: Omit<ChannelsRankingGalleryProps, 'dimension'>): GetSupersSummaries {
  let result: GetSupersSummaries = {}
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

  if (gender) {
    result = { ...result, gender }
  }

  if (country) {
    // ChannelとJOINする必要あり
  }

  // チャンネルランキング（Super Chat）には
  // 金額が０円より大きいもののみ表示する
  {
    result = { ...result, amountMicros: { period, operator: 'gt', value: 0 } }
  }

  // 現状OG専用パラメタ
  if (date) {
    result = { ...result, date: new Date(date) }
  }

  result = {
    ...result,
    limit: ChannelsRankingPagination.getLimit(compact),
    offset: ChannelsRankingPagination.getOffset(page)
  }

  return result
}

type GetChannels = Parameters<typeof getChannels>[0]
export function getChannelsParams({
  group,
  gender,
  page
}: Omit<ChannelsRankingGalleryProps, 'dimension'>): GetChannels {
  return {
    group,
    gender,
    orderBy: [{ field: 'subscriberCount', order: 'desc' }],
    limit: ChannelsRankingPagination.getLimit(),
    offset: ChannelsRankingPagination.getOffset(page)
  }
}
