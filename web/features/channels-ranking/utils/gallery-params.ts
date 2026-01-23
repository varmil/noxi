import { getChannels } from 'apis/youtube/getChannels'
import { ChannelsRankingPagination } from 'config/constants/Pagination'
import { ChannelsRankingGalleryProps } from 'features/channels-ranking/components/gallery/ChannelsRankingGallery'
import { SnapshotPeriod } from 'types/period'
import { parseSnapshotPeriod } from 'utils/period/snapshot-period'
import type { getSupersSummaries } from 'apis/supers/getSupersSummaries'
import type {
  getSupersSnapshotRanking,
  getSupersSnapshotRankingCount
} from 'apis/supers-snapshots/getRanking'

type GetSupersSnapshotRanking = Parameters<typeof getSupersSnapshotRanking>[0]
export function getSupersSnapshotParams({
  period,
  group,
  gender,
  page
}: Omit<ChannelsRankingGalleryProps, 'dimension'> & {
  period: SnapshotPeriod
}): GetSupersSnapshotRanking {
  const parsed = parseSnapshotPeriod(period)
  return {
    ...parsed,
    group,
    gender,
    limit: ChannelsRankingPagination.getLimit(),
    offset: ChannelsRankingPagination.getOffset(page)
  }
}

type GetSupersSnapshotRankingCount = Parameters<
  typeof getSupersSnapshotRankingCount
>[0]
export function getSupersSnapshotCountParams({
  period,
  group,
  gender
}: Omit<ChannelsRankingGalleryProps, 'dimension'> & {
  period: SnapshotPeriod
}): GetSupersSnapshotRankingCount {
  const parsed = parseSnapshotPeriod(period)
  return {
    ...parsed,
    group,
    gender
  }
}

type GetSupersSummaries = Parameters<typeof getSupersSummaries>[0]
export function getSupersSummariesParams({
  period,
  group,
  gender,
  country,
  date,
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
    const parsedDate = new Date(date)
    if (!isNaN(parsedDate.getTime())) {
      result = { ...result, date: parsedDate }
    }
  }

  result = {
    ...result,
    limit: ChannelsRankingPagination.getLimit(),
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
