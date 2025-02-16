import { getChannels } from 'apis/youtube/getChannels'
import { ChannelsRankingGalleryProps } from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import {
  CHANNELS_RANKING_COMPACT_PAGE_SIZE,
  CHANNELS_RANKING_PAGE_SIZE
} from 'features/channels-ranking/utils/channels-ranking-pagination'
import type { getSupersSummaries } from 'apis/youtube/getSupersSummaries'

type GetSupersSummaries = Parameters<typeof getSupersSummaries>[0]
export function getSupersSummariesParams({
  period,
  group,
  gender,
  country,
  date,
  compact,
  page
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

  if (gender) {
    result = { ...result, gender }
  }

  if (country) {
    // ChannelとJOINする必要あり
  }

  // 現状OG専用パラメタ
  if (date) {
    result = { ...result, date: new Date(date) }
  }

  result = {
    ...result,
    limit: compact
      ? CHANNELS_RANKING_COMPACT_PAGE_SIZE
      : CHANNELS_RANKING_PAGE_SIZE,
    offset: getOffset(page)
  }

  return result
}

type GetChannels = Parameters<typeof getChannels>[0]
export function getChannelsParams({
  group,
  gender,
  page
}: ChannelsRankingGalleryProps): GetChannels {
  return {
    group,
    gender,
    orderBy: [{ field: 'subscriberCount', order: 'desc' }],
    limit: CHANNELS_RANKING_PAGE_SIZE,
    offset: getOffset(page)
  }
}

const getOffset = (page?: string) =>
  Math.max((Number(page) || 1) - 1, 0) * CHANNELS_RANKING_PAGE_SIZE
