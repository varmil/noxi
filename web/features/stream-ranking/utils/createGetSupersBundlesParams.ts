import { StreamRankingPagination } from 'config/constants/Pagination'
import { getStartOf } from 'utils/period/ranking'
import type { getSupersBundles } from 'apis/supers/getSupersBundles'
import type { StreamRankingGalleryProps } from 'features/stream-ranking/components/gallery/StreamRankingGallery'

/** This is used only when dimension is 'super-chat' */
export default function createGetSupersBundlesParams({
  period,
  group,
  gender,
  country,
  page
}: Omit<StreamRankingGalleryProps, 'dimension'>): Parameters<
  typeof getSupersBundles
>[0] {
  let result = {}

  if (period === 'realtime') {
    // NULL means "live now"
    result = { ...result, actualEndTimeGTE: null, actualEndTimeLTE: null }
  } else {
    // それ以外は「CreatedAt」基準で取得
    result = { ...result, createdAtGTE: getStartOf(period).toDate() }
  }

  {
    result = {
      ...result,
      orderBy: [{ field: 'amountMicros', order: 'desc' }]
    }
  }

  {
    result = { ...result, amountMicros: { gt: 1 } }
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

  result = {
    ...result,
    limit: StreamRankingPagination.getLimit(),
    offset: StreamRankingPagination.getOffset(page)
  }

  return result
}
